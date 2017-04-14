var dbHandle = require('../models/dbHandle.js');
var mongoose = require('mongoose');
var multer = require('multer');
var Activity = mongoose.model('Activity');
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
    Activity.find().exec(function (err, activities) {
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
    Activity.findById(activityid).exec(function (err, activity) {
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
        if(user.status == 0) {
            var title = req.body.title;
            var start = req.body.start;
            var end = req.body.end;
            var address = req.body.address;
            var description = req.body.description;
            var maxNum = req.body.maxNum;
            var creditReq = req.body.credit;
            var price = req.body.price;
            var bonus = req.body.bonus;
            var address = req.body.address;
            Activity.create({
                "title": title,
                "description": description,
                "start": start,
                "end": end,
                "address": address,
                "maxNumber": maxNum,
                "creditReq": creditReq,
                "price": price
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
            sendJSONresponse(res, 400, {
                "message": "权限不足"
            });
        }
    });
};

module.exports.updateCover = function (req, res) {
    var id = req.params.actid;
    Activity.findById(id).exec(function (err, activity) {
        if (!activity) {
            sendJSONresponse(res, 404, {
                "message": "活动不存在"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        } else {
        activity.image = "/images/activity/"+req.file.filename;
        activity.save(function (err, activity) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, activity);
            }
        });            
        }

    });
};
module.exports.participate = function (req, res) {
    getAuthor(req, res, function(req, res,user) {
        var aid = req.body.aid;

        Activity.findById(aid).exec(function (err, activity) {
            if(!activity) {
                sendJSONresponse(res, 404, {
                    "message": "活动不存在"
                });
                return;            
            } else if (err) {
                sendJSONresponse(res, 400, err);
                return;            
            } else {
                user.actSign.addToSet(activity);
                user.save(function (err, user) {
                    console.log("用户更新成功");
                });
                activity.userSign.addToSet(user);
                activity.save(function (err, activity) {
                    if (err) {
                        console.log("出错了");
                        console.log(err);
                        sendJSONresponse(res, 404, err);
                    } else {
                        sendJSONresponse(res, 200, activity);
                    }
                });
            }
        });
    });
}
module.exports.myActivities = function(req, res) {
    getAuthor(req, res, function(req, res,user) {
        Activity.find({_id: { $in:user.actSign}}).exec( function(err, activities) {
            if(err) {
                    console.log(err);
                    sendJSONresponse(res, 400, err);
                    return;              
                } else {
                    sendJSONresponse(res, 200, activities);
                }
        });
    });

}
module.exports.signedUser = function(req, res) {
    getAuthor(req, res, function(req, res,user) {
        if(user.status < 1) {
            console.log(user);
            sendJSONresponse(res, 400, {
                "message": "权限不足"
        });
        return;
        }
        var ids = req.body.uids;
        console.log(ids);
        User.find({_id: { $in:ids}}).exec( function(err, users) {
            if(err) {
                    console.log(err);
                    sendJSONresponse(res, 400, err);
                    return;              
                } else {
                    sendJSONresponse(res, 200, users);
                }
        });
    });

}
