var request = require('request');

var apiOptions = {
    server : "http://localhost:3000"
};
//登录
module.exports.login = function(req, res) {
    res.render('login', { title: '登录' });
}
//注销
module.exports.logout = function(req,res){  
    req.session.user = null;
    req.session.error = null;
    res.redirect("/login");
}
//新建活动页面
module.exports.newAct = function(req,res){
    if(!req.session.user){                     //首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    if(req.session.user.status<0){
        req.session.error = "没有权限"
        res.redirect("/home");
    }
    res.render('newAct', { title: '新建活动'});
}
//活动列表
module.exports.actList = function(req,res){
    //var requestOptions, path;
    //path = "/api/activities";
    //requestOptions= {
    //    url: apiOptions.server + path,
    //    method: "GET",
    //    json:{},
    //}
    //request(requestOptions, function (err, response, body) {
    //    if (response.statusCode == 200) {
//            res.render('actList', { title: '活动列表', activities: body });
//        } else {
//            res.render('error', { message: err.message, error: err });
//        }
//    });
    res.render('actList', { title: '活动列表'});
}
//个人主页
module.exports.home = function(req, res) {
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    else{
        res.render("home",{title:'个人主页'});         //已登录则渲染home页面
    }
};
//上传头像
module.exports.avatar = function(req, res) {
    res.render("avatar", {title: '上传头像'});
};
//上传封面图
module.exports.actImage = function(req, res) {
    res.render("actImage", {title: '上传活动封面图'});
};
//活动详情
module.exports.actDetail = function(req, res, next) {
    var requestOptions, path;
    path = "/api/activities/" + req.params.id;
    requestOptions = {
        url: apiOptions.server+path ,
        method: "GET",
        json: {},
    }
    request(requestOptions, function (err, response, body) {
        if (response.statusCode == 200) {
            res.cookie('activity', body); 
            res.render('activity', { title: '活动详情', activity: body });
        } else {
            res.render('info', err);
        }
    });
};
//参加活动
module.exports.participate = function(req, res) {
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }else {
        var requestOptions, actPath, userPath;
        actPath = "/api/activity/" + req.params.actid;
        userPath = "/api/user/" + req.session.user._id;
        requestOptions = {
            url: apiOptions.server+userPath ,
            method: "PUT",
            json: {},
        }
        request(requestOptions, function (err, response, body) {
            if (response.statusCode == 200) {
                requestOptions = {
                    url: apiOptions.server+actPath ,
                    method: "PUT",
                    json: {},
                }
                request(requestOptions, function (err, response, activity) {
                    if(response.statusCode == 200) { 
                        res.render('actDetail', { title: '活动详情', activity: body });
                    } else {
                        res.render('info', err);
                    }
                });
            } else {
                res.render('info', err);
            }
        });
       
    }
};
//登录请求
module.exports.postLogin = function(req, res) {
    var requestOptions, path;
    path = "/api/user/" + req.body.name;
    requestOptions = {
        url: apiOptions.server+path ,
        method: "GET",
        json: {},
    }
    request(requestOptions, function (err, response, user) {
        if(response.statusCode == 200) {
            if(user.password == req.body.password) {
                req.session.user = user;
                res.render("home",{title:'个人主页'});
            }
            else {
                req.session.error = "密码错误";
                res.redirect("/login");
            }
        } else {
            res.render('info', err);
        }
    });
};
//注册请求
module.exports.postReg = function (req, res) {
     var requestOptions, path;
    path = "/api/user";
    requestOptions = {
        url: apiOptions.server+path ,
        method: "POST",
        json: {},
    }
    request(requestOptions, function (err, response, user) {
        if(err) {
            req.session.error = "注册失败";
        } else if (response.statusCode == 500) {
            req.session.error = "用户名已存在";
        } else {
            req.session.user = user;
            res.redirect("/home");            
        }

    });            

};
//新建活动
module.exports.postAct = function(req,res) {
     var requestOptions, path;
    path = "/api/activity";
    requestOptions = {
        url: apiOptions.server+path ,
        method: "POST",
        json: {},
    }
    request(requestOptions, function (err, response, activity) {
        if(err) {
            req.session.error = "活动创建失败";
        } else {
            res.cookies.newActivity = activity;
            res.redirect("/actImage");            
        }

    });   
};
//活动封面上传
module.exports.postCover = function (req, res, next) {
  console.log(req.file); 
  var actImage = "/images/activity/"+req.file.filename;
  var Activity = global.dbHandel.getModel('activity');
        var query = {"_id": req.cookies.newActivity._id};
        var update = {image: actImage};
        var options = {new: true};
        Activity.findOneAndUpdate(query, update, options, function(err, user) {
        if (err) {
            req.session.error = "封面图上传失败";
            res.redirect("/actImage");
        } else {
            req.session.user = user;
            req.session.error =  '封面图上传成功';
            res.redirect("/actList");
        }
        });       
};
//头像上传
module.exports.postAvatar = function (req, res, next) {
  console.log(req.file); 
  var uavatar = "/images/avatar/"+req.file.filename;
  var User = global.dbHandel.getModel('user');
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    else{
        var query = {"_id": req.session.user._id};
        var update = {avatar: uavatar};
        var options = {new: true};
        User.findOneAndUpdate(query, update, options, function(err, user) {
            if (err) {
                req.session.error = "头像更新失败";
                res.redirect("/avatar");
            } else {
                req.session.user = user;
                req.session.error =  '头像上传成功';
                res.redirect("/home");
            }
        });
    }       
};