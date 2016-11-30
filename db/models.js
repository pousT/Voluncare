module.exports = { 
    user:{ 
        name:{type:String,required:true},
        password:{type:String,required:true},
        telephone:{type:String,required:true,unique:true},
        address:{type:String,required:true},
        birthday:{type:Date,required:true},
        gender:{type:String,required:true},
        credit:{type:Number,default:0},
        status:{type:Number,default:0},
        avatar:{type:String,default:"images/avatar/default.jpg"}
    },

    activity:{
        title:{type:String, required:true},
        description:{type:String, required:true},
        start:{type:Date, required:true},
        end:{type:Date},
        address:{type:String, required:true},
        creditReq:{type:Number,default:0},
        statusReq:{type:Number,default:0},
        credit:{type:Number,required:true},
        maxNumber:{type:Number, required:true}
    }


};