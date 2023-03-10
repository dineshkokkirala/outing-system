const express = require('express')

const {addHod,
       loginHod,
       allDepartmentOutings,
       userDetails,
       getOutingById,
       allDepartmentUsers,
       approveHodOuting,
       rejectHodOuting,
       changeHodPassword}=require("../controllers/hodControllers")
const {isIncharge,isInchargeLogin,isHod,isHodLogin}=require("../middlewares/authMiddleware")

const router = express.Router()


router.route("/addHod").post(addHod)
router.route("/login").post(loginHod)
router.route("/allOutings").get(isHodLogin,isHod,allDepartmentOutings)
router.route("/allUsers").get(isHodLogin,isHod,allDepartmentUsers)
router.route("/user/:userId").get(isHodLogin,isHod,userDetails)
router.route("/outing/:outingId").get(isHodLogin,isHod,getOutingById)
router.route("/change_password").put(isHodLogin,isHod,changeHodPassword)
router.route("/approve/:outingId").post(isHodLogin,isHod,approveHodOuting)
router.route("/reject/:outingId").post(isHodLogin,isHod,rejectHodOuting)
// router.route("/user/outing/:regno").get(isInchargeLogin,isIncharge,getUserOutings)



module.exports=router