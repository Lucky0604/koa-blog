var User = require('../models').User;

// create an User
exports.addUser = function(data) {
	return User.create(data);
}

// get the User by id
exports.getUserById = function(id) {
	return User.findById(id).exec();
}

// get the User by name
exports.getUserByName = function(name) {
	return User.findOne({name: name}).exec();
}