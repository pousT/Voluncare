var mongoose = require('mongoose'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    activitySchema = require('./activitySchema.js');

module.exports = new mongoose.Schema({ 
        name:{type:String,required:true},
        telephone:{type:String,required:true,unique:true},
        address:{type:String,required:true},
        birthday:{type:Date,required:true},
        gender:{type:String,required:true},
        credit:{type:Number,default:0},
        status:{type:Number,default:0},
        avatar:{type:String,default:"images/avatar/default.jpg"},
        actSign:[activitySchema],
        actFinish:[activitySchema],
        salt:{type:String},
        hash: {type:String}
    });