var validator = require('validator');
var crypto = require('crypto');

module.exports = {

	// sign up
	"(GET | POST) /signup": {
		"request": {
			"session": checkNotLogin
		}
	},

	"POST /signup": {
		"request": {
			"body": checkSignupBody
		}
	},

	//sign in
	"(GET | POST) /signin": {
		"request": {
			"session": checkNotLogin
		}
	},
	"POST /signin": {
		"request": {
			"body": checkSigninBody
		}
	},

	// post page and topics page
	"(GET | POST) /create": {
		"request": {
			"session": checkLogin
		}
	},
	"POST /create": {
		"request": {
			"body": checkCreateBody
		}
	},

	// get topics by id
	"POST /topic/:id": {
		"request": {
			"session": checkLogin,
			"body": checkReplyTopic
		}
	}

}

// md5
function md5(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

// check if not login
function checkNotLogin() {
	if (this.session && this.session.user) {
		this.flash = {error: 'Already login!'};
		this.redirect('back');
		return false;
	}
	return true;
}

// check if already login
function checkLogin() {
	if (!this.session && this.session.user) {
		this.flash({error: "Ain't Login"});
		this.redirect('/signin');
		return false;
	}
	return true;
}

// check the user's sign up info
function checkSignupBody() {
	var body = this.request.body;
	var flash;
	if (!body || !body.name) {
		flash = {error: 'Please write your name'};
	} else if (!body.email || !validator.isEmail(body.email)) {
		flash = {error: 'Please write the true email addr'};
	} else if (!body.password) {
		flash = {error: 'Please write your password'};
	} else if (body.password !== body.re_password) {
		flash = {error: 'The two passwords is not the same'};
	} else if (!body.gender || !~['Male', 'Female'].indexOf(body.gender)) {
		flash = {error: 'Please select your gender'};
	} else if (body.signature && body.signature.length > 50) {
		flash = {error: 'Signature length can not be bigger than 50 words'};
	};
	if (flash) {
		this.flash = flash;
		this.redirect('back');
		return false;
	}
	body.name = validator.trim(body.name);
	body.email = validator.trim(body.email);
	body.password = md5(validator.trim(body.password));
	return true;
}

// check the sign in request's body info
function checkSigninBody() {
	var body = this.request.body;
	var flash;

	if (!body || !body.name) {
		flash = {error: 'Please write your username'};
	} else if (!body.password) {
		flash = {error: 'Please write your password'};
	}

	if (flash) {
		this.flash = flash;
		this.redirect('back');
		return false;
	}

	body.name = validator.trim(body.name);
	body.password = md5(validator.trim(body.password));
	return true;
}

// check the create body info
function checkCreateBody() {
	var body = this.request.body;
	var flash;

	if (!body || !body.title || body.title.length < 10) {
		flash = {error: 'Please write valid Title'};
	} else if (!body.tab) {
		flash = {error: 'Please select a tab'};
	} else if (!body.content) {
		flash = {error: 'Please write the content'};
	}

	if (flash) {
		this.flash = flash;
		this.redirect('back');
		return false;
	}

	body.title = validator.trim(body.title);
	body.tab = validator.trim(body.tab);
	body.content = validator.trim(body.content);
	return true;
}

// check the reply topics
function checkReplyTopic() {
	var body = this.request.body;
	var flash;

	if (!body || !body.topic_id || !validator.isMongoId(body.topic_id)) {
		flash = {error: "Your reply's topic is not exist"};
	} else if (!body.content) {
		flash = {error: "Your comment is empty!"};
	}

	if (flash) {
		this.flash = flash;
		this.redirect('back');
		return false;
	}

	body.content = validator.trim(body.content);
	return true;
}