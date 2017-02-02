var dbHandle = require('../models/dbHandle.js');
var mongoose = require('mongoose');
var actModel = mongoose.model('Activity');
var User = mongoose.model('User');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}
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
module.exports.activities = function (req, res) {
    actModel.find().exec(function (err, activities) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
            return;
        }
        sendJSONresponse(res, 200, activities);
    });
};
module.exports.actFindOne = function (req, res) {
    var activityid = req.params.actid;
    actModel.findById(activityid).exec(function (err, activity) {
        if (!activity) {
            sendJSONresponse(res, 404, {
                "message": "活动不存在"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        console.log(activity);
        sendJSONresponse(res, 200, activity);

    });
};
module.exports.actCreate = function (req, res) {
     getAuthor(req, res, function(req, res,user) {
        if(user.status >5) {
            var title = req.body.title;
            var start = req.body.start;
            var end = req.body.end;
            var address = req.body.address;
            var info = req.body.info;
            var maxNum = req.body.maxNum;
            var creditReq = req.body.creditReq;
            var statusReq = req.body.statusReq;
            var bonus = req.body.bonus;
            actModel.create({
                "title": title,
                "description": info,
                "start": start,
                "end": end,
                "address": address,
                "maxNumber": maxNum,
                "creditReq": creditReq,
                "statusReq": statusReq,
                "credit": bonus
            }, function(err, activity) {
                if (err) {
                    console.log(err);
                    sendJSONresponse(res, 400, err);
                } else {
                    console.log(activity);
                    sendJSONresponse(res, 201, activity);
                }
            });
        } else {
            console.log(user);
            sendJSONresponse(res, 400, {
                "message": "权限不足"
            });
        }
    });
};

module.exports.updateCover = function (req, res) {
    var id = req.params.actid;
    actModel.findById(id).exec(function (err, activity) {
        if (!activity) {
            sendJSONresponse(res, 404, {
                "message": "活动不存在"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        activity.image = "/images/activity/"+req.file.filename;
        activity.save(function (err, activity) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, activity);
            }
        });
    });
};

module.exports.update = function (req, res) {
    var id = req.params.actid;
     actModel.findById(id).exec(function (err, activity) {
        if (!activity) {
            sendJSONresponse(res, 404, {
                "message": "活动不存在"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        activity.users = req.body.users;
        activity.save(function (err, activity) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, activity);
            }
        });
    });   
}