var Comment = require('../models').Comment;

// add a comment
exports.addComment = function(data) {
	return Comment.create(data);
}

//get the comment by id
exports.getCommentsById = function(id) {
	return Comment.find({topic_id: id}).sort('updated_at').exec();
}