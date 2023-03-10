const Hod = require("../models/Hod")
const bcryptjs = require("bcryptjs")
const User = require("../models/User")
const HostelIncharge = require("../models/HostelIncharge")
const jwt = require("jsonwebtoken")
const config = require("config")
const Outing = require("../models/Outing")
const Hostel = require("../models/Hostel")
const jwt_secret = config.get("JWT_SECRET")



// Add New Student
const addStudent = async(req,res)=>{

    const {firstname,lastname,parentmobile,department,year,gender,email,regno,mobile,section,address,bloodgroup,parent,outingtype,hostelname}=req.body

    if(!firstname||!lastname||!parentmobile||!department||!year||!gender||!email||!regno||!mobile||!section||!address||!bloodgroup||!parent||!outingtype||!hostelname){
        return res.status(400).json({msg:"All fields are required"})
    }

    let studentExists = await User.findOne({regno})
    if(studentExists){
        return res.status(400).json({msg:"Student already exists"})
    }

    let salt=await bcryptjs.genSalt(10);
    let hashed_password = await bcryptjs.hash("Vishnu123$",salt)

    const user = await User.create({
        firstname,
        lastname,
        department,
        year,
        gender,
        parentmobile,
        email,
        regno,
        mobile,
        section,
        address,
        bloodgroup,
        parent,
        outingtype,
        hostelname,
        password:hashed_password
    })

    if(user){
        res.status(201).json({
           user
        })
    }else{
        res.status(400).json({msg:"Unable to add student"})
    }

}

// Update User
const updateUser=async(req,res)=>{
    const inchargeId = req.user
    const userId = req.params.userId
    const {firstname,parentmobile,lastname,department,year,gender,email,regno,mobile,section,address,bloodgroup,parent,outingtype,hostelname}=req.body
    const newUser={}
    if(firstname) newUser.firstname=firstname
    if(lastname) newUser.lastname=lastname
    if(department) newUser.department=department
    if(year) newUser.year=year
    if(gender) newUser.gender=gender
    if(email) newUser.email=email
    if(regno) newUser.regno=regno
    if(mobile) newUser.mobile=mobile
    if(section) newUser.section=section
    if(address) newUser.address=address
    if(bloodgroup) newUser.bloodgroup=bloodgroup
    if(parent) newUser.parent=parent
    if(outingtype) newUser.outingtype=outingtype
    if(hostelname) newUser.hostelname=hostelname
    if(parentmobile) newUser.parentmobile=parentmobile
    //console.log(newUser)
   // console.log(userId)
    try {
        let user = await User.findById(userId).select("-password")
       // console.log(user)
        if(!user) return res.status(404).json({msg:"User not found"})
        user = await User.findByIdAndUpdate(userId,{$set:newUser},{new:true})
        return res.status(200).json(user)  
    } catch (err) {
        return res.status(400).json({msg:"Error occurs at backend"})
    }

}


// Delete User
const deleteUser=async(req,res)=>{
    const {userId}=req.params
    try {
        let user = await User.findById(userId).select("-password")
        if(!user) return res.status(404).json({msg:"User not found"})
        await User.findByIdAndRemove(userId)
        return res.status(200).json({msg:"User Deleted Successfully"})
    } catch (err) {
        return res.status(400).json({msg:"Error occurs at backend"})
    }
}


//Add new Incharge
const addIncharge =async (req,res)=>{
    const {email,password,gender}=req.body
    let salt=await bcryptjs.genSalt(10);
    let hashed_password = await bcryptjs.hash(password,salt)
    const hostelIncharge = await HostelIncharge.create({
        email,
        gender,
        password:hashed_password
    })
    if(hostelIncharge){
        res.status(201).json({hostelIncharge})
    }else{
        res.status(400).json({msg:"Hostel Incharge adding failed"})
    }
    
}


//Login Incharge
const loginIncharge = async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(400).json({msg:"All fields are required"})
    }
    const incharge = await HostelIncharge.findOne({email})
    if(!incharge){
        return res.status(400).json({msg:"Invalid Credentials"})
    }

    let isMatchPassword = await bcryptjs.compare(password,incharge.password)
    if(!isMatchPassword){
        return res.status(400).json({msg:"Invalid Credentials"})
    }else{
        const payload={
            email,
            isAdmin:incharge.isadmin,
            id:incharge._id
        }
        const token = await jwt.sign(payload,jwt_secret)
        return res.json({
            _id:incharge._id,
            isadmin:incharge.isadmin,
            token,
            email
        })
    }
}


 
// Add New Hostel
const addHostel=async(req,res)=>{
    const {name} = req.body
    const inchargeId = req.user
    const incharge = await HostelIncharge.findOne({_id:inchargeId})
    const gender = incharge.gender
    const hostel = await Hostel.create({name,gender})
    if(hostel){
        return res.status(200).json({hostel})
    }else{
        return res.status(400).json({msg:"Unable to save Hostel"})
    }
}


const getAllHostelsByGender=async(req,res)=>{
    const incharge = await HostelIncharge.findOne({_id:req.user})
    const allHostelsByGender = await Hostel.find({gender:incharge.gender})
    if(allHostelsByGender){
        return res.status(200).json(allHostelsByGender)
    }else{
        return res.status(400).json({json:"Unable to get all Hostels"})
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



const getAllStudentsInOuting=async(req,res)=>{
    const incharge = await HostelIncharge.findOne({_id:req.user}).select("-password")
    const allStudents  = await User.find({outing:true,gender:incharge.gender})
    if(allStudents){
        return res.status(200).json(allStudents)
    }else{
        return res.status(400).json({json:"Unable to get all students data"}) 
    }
}


// Get all HOD approved outings and gender based
const allGenderOutings = async(req,res)=>{
    const inchargeId = req.user 
    const incharge = await HostelIncharge.findById(inchargeId).select("-password")
    // const departmentUsers = await User.find({department:hod.department})
    const presentOutings = await Outing.find({process:1,hod:1,gender:incharge.gender,incharge:0})
    //console.log(presentOutings)
    if(presentOutings){
        return res.status(200).json(presentOutings)
    }else{
        return res.status(400).json({msg:"Unable to get Current Outings"})
    }
}


// Approve Incharge Outing
const approveInchargeOuting = async(req,res)=>{
    // const {outingId} = req.params
    // let outing = await Outing.findById(outingId)
    // outing.incharge=1
    // await outing.save()
    // //console.log(outing)
    // if(outing.incharge===1){
    //     return res.json(outing)
    // }else{
    //     return res.status(400).json({msg:"Unable to approve outing"})
    // }
    const {outingId} = req.params
    let outing = await Outing.findById(outingId)
    const inchargeId= req.user
    const newOuting={}
    newOuting.incharge = 1

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

// Reject Incharge Outing
const rejectInchargeOuting = async(req,res)=>{

    const {outingId} = req.params
    let outing = await Outing.findById(outingId)
    const inchargeId= req.user
    const {rejectionReason}=req.body
    const newOuting={}
    if(rejectionReason) newOuting.rejectreason=rejectionReason
    newOuting.hod=0
    newOuting.incharge=0
    newOuting.process=0
    newOuting.rejectby = "INCHARGE"

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


// Change Incharge Password
const changeInchargePassword = async(req,res)=>{
    const {new_password,old_password} = req.body
    const inchargeId = req.user
    const incharge = await HostelIncharge.findById(inchargeId)
    //console.log(old_password)
    const isMatch = await bcryptjs.compare(old_password,incharge.password)
    if(!isMatch){
        return res.status(400).json({msg:"Old Password is Wrong"})
    }
    const salt = await bcryptjs.genSalt(10)
    const hashed_password = await bcryptjs.hash(new_password,salt)
    // incharge.password = hashed_password
    // const newPasswordUser = await incharge.save()
    const newUser={}
    newUser.password = hashed_password
    const newPasswordUser = await HostelIncharge.findByIdAndUpdate(inchargeId,{$set:newUser},{new:true})
    if(newPasswordUser){
        return res.status(200).json({msg:"Password Changed Successfully"})
    }else{
        return res.status(400).json({msg:"Unable to change password"})
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


const changeStudentPassword=async(req,res)=>{
    const {studentId} = req.params
    const {newPassword} = req.body
    const student = await User.findById(studentId)
    const salt = await bcryptjs.genSalt(10)
    const hashed_password = await bcryptjs.hash(newPassword,salt)
    const newUser={}
    newUser.password = hashed_password
    const newPasswordUser = await User.findByIdAndUpdate(studentId,{$set:newUser},{new:true})
    if(newPasswordUser){
        return res.status(200).json({msg:"Password Changed Successfully"})
    }else{
        return res.status(400).json({msg:"Unable to change password"})
    }
}



module.exports={
    addStudent,
    addIncharge,
    loginIncharge,
    allGenderOutings,
    approveInchargeOuting,
    rejectInchargeOuting,
    updateUser,
    deleteUser,
    changeInchargePassword,
    addHostel,
    getAllHostelsByGender,
    getAllStudentsByHostel,
    getAllStudentsInOuting,
    userDetails,
    getOutingById,
    changeStudentPassword
}