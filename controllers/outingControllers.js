const User = require("../models/User")
const Outing = require("../models/Outing")


// Applying Outing
const applyOuting = async(req,res)=>{
    const {reason,reasontype,from,to,outtime} = req.body
    const userId = req.user.id 
    // console.log(userId)
    if(!reason||!reasontype||!from||!to||!outtime){
        return res.status(400).json({msg:"All fields are required"})
    }
    let user = await User.findById(userId).select("-password")
    if(!user){
        return res.status(404).json({msg:"User not found"})
    }
    if(user.outing===true){
        return res.status(400).json({msg:"User already in outing"})
    }
    let outingUser = await Outing.findOne({userId})
    // console.log(outingUser)
     if(outingUser){
         if(outingUser.process===1){
            // console.log("PROCESS")
             return res.status(400).json({msg:"Outing is in process"})
         } 
         if(outingUser.process===0&&outingUser.rejectreason!==""&&outingUser.rejectby!==""){
            //  console.log("REJECT")
            //  return res.status(400).json({msg:"Outing is in process"})
            await Outing.findOneAndRemove({userId})
         } 
     }
    let processId=1
    let reasonTypeOuting
    let outingCreated = {
        reason,
        reasontype,
        from,
        to,
        userId,
        outtime,
        rejectby:"",
        rejectreason:"",
        process:1,
        department:user.department,
        gender:user.gender,
        parentmobile:user.parentmobile,
    }
    if(reasontype==="general"||reasontype==="publicholiday"||reasontype==="emergency"){
        outingCreated.hod=1
        outingCreated.incharge=1
    }
    const outing = await Outing.create(outingCreated)

    if(outing){
        //console.log(outing)
        res.status(201).json({outing})
    }else{
        return res.status(400).json({msg:"Error to apply outing"})
    }
}




// Get all outing of user
const getUserOutings = async(req,res)=>{
    const {regno}=req.params
    //console.log(regno)
    const user = await User.findOne({regno})
    const allOutings = await Outing.find({userId:user._id})
    if(allOutings){
        return res.status(200).json(allOutings)
    }else{
        return res.status(400).json({msg:"Unable to get user details"})
    }
}



module.exports = {applyOuting,getUserOutings}