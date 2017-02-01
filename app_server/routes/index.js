var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home');
var angularController = require('../controllers/other');
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

router.get('/', angularController.angularApp); 
/*
//upload avatar page//
router.get('/avatar', homeController.avatar);
router.post('/avatar', upload.single('avatar'), homeController.postAvatar);

//upload cover image page//
router.get('/actImage',homeController.actImage);

router.post('/actImage', uploadAct.single('actImage'), homeController.postCover);
// GET home page. //
router.get('/home', homeController.home);

//signup page
router.get('/register', function(req, res, next) {
  res.render('register', { title: '注册' });
});
//post register
router.post('/register',homeController.postReg);

//log in page
router.get('/login', homeController.login);
router.post('/login', homeController.postLogin);

// GET logout page. //
router.get("/logout",homeController.logout);
// GET create new activity page. //
router.get("/newAct", homeController.newAct);
//新建活动
router.post("/newAct", homeController.postAct);
// GET create new activity page. //

router.get("/actList", homeController.actList);
//活动详情
router.get('/activity/:id', homeController.actDetail);
//参加活动
router.get('/participate', homeController.participate); */
module.exports = router;
