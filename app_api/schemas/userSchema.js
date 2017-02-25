var Mongoose = require('mongoose'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    activitySchema = require('./activitySchema.js');

module.exports = new Mongoose.Schema({ 
        name:{type:String,required:true},
        telephone:{type:String,required:true,unique:true},
        address:{type:String,required:true},
        birthday:{type:Date,required:true},
        gender:{type:String,required:true},
        credit:{type:Number,default:0},
        avatar:{type:String,default:"images/avatar/default.jpg"},
        actSign:[{ type: Mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
        actFinish:[{ type: Mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
        time:{type : Date, default: Date.now},
        balance:{type:Number,default:0},
        salt:{type:String},
        hash: {type:String}
    });