var gravatar = require('gravatar');
var moment = require('moment');
var md = require('markdown-it')();
var pkg = require('../package');

moment.locale(pkg.locale);

module.exports = {
	//format the date
	get fromNow() {
		return function(date) {
			return moment(date).fromNow();
		};
	},

	get gravatar() {
		return gravatar.url;
	},

	// md files exchange
	get markdown() {
		return function(content) {
			return md.render(content);
		}
	}
}