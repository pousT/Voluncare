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
var rechargeCtrl = require('../controllers/recharge');
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

//用户
router.get('/users', auth, userCtrl.users);
router.get('/user', auth, userCtrl.curUser);
//活动
router.get('/activities', activityCtrl.activities);
router.get('/activities/:actid', activityCtrl.actFindOne);
router.post('/activity',auth, activityCtrl.actCreate);
router.put('/participate',auth,activityCtrl.participate);
router.get('/myActivities', auth, activityCtrl.myActivities);
router.put('/activity/signedUser', auth, activityCtrl.signedUser); 
//积分记录
router.post('/record',auth, recordCtrl.attend);
router.get('/records',auth, recordCtrl.records);
router.post('/record/findUser', auth, recordCtrl.findUser);
router.post('/record/createRecord',auth, recordCtrl.postRecord);
//充值
router.get('/recharges', auth, rechargeCtrl.recharges);
router.get('/recharges/:rid', rechargeCtrl.rechargeFindOne);
router.post('/recharge',auth, rechargeCtrl.rechargeCreate);
router.put('/recharge/pass',auth,rechargeCtrl.pass);
router.put('/recharge/reject',auth,rechargeCtrl.reject);
router.get('/myRecharges', auth, rechargeCtrl.myRecharges);
module.exports = router;