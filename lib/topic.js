var Topic = require('../models').Topic;
var cache = require('co-cache')({
	expire: 1000
});

// create a topic
exports.addTopic = function(data) {
	return Topic.create(data);
}

// get a topic by id, and add pv +1
exports.getTopicById = function(id) {
	return Topic.findByIdAndUpdate(id, {$inc: {pv : 1}}).exec();
}

// get 10 topics by tab
exports.getTopicsByTab = cache(function getTopicsByTab(tab, p) {
	var query = {};
	if (tab) {
		query.tab = tab;
	}
	return Topic.find(query).skip((p - 1) * 10).sort('-updated_at').limit(10).select('-content').exec();
}, {
	key: function(tab, p) {
		tab = tab || 'all';
		return this.name + ' : ' + tab + ' : ' + p;
	}
})

// get all topics about user
exports.getTopicsByName = function(name) {
	return Topic.find({'user.name': name}).sort('-updated_at').exec();
}

// inc comments by id
exports.incCommentsById = function(id) {
	return Topic.findByIdAndUpdate(id, {$inc: {comment: 1}}).exec();
}

// get 5 Topics that didn't replied
exports.getNoReplyTopics = cache(function getNoReplyTopics() {
	return Topic.find({comment: 0}).sort('-updated_at').limit(5).select('title').exec();
});

// get topics by different count
exports.getTopicsCount = cache(function getTopicsCount(tab) {
	var query = {};
	if (tab) {
		query.tab = tab;
		return Topic.count(query).exec();
	}
}, {
	key: function(tab) {
		tab = tab || 'all';
		return this.name + ' : ' + tab;
	}
})