const express = require('express')

const {addIncharge,
       getAllStudentsByHostel,
       getOutingById,
       getAllStudentsInOuting,
       userDetails,
       addHostel,
       addStudent,
       getAllHostelsByGender,
       loginIncharge,
       allGenderOutings,
       approveInchargeOuting,
       rejectInchargeOuting,
       updateUser,deleteUser,
       changeInchargePassword,
       changeStudentPassword} = require("../controllers/hostelInchargeControllers")
const {isIncharge,isInchargeLogin}=require("../middlewares/authMiddleware")
const {getUserOutings}=require("../controllers/outingControllers")

const router = express.Router()


router.route("/addIncharge").post(addIncharge)
router.route("/login").post(loginIncharge)
router.route("/addStudent").post(isInchargeLogin,isIncharge,addStudent)
router.route("/addHostel").post(isInchargeLogin,isIncharge,addHostel)
router.route("/update/:userId").put(isInchargeLogin,isIncharge,updateUser)
router.route("/delete/:userId").delete(isInchargeLogin,isIncharge,deleteUser)
router.route("/change_password").put(isInchargeLogin,isIncharge,changeInchargePassword)
router.route("/change_student_password/:studentId").put(isInchargeLogin,isIncharge,changeStudentPassword)
router.route("/user/outing/:regno").get(isInchargeLogin,isIncharge,getUserOutings)
router.route("/all/outings").get(isInchargeLogin,isIncharge,getAllStudentsInOuting)
router.route("/user/:userId").get(isInchargeLogin,isIncharge,userDetails)
router.route("/hostel/:hostelId").get(isInchargeLogin,isIncharge,getAllStudentsByHostel)
router.route("/outing/:outingId").get(isInchargeLogin,isIncharge,getOutingById)
router.route("/allHostels").get(isInchargeLogin,isIncharge,getAllHostelsByGender)
router.route("/all_outings").get(isInchargeLogin,isIncharge,allGenderOutings)
router.route("/approve/:outingId").post(isInchargeLogin,isIncharge,approveInchargeOuting)
router.route("/reject/:outingId").post(isInchargeLogin,isIncharge,rejectInchargeOuting)



module.exports=router