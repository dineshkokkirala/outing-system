const mongoose = require("mongoose");

const wardenSchema = mongoose.Schema({
    isadmin: {
        type:Number,
        default: 1
    },
    gender:{
        type:String,
        required:true
    },
    email :{
        type : String,
        required : true
    },
    password:{
        type:String,
        required:true
    }
    
})


const Warden = mongoose.model("Warden",wardenSchema)

module.exports = Warden