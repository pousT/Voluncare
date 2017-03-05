var Mongoose = require('mongoose'),
    userSchema = require('./userSchema.js');
module.exports = new Mongoose.Schema({ 
        time:{type : Date, default: Date.now},
        number:{type:Number,required:true},
        user:{ type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        way:{type:String, required:true},
        userName:{type:String, required:true},
        telephone:{type:String, required:true},
        flag:{type:Number, default:0};
    });