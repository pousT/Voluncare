var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

var activityCtrl = require('../controllers/activity');
var ctrlAuth = require('../controllers/authentication');
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


//活动
router.get('/activities', activityCtrl.activities);
router.get('/activities/:actid', activityCtrl.actFindOne);
router.post('/activity',auth, activityCtrl.actCreate);
router.put('/actCover/:actid',auth,activityCtrl.updateCover);
router.put('/activity/participate',auth,activityCtrl.participate);
module.exports = router;