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

    event:{
        tile:{type:String, required:true},
        start:{type:Date, required:true},
        finished:{type:Date},
        total:{type:Number,required:true},
        credit:{type:Number,required:true},
        requiredCredit:{type:Number,default:0},
        requiredStatus:{type:Number,default:0},
        location:{type:String, required:true},
        description:{type:String, required:true}
    }

};