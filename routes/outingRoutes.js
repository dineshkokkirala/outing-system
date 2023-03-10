const express = require("express")

const router = express.Router()
const {applyOuting,getUserOutings}=require("../controllers/outingControllers")
const {isUserLogin}=require("../middlewares/authMiddleware")


router.route("/applyOuting").post(isUserLogin,applyOuting)
router.route("/:regno").get(isUserLogin,getUserOutings)
// router.route("/test").get((req,res)=>{
//     res.send("Outing testing")
// })



module.exports = router