const mongoose = require("mongoose");

const hostelSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
    
})


const Hostel = mongoose.model("Hostel",hostelSchema)

module.exports = Hostel