import React, { Component } from 'react'
import "./index.css"
import Cookies from "js-cookie"
import {withRouter} from "react-router-dom"

class AdminLogin extends Component {

    state={
        email:"",
        password:"",
        errMessage:"",
        showErrorMessage:false,
        loading:false
    }

    onChangeEmail=(e)=>{
        this.setState({email:e.target.value})
    }

    onChangePassword=(e)=>{
        this.setState({password:e.target.value})
    }

    onSubmitSuccess=(data)=>{
        const {isadmin,token} = data
        const {history} = this.props
        Cookies.set("token",token,{expires:7})
        Cookies.set("isadmin",isadmin,{expires:7})
        if(isadmin===3){
            history.replace("/incharge")
        }
        if(isadmin===2){
            history.replace("/hod")
        }
        if(isadmin===1){
            history.replace("/warden")
        }
    }


    onSubmitDetails=async(e)=>{
        
        e.preventDefault()
        this.setState({loading:true,showErrorMessage:false,errMessage:""})
        const {email,password} = this.state
        const adminDetails = {email,password}
        const incharges = ["boysincharge@vishnu.edu.in","girlsincharge@vishnu.edu.in"]
        const wardens = ["boyswarden@vishnu.edu.in","girlswarden@vishnu.edu.in"]
        const hods = ["basicsciencehod@vishnu.edu.in","ithod@vishnu.edu.in","ecehod@vishnu.edu.in","csehod@vishnu.edu.in","eeehod@vishnu.edu.in","civilhod@vishnu.edu.in","mechanicalhod@vishnu.edu.in","hod-ece@gmail.com","hod-eee@gmail.com","hod-cse@gmail.com","hod-it@gmail.com","hod-mechanical@gmail.com","hod-civil@gmail.com"]
        
        if(incharges.includes(email)){
            const url = "/api/hostelIncharge/login"
            const options = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(adminDetails)
            }
            const  response = await fetch(url,options)
            const data = await response.json()
            // console.log(data)
            if(response.ok===true){
                //console.log("OK")
                this.onSubmitSuccess(data)
            }else{
               // console.log(data)
                 this.setState({errMessage:data.msg,showErrorMessage:true})
            }
             this.setState({loading:false})   
        }
        else if(wardens.includes(email)){
            const url = "/api/warden/login"
            const options = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(adminDetails)
            }
            const  response = await fetch(url,options)
            const data = await response.json()
            if(response.ok===true){
                this.onSubmitSuccess(data)
            }else{
                 this.setState({errMessage:data.msg,showErrorMessage:true})
            }
             this.setState({loading:false})  
        }
        else if(hods.includes(email)){
            const url = "/api/hod/login"
            const options = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(adminDetails)
            }
            const  response = await fetch(url,options)
            const data = await response.json()
            //console.log(data)
            if(response.ok===true){
                this.onSubmitSuccess(data)
            }else{
                 this.setState({errMessage:data.msg,showErrorMessage:true})
            }
            this.setState({loading:false})       
        }else{
            this.setState({errMessage:"Email is not valid",showErrorMessage:true,loading:false})
        }
        
        
    }

    render() {
        const {errMessage,showErrorMessage,loading} = this.state
        return (
            <div className=" card p-4 text-center adminCard">
                <div>
                    <div className="text-center">
                        <h1 className="mb-5">Admin Login</h1>
                        <form onSubmit={this.onSubmitDetails}>
                        <input type="email" required onChange={this.onChangeEmail} className="form-control mb-3" name="email" placeholder="Email"/>
                        <input type="password" required onChange={this.onChangePassword} className="form-control" name="password" placeholder="Password"/>
                        {showErrorMessage&&(<p className="text-danger mt-3">*{errMessage}</p>)}
                        {loading&&(
                            <div className="mt-4">
                                <div className="spinner-border" role="status">
                                </div>
                            </div>)
                        }
                        <input type="submit" className="mt-3 w-100 custom-login-btn" value="Login" />
                    </form> 
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminLogin)
