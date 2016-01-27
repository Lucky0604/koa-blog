var mongoose = require('mongoose');
var Schema = mongoose.schema;

var TopicSchema = new Schema({
	user: {
		name: {type: String, required: true},
		email: {type: String, required: true}
	},
	title: {type: String, required: true},
	content: {type: String, required: true},
	tab: {type: String, required: true},
	pv: {type: Number, default: 0},
	comment: {type: Number, default: 0},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
});

// 通过版块名（tab） 或用户名（user.name）按时间降序查找话题，则 topics 集合添加了对应的索引：
TopicSchema.index({tab: 1, updated_at: -1});
TopicSchema.index({'user.name': 1, updated_at: -1});

module.exports = mongoose.model('Topic', TopicSchema);