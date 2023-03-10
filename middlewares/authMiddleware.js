const jwt = require("jsonwebtoken")
const HostelIncharge = require("../models/HostelIncharge")
const config = require("config")
const User = require("../models/User")
const jwt_secret = config.get("JWT_SECRET")
const Hod = require("../models/Hod")
const Warden = require("../models/Warden")

// LoggedIn or not
const isInchargeLogin=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        try {
            token=req.headers.authorization
            const decoded = jwt.verify(token,jwt_secret)
            req.user = await HostelIncharge.findById(decoded.id).select("-password")
            next()
            
        } catch (err) {
            console.error(err.message)
            return res.status(401).json({msg:"Not Authorized"})
        }
    }
    if(!token){
        return res.status(401).json({msg:"Not Authorized, token not found"})
    }
}

// Is HOD login
const isHodLogin=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        try {
            token=req.headers.authorization
            const decoded = jwt.verify(token,jwt_secret)
            req.user = await Hod.findById(decoded.id).select("-password")
            next()
            
        } catch (err) {
            console.error(err.message)
            return res.status(401).json({msg:"Not Authorized"})
        }
    }
    if(!token){
        return res.status(401).json({msg:"Not Authorized, token not found"})
    }
}

//User LoggedIn or not
const isUserLogin=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        try {
            token=req.headers.authorization
            const decoded = jwt.verify(token,jwt_secret)
            req.user = await User.findById(decoded.id).select("-password")
            //console.log(req.user)
            next()
            
        } catch (err) {
            console.error(err.message)
            return res.status(401).json({msg:"Not Authorized"})
        }
    }
    if(!token){
        return res.status(401).json({msg:"Not Authorized, token not found"})
    }
}

//Warden LoggedIn or not
const isWardenLogin=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        try {
            token=req.headers.authorization
            const decoded = jwt.verify(token,jwt_secret)
            req.user = await Warden.findById(decoded.id).select("-password")
            //console.log(req.user)
            next()
            
        } catch (err) {
            console.error(err.message)
            return res.status(401).json({msg:"Not Authorized"})
        }
    }
    if(!token){
        return res.status(401).json({msg:"Not Authorized, token not found"})
    }
}


// Check user is incharge
const isIncharge = async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        try {
            token = req.headers.authorization
            const decoded = jwt.verify(token,jwt_secret)
            // console.log(decoded)
            req.user = await HostelIncharge.findById(decoded.id).select("-password")
            // console.log(req.user)
            if(req.user.isadmin===3){
                next()
            }else{
                return res.status(401).json({msg:"Not Authorized, You are not a Hostel Incharge"})
            }

        } catch (err) {
            console.error(err.message)
            return res.status(401).json({msg:"Not Authorized"})
        }
    }
    if(!token){
        return res.status(401).json({msg:"Not Authorized, token not found"})
    }

}
// Check user is HOD
const isHod = async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        try {
            token = req.headers.authorization
            const decoded = jwt.verify(token,jwt_secret)
            // console.log(decoded)
            req.user = await Hod.findById(decoded.id).select("-password")
            // console.log(req.user)
            if(req.user.isadmin===2){
                next()
            }else{
                return res.status(401).json({msg:"Not Authorized, You are not a Hod"})
            }

        } catch (err) {
            console.error(err.message)
            return res.status(401).json({msg:"Not Authorized"})
        }
    }
    if(!token){
        return res.status(401).json({msg:"Not Authorized, token not found"})
    }

}
// Check user is Warden
const isWarden = async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        try {
            token = req.headers.authorization
            const decoded = jwt.verify(token,jwt_secret)
            // console.log(decoded)
            req.user = await Warden.findById(decoded.id).select("-password")
            // console.log(req.user)
            if(req.user.isadmin===1){
                next()
            }else{
                return res.status(401).json({msg:"Not Authorized, You are not a Warden"})
            }

        } catch (err) {
            console.error(err.message)
            return res.status(401).json({msg:"Not Authorized"})
        }
    }
    if(!token){
        return res.status(401).json({msg:"Not Authorized, token not found"})
    }

}

module.exports={isIncharge,isInchargeLogin,isUserLogin,isHod,isHodLogin,isWarden,isWardenLogin}