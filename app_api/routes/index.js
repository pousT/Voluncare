var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user');
var activityCtrl = require('../controllers/activity');

router.get('/users', userCtrl.users);
router.post('/user', userCtrl.userCreate);
router.get('/user/:uName', userCtrl.userFindOne);
router.put('/user/:userid', userCtrl.userUpdateAvatar);

//活动
router.get('/activities', activityCtrl.activities);
router.get('/activities/:actid', activityCtrl.actFindOne);
router.post('/activity', activityCtrl.actCreate);
router.put('/actCover/:actid',activityCtrl.updateCover);
router.put('/activity/:actid',activityCtrl.update);
module.exports = router;