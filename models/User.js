const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type: String,
        required: true
    },
    department:{
        type:String,
        required:true
    },
    year:{
        type : Number,
        required: true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        reuired:true
    },
    regno:{
        type:String,
        reuired:true
    },
    mobile:{
        type:Number,
        reuired:true
    },
    parentmobile:{
        type:Number,
        required:true
    },
    section:{
        type:String,
        reuired:true
    },
    address:{
        type:String,
        required:true
    },
    bloodgroup:{
        type:String,
        required: true
    },
    parent:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isadmin:{
        type:Number,
        default:0
    },
    outingtype:{
        type: String,
        required: true
    },
    hostelname : {
        type : String,
        required: true
    },
    outing:{
        type:Boolean,
        default:false
    },
    outingId:{
        type:String
    },
    outings:[
        {
            reason:{
                type:String
            },
            reasontype:{
                type:String
            },
            from:{
                type:String
            },
            to:{
                type:String
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }     
},{
    timestamp:true
})

const User = mongoose.model("User",userSchema)

module.exports=User

