var mongoose = require('mongoose');
var crypto = require('crypto')
var jwt = require('jsonwebtoken');

var activitySchema = new mongoose.Schema({
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
        userSign:{type:Array},
        userFinish:{type:Array}
    });

var userSchema = new mongoose.Schema({ 
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


