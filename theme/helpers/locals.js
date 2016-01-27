// 保存了自定义的本地变量，用于模板的渲染，其中 $app 保存了 package.json 中的数据
var app = require('../package');

module.exports = {
	get $app() {
		return app;
	}
}