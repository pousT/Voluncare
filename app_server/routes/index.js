var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/avatar');
  },
  filename: function (req, file, cb) {
    cb(null, req.session.user.name + '.jpg');
  }
});
var storageAct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/activity');
  },
  filename: function (req, file, cb) {
    cb(null, req.session.user.name + '.jpg');
  }
});
var upload = multer({ storage: storage });
var uploadAct = multer({ storage: storageAct });
/*upload avatar page*/
router.get('/avatar', homeController.avatar);
router.post('/avatar', upload.single('avatar'), function (req, res, next) {
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
  
});

/*upload cover image page*/
router.get('/actImage',homeController.actImage);

router.post('/actImage', uploadAct.single('actImage'), function (req, res, next) {
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
  
});
/* GET home page. */
router.get('/home', homeController.home);

//signup page
router.get('/register', function(req, res, next) {
  res.render('register', { title: '注册' });
});
router.post('/register',function (req, res) {
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
});

//log in page
router.get('/login', homeController.login);
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
router.get("/logout",homeController.logout);
/* GET create new activity page. */
router.get("/newAct", homeController.newAct);
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

                        res.cookie('newActivity', doc);
                        req.session.error = '活动创建成功！';
                        res.sendStatus(200);
                    }
                  });    

});
/* GET create new activity page. */

router.get("/actList", homeController.actList);
//活动详情
router.get('/activity/:id', homeController.actDetail);

router.get('/participate', function(req, res) {
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


});
module.exports = router;
