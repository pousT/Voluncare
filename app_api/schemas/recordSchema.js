var Mongoose = require('mongoose'),
    userSchema = require('./userSchema.js'),
    activitySchema = require('./activitySchema.js');
module.exports = new Mongoose.Schema({ 
        reason:{type:String,required:true},
        time:{type : Date, default: Date.now},
        number:{type:Number,required:true},
        user:{ type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        userName:{type:String, required:true},
        telephone:{type:String, required:true},
        activity:{type: Mongoose.Schema.Types.ObjectId, ref: 'Activity'}
    });