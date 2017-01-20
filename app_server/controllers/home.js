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
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
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
    var Activity = global.dbHandel.getModel('activity');
    Activity.find({},{title:1, image:1, start:1},function(err,docs) {
        if(err) {
            res.sendStatus(500);
            console.log(err);
        }else if(!docs) {
            req.session.error = '活动列表为空';
            res.locals.error = '活动列表为空'; 
            res.sendStatus(404);                            //    状态码返回404
        }else {
            res.render('actList', { title: '活动列表', activities: docs});
            console.log(docs);            
        }
    });
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
  var id = req.params.id;

    var Activity = global.dbHandel.getModel('activity');
    Activity.findOne({_id: id},function(err,doc) {
        if(err){ 
            res.sendStatus(500);
            req.session.error =  '网络异常错误！';
            console.log(err);
        }else if(doc){
            res.cookie('activity', doc); 
            res.render('activity', {title: '活动详情', activity: doc});
        }else {
            req.session.error =  '活动不存在！';
            res.redirect("/actList");
        }
    });
};
//参加活动
module.exports.participate = function(req, res) {
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }else {
        var Activity = global.dbHandel.getModel('activity');
        var User = global.dbHandel.getModel('user'); 
        var uId = req.session.user._id;
        var aId = req.cookies.activity._id;
        console.log(uId);
        console.log(aId);

        User.findOneAndUpdate({_id:uId}, {'$addToSet':{'actSign':aId}},  function(err, doc) {
            console.log(doc);
        });
        Activity.findOneAndUpdate({_id:aId}, {'$addToSet': {'users': uId}}, function(err, doc) {
            console.log(doc);
        });
        Activity.findOneAndUpdate({_id:aId}, {'$inc':{'maxNumber':-1}}, function(err, doc) {
            console.log(doc);
        });        
    }
};
//登录请求
module.exports.postLogin = function(req, res) {
    var User = global.dbHandel.getModel('user'); 
    var uname = req.body.name; 
    User.findOne({name: uname}, function(err,doc) {
        if(err) {
            res.sendStatus(500);
            console.log(err);
        }else if(!doc) {
            req.session.error = '用户名不存在';
            res.locals.error = '名不存在'; 
            res.sendStatus(404);                            //    状态码返回404
        }else {
            if(req.body.password != doc.password){     //查询到匹配用户名的信息，但相应的password属性不匹配
                req.session.error = "密码错误";
                res.sendStatus(404);
            } else {
                req.session.user = doc;
                res.sendStatus(200);
            }
        }
    }); 
};
//注册请求
module.exports.postReg = function (req, res) {
    console.log(req.body);
    var User = global.dbHandel.getModel('user');
    var uname = req.body.name;
    var upwd = req.body.pw;
    var utelephone = req.body.telephone;
    var uaddress = req.body.address;
    var ugender = req.body.gender;
    var ubirthday = req.body.birthday;
    User.findOne({name: uname},function(err,doc){   // 同理 /login 路径的处理方式
        if(err){ 
            res.sendStatus(500);
            req.session.error =  '网络异常错误！';
            console.log(err);
        }else if(doc){ 
            req.session.error = '用户名已存在！';
            res.sendStatus(500);
        }else{ 
            User.create({                             // 创建一组user对象置入model
                "name": uname,
                "password": upwd,
                "birthday": ubirthday,
                "address": uaddress,
                "gender": ugender,
                "telephone": utelephone
            },function(err,doc){ 
                 if (err) {
                        res.sendStatus(500);
                        console.log(err);
                    } else {
                        req.session.user = doc;
                        req.session.error = '用户名创建成功！';
                        res.sendStatus(200);
                    }
                  });
        }
    });
};
//新建活动
module.exports.postAct = function(req,res) {
    var Activity = global.dbHandel.getModel('activity');
    console.log(Activity);
    var title = req.body.title;
    var start = req.body.start;
    var end = req.body.end;
    var address = req.body.address;
    var info = req.body.info;
    var maxNum = req.body.maxNum;
    var creditReq = req.body.creditReq;
    var statusReq = req.body.statusReq;
    var bonus = req.body.bonus;
    console.log(req.body); 
            Activity.create({                             
                "title": title,
                "description": info,
                "start": start,
                "end": end,
                "address": address,
                "maxNumber": maxNum,
                "creditReq": creditReq,
                "statusReq": statusReq,
                "credit": bonus
            },function(err,doc){ 
                 if (err) {
                        res.sendStatus(500);
                        console.log(err);
                    } else {

                        res.cookie('newActivity', doc);
                        req.session.error = '活动创建成功！';
                        res.sendStatus(200);
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
}；