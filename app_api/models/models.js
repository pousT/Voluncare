var mongoose = require('mongoose');
var crypto = require('crypto')
var jwt = require('jsonwebtoken');

var activitySchema = require('../schemas/activitySchema.js');
var userSchema = require('../schemas/userSchema.js');
var recordSchema = require('../schemas/recordSchema.js');
var rechargeSchema = require('../schemas/rechargeSchema.js');
//用户密码验证
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    //1000代表迭代次数 64代表长度
    this.hash = crypto.pbkdf2Sync(password, this.salt,1000,64).toString('hex');
};
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};
userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        telephone: this.telephone,
        name: this.name,
        address: this.address,
        birthday:this.birthday,
        gender:this.gender,
        credit:this.credit,
        avatar:this.avatar,
        actSign:this.actSign,
        actFinish:this.actFinish,
        status:this.status,
        exp:parseInt(expiry.getTime()/1000)}, process.env.JWT_SECRET);
};
mongoose.model('User', userSchema);
mongoose.model('Activity', activitySchema);
mongoose.model('Record', recordSchema);
mongoose.model('Recharge', rechargeSchema);

