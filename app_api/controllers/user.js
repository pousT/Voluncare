var dbHandle = require('../models/dbHandle.js');
var mongoose = require('mongoose');
var userModel = mongoose.model('User');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.users = function (req, res) {
    userModel.find().exec(function (err, users) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
            return;
        }
        sendJSONresponse(res, 200, users);
    });
};

module.exports.userCreate = function (req, res) {
    var uname = req.body.name;
    var upwd = req.body.pw;
    var utelephone = req.body.telephone;
    var uaddress = req.body.address;
    var ugender = req.body.gender;
    var ubirthday = req.body.birthday;
    console.log(uname);
    userModel.findOne({name: uname}, function (err, user) {
        if (!user) {    
            userModel.create({
                "name": uname,
                "password": upwd,
                "birthday": ubirthday,
                "address": uaddress,
                "gender": ugender,
                "telephone": utelephone
            }, function(err, user) {
                if (err) {
                    console.log(err);
                    sendJSONresponse(res, 400, err);
                } else {
                    console.log(user);
                    sendJSONresponse(res, 200, user);
                }
            });
        } else {
            sendJSONresponse(res, 500, user);
        }
    });
};

module.exports.userFindOne = function (req, res) {
    var uname = req.params.uName; 
    if (!uname) {
        sendJSONresponse(res, 404, {
            "message": "请输入用户名"
        });
        return;
    }
    userModel.findOne({name: uname}, function (err, user) {
        if (!user) {
            sendJSONresponse(res, 500, {
                "message": "用户不存在"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        console.log(user);
        sendJSONresponse(res, 200, user);

    });
};

module.exports.userUpdateAvatar = function (req, res) {
    var uid = req.session.user._id;
    userModel.findById(uid).exec(function (err, user) {
        if (!user) {
            sendJSONresponse(res, 404, {
                "message": "用户不存在"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        user.avatar = "/images/avatar/"+req.file.filename;
        user.save(function (err, user) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, user);
            }
        });
    });
};