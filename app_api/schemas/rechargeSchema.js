var Mongoose = require('mongoose'),
    userSchema = require('./userSchema.js');
module.exports = new Mongoose.Schema({ 
        time:{type : Date, default: Date.now},
        amount:{type:Number,required:true}, //充值金额
        user:{ type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, //用户id
        method:{type:String, required:true},//充值方式
        userName:{type:String, required:true}, //用户名
        telephone:{type:String, required:true}, //用户电话
        card:{type:String, required:true}, //用户电话
        flag:{type:Number, default:0} // 充值状态 0 已提交，1已通过，2已拒绝
    });