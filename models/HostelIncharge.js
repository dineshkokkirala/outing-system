const mongoose = require("mongoose");

const hostelInchargeSchema = mongoose.Schema({
    isadmin: {
        type:Number,
        default: 3
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
})

const HostelIncharge = mongoose.model("HostelIncharge",hostelInchargeSchema)

module.exports=HostelIncharge