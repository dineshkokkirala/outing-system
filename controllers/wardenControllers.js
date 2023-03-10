const Warden = require("../models/Warden")
const Hod = require("../models/Hod")
const bcryptjs = require("bcryptjs")
const User = require("../models/User")
const HostelIncharge = require("../models/HostelIncharge")
const jwt = require("jsonwebtoken")
const config = require("config")
const Outing = require("../models/Outing")
const jwt_secret = config.get("JWT_SECRET")
const Hostel = require("../models/Hostel")


//Add new Warden
const addWarden =async (req,res)=>{
    const {email,password,gender}=req.body
    let salt=await bcryptjs.genSalt(10);
    let hashed_password = await bcryptjs.hash(password,salt)
    const warden = await Warden.create({
        email,
        gender,
        password:hashed_password
    })
    if(warden){
        res.status(201).json(warden)
    }else{
        res.status(400).json({msg:"Hostel Warden adding failed"})
    }
    
}

//Login Warden
const loginWarden = async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(400).json({msg:"All fields are required"})
    }
    const warden = await Warden.findOne({email})
    if(!warden){
        return res.status(400).json({msg:"Invalid Credentials"})
    }

    let isMatchPassword = await bcryptjs.compare(password,warden.password)
    if(!isMatchPassword){
        return res.status(400).json({msg:"Invalid Credentials"})
    }else{
        const payload={
            email,
            isAdmin:warden.isadmin,
            id:warden._id
        }
        const token = await jwt.sign(payload,jwt_secret)
        return res.json({
            _id:warden._id,
            isadmin:warden.isadmin,
            token,
            email
        })
    }
}


// Get all HOD approved and Hostel Incharge outings and gender based
const allGenderOutings = async(req,res)=>{
    const wardenId = req.user 
    const warden = await Warden.findById(wardenId).select("-password")
    const presentOutings = await Outing.find({process:1,hod:1,incharge:1,gender:warden.gender,warden:0})
    if(presentOutings){
        return res.status(200).json(presentOutings)
    }else{
        return res.status(400).json({msg:"Unable to get Current Outings"})
    }
}

// Approve Warden Outing
const approveWardenOuting = async(req,res)=>{
    // const {outingId} = req.params
    // let outing = await Outing.findById(outingId)
    // outing.warden=1
    // outing.hod = 0
    // outing.incharge = 0
    // outing.process = 0
    // await outing.save()
    // if(outing.warden===1){
    //     return res.json(outing)
    // }else{
    //     return res.status(400).json({msg:"Unable to approve outing"})
    // }
    const {outingId} = req.params
    let outing = await Outing.findById(outingId)
    const wardenId = req.user
    const newOuting={}
    newOuting.warden=1
    newOuting.process=0

    try {
        let outing = await Outing.findById(outingId)
        if(!outing) return res.status(404).json({msg:"Outing not found"})
        outing = await Outing.findByIdAndUpdate(outingId,newOuting,{new:true})
        let newUser = {
            reason:outing.reason,
            reasontype:outing.reasontype,
            from:outing.from,
            to:outing.to
        }
        await User.findByIdAndUpdate(outing.userId,{outing:true},{new:true})
        let user = await User.findById(outing.userId)
        user.outings.unshift(newUser)
        const din = await user.save()
       // console.log(din)
        // await Outing.save(outing)
        //await Outing.findByIdAndRemove(outingId)
        //console.log(outing)
        return res.status(200).json(outing)
    } catch (err) {
        return res.status(400).json({msg:"Error occurs at backend"})
    }
}

// Reject Warden Outing
const rejectWardenOuting = async(req,res)=>{
    // const {outingId} = req.params
    // const {rejectreason} = req.body
    // let outing = await Outing.findById(outingId)
    // outing.warden=0
    // outing.hod=0
    // outing.incharge=0
    // outing.rejectby = "Warden"
    // outing.rejectreason = rejectreason
    // await outing.save()
    // if(outing.warden===0){
    //     return res.json(outing)
    // }else{
    //     return res.status(400).json({msg:"Unable to reject outing"})
    // }
    const {outingId} = req.params
    let outing = await Outing.findById(outingId)
    const wardenId = req.user
    const {rejectionReason}=req.body
    const newOuting={}
    if(rejectionReason) newOuting.rejectreason=rejectionReason
    newOuting.hod=0
    newOuting.process=0
    newOuting.incharge=0
    newOuting.rejectby = "WARDEN"

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



const getAllHostelsByGender=async(req,res)=>{
    const warden = await Warden.findOne({_id:req.user})
    const allHostelsByGender = await Hostel.find({gender:warden.gender})
    if(allHostelsByGender){
        return res.status(200).json(allHostelsByGender)
    }else{
        return res.status(400).json({json:"Unable to get all Hostels"})
    }
}



// Change Warden Password
const changeWardenPassword = async(req,res)=>{
    const {new_password,old_password} = req.body
    const wardenId = req.user
    const warden = await Warden.findById(wardenId)
    //console.log(old_password)
    const isMatch = await bcryptjs.compare(old_password,warden.password)
    if(!isMatch){
        return res.status(400).json({msg:"Old Password is Wrong"})
    }
    const salt = await bcryptjs.genSalt(10)
    const hashed_password = await bcryptjs.hash(new_password,salt)
    const newUser={}
    newUser.password = hashed_password
    const newPasswordUser = await Warden.findByIdAndUpdate(wardenId,{$set:newUser},{new:true})
    if(newPasswordUser){
        return res.status(200).json({msg:"Password Changed Successfully"})
    }else{
        return res.status(400).json({msg:"Unable to change password"})
    }
}

const getAllStudentsByHostel=async(req,res)=>{
    const {hostelId} = req.params
    const incharge = await HostelIncharge.findOne({_id:req.user})
    const hostel = await Hostel.findOne({_id:hostelId})
    const allStudentsByHostel  = await User.find({hostelname:hostel.name})
    if(allStudentsByHostel){
        return res.status(200).json(allStudentsByHostel)
    }else{
        return res.status(400).json({json:"Unable to get all students data"})
    }
}


const userDetails=async(req,res)=>{
    const {userId} = req.params
    const user = await User.findById(userId).select("-password")
   // console.log(user)
    if(user){
        return res.status(200).json(user)
    }else{
        return res.status(400).json({msg:"Unable to get User Details"})
    }
}


const getOutingById=async(req,res)=>{
    const {outingId} = req.params
    const outing = await Outing.findById(outingId)
    //console.log(outing)
    if(outing){
        return res.status(200).json(outing)
    }else{
        return res.status(400).json({msg:"Unable to get User Details"})
    }
}

const updateUserOuting=async(req,res)=>{
    const {userId} = req.params
    const userOuting = await Outing.findOne({userId})
    await Outing.findByIdAndRemove(userOuting._id)
    let user = await User.findByIdAndUpdate(userId,{outing:false},{new:true})
    //console.log(user)
    if(user){
        return res.status(200).json(user)
    }else{
        return res.status(400).json({msg:"Unable to Update User"})
    }
}

module.exports={
    addWarden,
    loginWarden,
    allGenderOutings,
    approveWardenOuting,
    rejectWardenOuting,
    changeWardenPassword,
    getAllHostelsByGender,
    getAllStudentsByHostel,
    userDetails,
    getOutingById,
    updateUserOuting
}