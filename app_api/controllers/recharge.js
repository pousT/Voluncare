
var mongoose = require('mongoose');
var Recharge = mongoose.model('Recharge');
var User = mongoose.model('User');
var admin  = 0;
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
    getAuthor(req, res, function(req, res,user) {
        if(user.status <admin) {
            sendJSONresponse(res, 400, {
                "message": "权限不足"
        });
        return;            
        }
        Recharge.find().exec(function (err, recharges) {
            if (err) {
                console.log(err);
                sendJSONresponse(res, 400, err);
                return;
            }
            sendJSONresponse(res, 200, recharges);
        });
    });
};

module.exports.rechargeCreate = function (req, res) {
     getAuthor(req, res, function(req, res,user) {
            var amount = req.body.amount;
            var method = req.body.method;
            var card = req.body.card;
            var userName = user.name;
            var uid = user._id;
            var telephone = user.telephone;
            Recharge.create({
                "amount": amount,
                "user": uid,
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


module.exports.pass = function (req, res) {
    getAuthor(req, res, function(req, res,user) {
        if(user.status < admin) {
            sendJSONresponse(res, 400, {
                "message": "权限不足"
        });
        return;
        }
        var id = req.body.rid;

        Recharge.findById(id).exec(function (err, recharge) {
            if(!recharge) {
                sendJSONresponse(res, 404, {
                    "message": "充值不存在"
                });
                return;            
            } else if (err) {
                sendJSONresponse(res, 400, err);
                return;            
            } else {
                recharge.flag = 1;
                recharge.save(function (err, recharge) {
                    if (err) {
                        sendJSONresponse(res, 404, err);
                    } else {
                        User.findById(recharge.user).exec(function (err, user) {
                            user.balance = user.balance + recharge.amount;
                            user.credit = user.credit + recharge.amount/100;
                            user.save(function(err, user) {
                                console.log(user);
                                if (err) {
                                    sendJSONresponse(res, 404, err);
                                } else {
                                    sendJSONresponse(res, 200, recharge);
                                }
                            });
                        });
                    }
                })
            }
        });
    });
}
module.exports.myRecharges = function(req, res) {
    getAuthor(req, res, function(req, res,user) {
        Recharge.find({user: user._id}).exec( function(err, recharges) {
            if(err) {
                    sendJSONresponse(res, 400, err);
                    return;              
                } else {
                    sendJSONresponse(res, 200, recharges);
                }
        });
    });

}
module.exports.rechargeFindOne = function (req, res) {
    var id = req.params.rid;
    Recharge.findById(id).exec(function (err, recharge) {
        if (!recharge) {
            sendJSONresponse(res, 404, {
                "message": "充值记录不存在"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        sendJSONresponse(res, 200, recharge);

    });
};
module.exports.reject = function (req, res) {
    var id = req.params.rid;
     Recharge.findById(id).exec(function (err, recharge) {
        if (!recharge) {
            sendJSONresponse(res, 404, {
                "message": "充值不存在"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        recharge.flag = 2;
        recharge.save(function (err, recharge) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, recharge);
            }
        });
    });   
}