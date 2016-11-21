module.exports = { 
    user:{ 
        name:{type:String,required:true},
        password:{type:String,required:true},
        telephone:{type:String,required:true,unique:true},
        address:{type:String,required:true},
        birthday:{type:Date,required:true},
        gender:{type:String,required:true},
        credit:{type:Number,default:0},
        status:{type:Number,default:0}
    }


};