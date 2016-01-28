var Models = require('../lib/core');
var $User = Models.$User;

exports.get = function* () {
    yield this.render('signin');
}

exports.post = function* () {
    var data = this.request.body;

    var userInfo = yield $User.getUserByName(data.name);
    if (!userInfo || (userInfo.password !== data.password)) {
        this.flash = {error: 'Username or password is wrong!'};
        return this.redirect('back');
    }

    this.session.user = {
        name: userInfo.name,
        email: userInfo.email
    };

    this.flash = {success: 'Login success!'};
    this.redirect('/user/' + userInfo.name);
}