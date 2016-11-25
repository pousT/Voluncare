var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/home",function(req,res){ 
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    res.render("home",{title:'Home'});         //已登录则渲染home页面
});

//signup page
router.get('/register', function(req, res, next) {
  res.render('register', { title: '注册' });
});
router.post('/register',function (req, res) {
    var User = global.dbHandel.getModel('user');
    var uname = req.body.name;
    var upwd = req.body.password;
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
                        req.session.error = '用户名创建成功！';
                        res.sendStatus(200);
                    }
                  });
        }
    });
});

//log in page
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录' });
});
router.post('/login',function(req, res) {
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
});

/* GET logout page. */
router.get("/logout",function(req,res){    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
    req.session.user = null;
    req.session.error = null;
    res.redirect("/login");
});
/* GET create new activity page. */
router.get("/newAct", function(req,res){
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    if(req.session.user.status<0){
        req.session.error = "没有权限"
        res.redirect("/home");
    }
    res.render('newAct', { title: '新建活动'});
});
router.post("/newAct", function(req,res) {
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
                        req.session.error = '活动创建成功！';
                        res.sendStatus(200);
                    }
                  });    

});
/* GET create new activity page. */

router.get("/actList", function(req,res){
    var Activity = global.dbHandel.getModel('activity');
    Activity.find({},function(err,docs) {
        if(err) {
            res.sendStatus(500);
            console.log(err);
        }else if(!docs) {
            req.session.error = '活动列表为空';
            res.locals.error = '活动列表为空'; 
            res.sendStatus(404);                            //    状态码返回404
        }else {
            res.render('actList', { title: '活动列表', activities: docs});            
        }
    });

});
module.exports = router;
