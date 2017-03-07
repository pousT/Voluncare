
var mongoose = require('mongoose');
var Recharge = mongoose.model('Recharge');
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
            message : "请先登录"
        });
        return;
    }
};
module.exports.recharges = function (req, res) {
    Recharges.find().exec(function (err, recharges) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
            return;
        }
        sendJSONresponse(res, 200, recharges);
    });
};

module.exports.rechargeCreate = function (req, res) {
     getAuthor(req, res, function(req, res,user) {
            var amount = req.body.amount;
            var user = user._id;
            var method = req.body.method;
            var card = req.body.card;
            var userName = user.name;
            var telephone = user.telephone;
            Recharge.create({
                "amount": amount,
                "user": user,
                "card": card,
                "method": method,
                "userName": userName,
                "telephone": telephone
            }, function(err, recharge) {
                if (err) {
                    console.log(err);
                    sendJSONresponse(res, 400, err);
                } else {
                    console.log(recharge);
                    sendJSONresponse(res, 201, recharge);
                }
            });
    });
};

module.exports.confirm = function (req, res) {
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
        if(user.status < 0) {
            console.log(user);
            sendJSONresponse(res, 400, {
                "message": "权限不足"
        });
        return;
        }
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
                    console.log(user);
                })
                activity.userSign.addToSet(user);
                activity.save(function (err, activity) {
                    if (err) {
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
                    sendJSONresponse(res, 400, err);
                    return;              
                } else {
                    sendJSONresponse(res, 200, activities);
                }
        });
    });

}

module.exports.update = function (req, res) {
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