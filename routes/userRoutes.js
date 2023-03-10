const express = require("express")

const router = express.Router()
const {loginUser,changeUserPassword,userDetails,myOuting,userOutings}=require("../controllers/userControllers")
const {isUserLogin} = require("../middlewares/authMiddleware")

router.route("/login").post(loginUser)
router.route("/change_password").put(isUserLogin,changeUserPassword)
router.route("/my_outing").get(isUserLogin,myOuting)
router.route("/myOutings").get(isUserLogin,userOutings)
router.route("/my_details").get(isUserLogin,userDetails)


module.exports = router