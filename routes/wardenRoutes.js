const express = require("express")

const router = express.Router()
const {addWarden,
       loginWarden,
       allGenderOutings,
       userDetails,
       updateUserOuting,
       getOutingById,
       approveWardenOuting,
       getAllStudentsByHostel,
       getAllHostelsByGender,
       rejectWardenOuting,
       changeWardenPassword}=require("../controllers/wardenControllers")
const {isWarden,isWardenLogin}=require("../middlewares/authMiddleware")

router.route("/addWarden").post(addWarden)
router.route("/login").post(loginWarden)
router.route("/allOutings").get(isWardenLogin,isWarden,allGenderOutings)
router.route("/change_password").put(isWardenLogin,isWarden,changeWardenPassword)
router.route("/approve/:outingId").post(isWardenLogin,isWarden,approveWardenOuting)
router.route("/reject/:outingId").post(isWardenLogin,isWarden,rejectWardenOuting)
router.route("/update/user/:userId").post(isWardenLogin,isWarden,updateUserOuting)
router.route("/allHostels").get(isWardenLogin,isWarden,getAllHostelsByGender)
router.route("/hostel/:hostelId").get(isWardenLogin,isWarden,getAllStudentsByHostel)
router.route("/user/:userId").get(isWardenLogin,isWarden,userDetails)
router.route("/outing/:outingId").get(isWardenLogin,isWarden,getOutingById)


module.exports = router
