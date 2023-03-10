const mongoose = require("mongoose")

const outingSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    reason:{
        type:String,
        required:true
    },
    outtime:{
        type:String,
        required:true
    },
    reasontype:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    hod:{
        type:Number,
        default:0
    },
    warden:{
        type:Number,
        default:0
    },
    department:{
        type:String
    },
    rejectby:{
        type:String
    },
    rejectreason:{
        type:String
    },
    gender:{
        type:String
    },
    incharge:{
        type : Number,
        default : 0
    },
    process:{
        type:Number,
        default:0
    },
    parentmobile:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    }
    
},{
    timestamp:true
})

const Outing = mongoose.model("Outing",outingSchema)

module.exports = Outing