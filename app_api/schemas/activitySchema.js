var mongoose = require('mongoose'),
userSchema = require('./userSchema.js');
module.exports = new mongoose.Schema({
        title:{type:String, required:true},
        description:{type:String, required:true},
        start:{type:Date, required:true},
        end:{type:Date},
        address:{type:String, required:true},
        creditReq:{type:Number,default:0},
        statusReq:{type:Number,default:0},
        credit:{type:Number,required:true},
        maxNumber:{type:Number, required:true},
        image:{type:String,default:"images/activity/default.jpg"},
        userSign:[userSchema],
        userFinish:[userSchema]
    });
