const express = require("express")
const dbConnection = require("./config/db")
const hostelInchargeRoutes = require("./routes/hostelInchargeRoutes")
const userRoutes = require("./routes/userRoutes") 
const outingRoutes = require("./routes/outingRoutes")
const hodRoutes = require("./routes/hodRoutes")
const wardenRoutes = require("./routes/wardenRoutes")
const path = require("path")
const app=express()

//DB Connection
dbConnection()

//Middleware
app.use(express.json())




app.use("/api/hostelIncharge",hostelInchargeRoutes)
app.use("/api/user/",userRoutes)
app.use("/api/outing/",outingRoutes)
app.use("/api/hod/",hodRoutes)
app.use("/api/warden/",wardenRoutes)

// app.get("/test",(req,res)=>{
    //     res.send("API Works...")
    // })


//Serve statis assets in production
if(process.env.NODE_ENV==="production"){
    //Set static folder
    app.use(express.static("client/build"))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}
    
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server Running running on ${PORT}`)
})