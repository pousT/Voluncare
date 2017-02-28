var dbHandle = require('../models/dbHandle.js');
var mongoose = require('mongoose');
var Record = mongoose.model('Record');
var User = mongoose.model('User');
var Activity = mongoose.model('Activity');
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

module.exports.attend = function (req, res) {
    
    getAuthor(req, res, function(req, res,user) {
        var adminStatus = 0; // 管理员身份
        if(user.status >= adminStatus) {
            User.findByIdAndUpdate(req.body.pid, {$addToSet:{"actFinish":req.body.aid}, $pull:{"actSign":req.body.aid}, $inc: { "credit": req.body.number }}, function(err, user) {
                console.log(user);
            });
            Activity.findByIdAndUpdate(req.body.aid, {$pull:{"userSign":req.body.pid}, $addToSet:{"userFinish":req.body.pid}}, function(err, activity) {
                if (err) {
                    console.log(err);
                }
                console.log(activity);
            });
            var record = new Record();
            record.user = req.body.pid;
            record.activity = req.body.aid;
            record.number = req.body.number;
            record.reason = req.body.reason;
            record.save(function(err, record) {
                    if (err) {
                        sendJSONresponse(res, 404, err);
                    } else {
                        console.log(record);
                        sendJSONresponse(res, 200, record);
                    }                
            });
        }

    });
};
module.exports.findUser = function (req, res) {
    
    getAuthor(req, res, function(req, res,user) {
        var adminStatus = 0; // 管理员身份
        if(user.status >= adminStatus) {
            var query = User.findOne({ 'telephone': req.body.telephone});
            console.log( req.body.telephone);
            query.select('_id name telephone');
            query.exec(function (err, user) {
                    if (err) {
                        sendJSONresponse(res, 404, err);
                    } else {
                        sendJSONresponse(res, 200, user);
                    }                 
            });
        }

    });
};
module.exports.findUserById = function (req, res) {
    
    getAuthor(req, res, function(req, res,user) {
        var adminStatus = 0; // 管理员身份
        if(user.status >= adminStatus) {
            var query = User.findOne({ '_id': req.body.id});
            query.select('_id name telephone');
            query.exec(function (err, user) {
                    if (err) {
                        sendJSONresponse(res, 404, err);
                    } else {
                        sendJSONresponse(res, 200, user);
                    }                 
            });
        }

    });
};
module.exports.records = function(req, res) {
    getAuthor(req, res, function(req, res,user) {
        var adminStatus = 0; // 管理员身份
        if(user.status >= adminStatus) {
            Record.find().exec(function (err, records) {
                if (err) {
                    console.log(err);
                    sendJSONresponse(res, 400, err);
                    return;
                }
                sendJSONresponse(res, 200, records);
            });
        } else {
            console.log(user);
            sendJSONresponse(res, 400, {
                "message": "权限不足"
            });            
        }

    });    
}
