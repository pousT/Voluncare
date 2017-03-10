var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

var activityCtrl = require('../controllers/activity');
var authCtrl = require('../controllers/authentication');
var userCtrl = require('../controllers/user');
var recordCtrl = require('../controllers/record');
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

//用户
router.get('/users', auth, userCtrl.users);
//活动
router.get('/activities', activityCtrl.activities);
router.get('/activities/:actid', activityCtrl.actFindOne);
router.post('/activity',auth, activityCtrl.actCreate);
router.put('/actCover/:actid',auth,activityCtrl.updateCover);
router.put('/participate',auth,activityCtrl.participate);
router.get('/myActivities', auth, activityCtrl.myActivities);

router.post('/record',auth, recordCtrl.attend);
router.get('/records',auth, recordCtrl.records);
router.post('/record/findUser', auth, recordCtrl.findUser);
router.post('/record/createRecord',auth, recordCtrl.postRecord);
module.exports = router;