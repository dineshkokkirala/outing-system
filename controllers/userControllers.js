const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const Outing = require("../models/Outing")
const jwt_secret = config.get("JWT_SECRET")

// User Login
const loginUser = async(req,res)=>{
    const {regno,password}=req.body
    //console.log(regno)
    if(!regno||!password){
        return res.status(400).json({msg:"All fields are required"})
    }
    const user = await User.findOne({regno})
    if(!user){
        return res.status(400).json({msg:"Invalid Credentials"})
    }

    let isMatchPassword = await bcryptjs.compare(password,user.password)
    if(!isMatchPassword){
        return res.status(400).json({msg:"Invalid Credentials"})
    }else{
        const payload={
            regno,
            isAdmin:user.isadmin,
            id:user._id
        }
        const token = await jwt.sign(payload,jwt_secret)
        return res.json({
            _id:user._id,
            isadmin:user.isadmin,
            token,
            regno
        })
    }
}


// Change User Password
const changeUserPassword = async(req,res)=>{
    const {new_password,old_password} = req.body
    const userId = req.user
    const user = await User.findById(userId)
    const isMatch = await bcryptjs.compare(old_password,user.password)
    if(!isMatch){
        return res.status(400).json({msg:"Old Password is Wrong"})
    }
    const salt = await bcryptjs.genSalt(10)
    const hashed_password = await bcryptjs.hash(new_password,salt)
    const newUser={}
    newUser.password = hashed_password
    const newPasswordUser = await User.findByIdAndUpdate(userId,{$set:newUser},{new:true})
    if(newPasswordUser){
        return res.status(200).json({msg:"Password Changed Successfully"})
    }else{
        return res.status(400).json({msg:"Unable to change password"})
    }
}


// My Outings
const myOuting = async(req,res)=>{
    const userId = req.user 
    //const user = await User.findById(userId).select("-password")
    const myOuting = await Outing.find({userId})
    if(myOuting){
        return res.status(200).json(myOuting)
    }else{
        return res.status(400).json({msg:"Unable to get your outings"})
    }
}

const userOutings = async(req,res)=>{
    const userId = req.user
    const user = await User.findById(userId).select("-password")
    const outings = user.outings
    if(outings){
        return res.status(200).json(outings)
    }else{
        return res.status(400).json({msg:"Unable to get User Outings"})
    }
}

const userDetails=async(req,res)=>{
    const userId = req.user
    const user = await User.findById(userId).select("-password")
    if(user){
        return res.status(200).json(user)
    }else{
        return res.status(400).json({msg:"Unable to get User Details"})
    }
}


module.exports={loginUser,changeUserPassword,myOuting,userOutings,userDetails}