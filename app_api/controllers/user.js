var mongoose = require('mongoose');
var User = mongoose.model('User');
var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
var getAuthor = function (req, res, callback) {
    if (req.payload && req.payload.telephone) {
        User.findOne({ telephone: req.payload.telephone })
            .exec(function (err, user) {
            if (!user) {
                sendJSONresponse(res, 404, { message: "User not found" });
                return;
            }
            else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            callback(req, res,user);
        });
    } else {
        sendJSONresponse(res, 404, {
            message : "User not found"
        });
        return;
    }
};
module.exports.users = function (req, res) {
    getAuthor(req, res, function(req, res,user) {
        if(user.status >-1) {
            User.find().exec(function (err, users) {
                if (err) {
                    console.log(err);
                    sendJSONresponse(res, 400, err);
                    return;
                }
                sendJSONresponse(res, 200, users);
            });            
        } else {
            sendJSONresponse(res, 400, {
                "message": "权限不足"
            });            
        }

    });
};