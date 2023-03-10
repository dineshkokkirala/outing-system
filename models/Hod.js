const mongoose = require("mongoose");

const hodSchema = mongoose.Schema({
    department : {
        type : String,
        required : true
    },
    email:{
        type:String,
        required:true
    },
    password : {
        type : String,
        required: true
    },
    isadmin:{
        type:Number,
        default:2
    }
})

const Hod = mongoose.model("Hod",hodSchema)

module.exports = Hod