var path = require('path');

module.exports = {
	port: process.env.PORT || 3000,
	mongodb: {
		url: 'mongodb://localhost:27017/koa-blog'
	},
	schemeConf: path.join(__dirname, './default.scheme'),
	staticCacheConf: path.join(__dirname, '../theme/publices'),
	renderConf: path.join(__dirname, '../theme/config'),
	routerConf: 'routes',
	routerCacheConf: {
		'/': {
			expire: 10 * 1000,
			condition: function() {
				return !this.session || !this.session.user;
			}
		}
	}
}