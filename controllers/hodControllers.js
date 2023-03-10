const Hod = require("../models/Hod")
const Outing = require("../models/Outing")
const bcryptjs = require("bcryptjs")
const User = require("../models/User") 
const jwt=require("jsonwebtoken")

const config = require("config")
const jwt_secret = config.get("JWT_SECRET")

//Add new HOD
const addHod =async (req,res)=>{
    const {email,password,department}=req.body
    if(!email||!password||!department){
        return res.status(400).json({msg:"All fields are required"})
    }
    let salt=await bcryptjs.genSalt(10);
    let hashed_password = await bcryptjs.hash(password,salt)
    const hod = await Hod.create({
        email,
        department,
        password:hashed_password
    })
    if(hod){
        res.status(201).json({hod})
    }else{
        res.status(400).json({msg:"Hod adding failed"})
    }
    // res.send("Hod routes testing")
    
}

//Login HOD
const loginHod = async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(400).json({msg:"All fields are required"})
    }
    const hod = await Hod.findOne({email})
    if(!hod){
        return res.status(400).json({msg:"Invalid Credentials"})
    }

    let isMatchPassword = await bcryptjs.compare(password,hod.password)
    if(!isMatchPassword){
        return res.status(400).json({msg:"Invalid Credentials"})
    }else{
        const payload={
            email,
            isAdmin:hod.isadmin,
            id:hod._id
        }
        const token = await jwt.sign(payload,jwt_secret)
        return res.json({
            _id:hod._id,
            isadmin:hod.isadmin,
            token,
            email
        })
    }

}



// Get all students in respective Department
const allDepartmentUsers = async(req,res)=>{
    const hodId = req.user 
    const hod = await Hod.findById(hodId).select("-password")
    const departmentUsers = await User.find({department:hod.department}).select("-password")
    if(departmentUsers){
        return res.status(200).json(departmentUsers)
    }else{
        return res.status(400).json({msg:"Unable to get al Users"})
    }
}

// Get all outings 
const allDepartmentOutings = async(req,res)=>{
    const hodId = req.user 
    const hod = await Hod.findById(hodId).select("-password")
    const departmentUsers = await User.find({department:hod.department})
    const presentOutings = await Outing.find({process:1,department:hod.department,hod:0})
    if(presentOutings){
        return res.status(200).json(presentOutings)
    }else{
        return res.status(400).json({msg:"Unable to get Current Outings"})
    }
}

const userDetails=async(req,res)=>{
    const {userId} = req.params
    const user = await User.findById(userId).select("-password")
    if(user){
        return res.status(200).json(user)
    }else{
        return res.status(400).json({msg:"Unable to get User Details"})
    }
}

const getOutingById=async(req,res)=>{
    const {outingId} = req.params
    const outing = await Outing.findById(outingId)
    if(outing){
        return res.status(200).json(outing)
    }else{
        return res.status(400).json({msg:"Unable to get User Details"})
    }
}


// Approve Outing
const approveHodOuting = async(req,res)=>{
    const {outingId} = req.params
    let outing = await Outing.findById(outingId)
    const hodId = req.user
    const newOuting={}
    newOuting.hod=1

    //console.log(newOuting)
    try {
        let outing = await Outing.findById(outingId)
        if(!outing) return res.status(404).json({msg:"Outing not found"})
        outing = await Outing.findByIdAndUpdate(outingId,newOuting,{new:true})
       // await Outing.save(outing)
        //await Outing.findByIdAndRemove(outingId)
        //console.log(outing)
        return res.status(200).json(outing)
    } catch (err) {
        return res.status(400).json({msg:"Error occurs at backend"})
    }
}

// Reject Outing
const rejectHodOuting = async(req,res)=>{
    const {outingId} = req.params
    let outing = await Outing.findById(outingId)
    const hodId = req.user
    const {rejectionReason}=req.body
    const newOuting={}
    if(rejectionReason) newOuting.rejectreason=rejectionReason
    newOuting.hod=0
    newOuting.process=0
    newOuting.rejectby = "HOD"

    //console.log(newOuting)
    try {
        let outing = await Outing.findById(outingId)
        if(!outing) return res.status(404).json({msg:"Outing not found"})
        outing = await Outing.findByIdAndUpdate(outingId,newOuting,{new:true})
        //await Outing.save(outing)
        //await Outing.findByIdAndRemove(outingId)
        //console.log(outing)
        return res.status(200).json(outing)
    } catch (err) {
        return res.status(400).json({msg:"Error occurs at backend"})
    }
}



// Change HOD Password
const changeHodPassword = async(req,res)=>{
    const {new_password,old_password} = req.body
    const hodId = req.user
    const hod = await Hod.findById(hodId)
    //console.log(old_password)
    const isMatch = await bcryptjs.compare(old_password,hod.password)
    if(!isMatch){
        return res.status(400).json({msg:"Old Password is Wrong"})
    }
    const salt = await bcryptjs.genSalt(10)
    const hashed_password = await bcryptjs.hash(new_password,salt)
    const newUser={}
    newUser.password = hashed_password
    const newPasswordUser = await Hod.findByIdAndUpdate(hodId,{$set:newUser},{new:true})
    if(newPasswordUser){
        return res.status(200).json({msg:"Password Changed Successfully"})
    }else{
        return res.status(400).json({msg:"Unable to change password"})
    }
}



module.exports={
    addHod,
    loginHod,
    allDepartmentOutings,
    allDepartmentUsers,
    approveHodOuting,
    rejectHodOuting,
    changeHodPassword,
    userDetails,
    getOutingById
}