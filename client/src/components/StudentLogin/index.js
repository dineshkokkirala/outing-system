import React, { Component } from 'react'
import "./index.css"
import {withRouter} from "react-router-dom"
import Cookies from "js-cookie"



class StudentLogin extends Component {

    state={
        regno:"",
        password:"",
        errMessage:"",
        showErrorMessage:false,
        loading:false
    }
i
    onChangeRegno=(e)=>{
        this.setState({regno:e.target.value})
    }

    onChangePassword=(e)=>{
        this.setState({password:e.target.value})
    }

    onSubmitSuccess=(data)=>{
        const token = data.token
        const isadmin = data.isadmin
        Cookies.set("token",token,{expires:7})
        Cookies.set("isadmin",isadmin,{expires:7})
        const {history} = this.props
        history.replace("/")
    }

    studentLoginSubmit=async(e)=>{
        e.preventDefault()
        this.setState({loading:true,showErrorMessage:false,errMessage:""})
        const {regno,password} = this.state
        const userDetails = {regno:regno.toLowerCase(),password}
        const url = "/api/user/login"
        const options={
            method:"POST",
            body:JSON.stringify(userDetails),
            headers:{
                "Content-Type":"application/json"
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
       if(response.ok===true){
           this.onSubmitSuccess(data)
       }else{
            this.setState({errMessage:data.msg,showErrorMessage:true})
       }
       this.setState({loading:false})
    }

    render() {

     
        const {regno,password,errMessage,showErrorMessage,loading} = this.state
        return (
            <div className="card p-4 text-center studentCard">
                <div className="">
                    <h1 className="mb-5">Student Login</h1>
                    <form  onSubmit={this.studentLoginSubmit}>
                        <input type="text" onChange={this.onChangeRegno} value={regno} className="form-control mb-3" name="regno" placeholder="Reg. No"/>
                        <input type="password" onChange={this.onChangePassword} value={password} className="form-control" name="password" placeholder="Password"/>
                        {showErrorMessage&&(<p className="text-danger mt-3">*{errMessage}</p>)}
                        {loading&&(
                            <div className="mt-4"> 
                                <div className="spinner-border" role="status">
                                   
                                </div>

                            </div>)
                        }
                        <input type="submit" className="custom-login-btn mt-3 w-100" value="Login" />
                    </form>

                </div>
            </div>
        )
    }
}

export default withRouter(StudentLogin)
