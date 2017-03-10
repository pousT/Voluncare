var Mongoose = require('mongoose'),
userSchema = require('./userSchema.js');
module.exports = new Mongoose.Schema({
        title:{type:String, required:true},
        description:{type:String, required:true},
        start:{type:Date, required:true},
        end:{type:Date},
        address:{type:String, required:true},
        creditReq:{type:Number,default:0},
        credit:{type:Number,required:true},
        maxNumber:{type:Number, required:true},
        price:{type:Number, required:true, default:0},
        image:{type:String,default:"images/activity/default.jpg"},
        userSign:[{ type: Mongoose.Schema.Types.ObjectId, ref: 'User' }],
        userFinish:[{ type: Mongoose.Schema.Types.ObjectId, ref: 'User' }]
    });
