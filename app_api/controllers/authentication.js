var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.register = function(req, res) {
    if (!req.body.name || !req.body.telephone || !req.body.pw || !req.body.address || !req.body.gender || !req.body.birthday) {
        console.log(req.body);
        sendJSONresponse(res, 400, { message: "请完成所有字段" });
        return;
    }
    var user = new User();
    var uname = req.body.name;
    var upwd = req.body.pw;
    var utelephone = req.body.telephone;
    var uaddress = req.body.address;
    var ugender = req.body.gender;
    var ubirthday = req.body.birthday;
    user.name = uname;
    user.telephone = utelephone;
    user.address = uaddress;
    user.gender = ugender;
    user.birthday = ubirthday;
    user.setPassword(upwd);

    user.save(function(err) {
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();
            sendJSONresponse(res, 200, { 'token': token });
        }

    });
};
module.exports.login = function(req, res) {
    if (!req.body.telephone || !req.body.password) {
        sendJSONresponse(res, 400, { message: '请输入电话和密码!' });
        return;
    }
    passport.authenticate('local', function(err, user, info) {
        var token;
        if (err) {
            sendJSONresponse(err, 404, err);
            return;
        }
        if (user) {
            token = user.generateJwt();
            sendJSONresponse(res, 200, { token: token });
        } else {
            sendJSONresponse(res, 401, info);
        }

    })(req,res);
};