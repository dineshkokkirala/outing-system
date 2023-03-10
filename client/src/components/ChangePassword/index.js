import React, { Component } from 'react'
import Cookies from "js-cookie"
import {withRouter} from "react-router-dom"
import "./index.css"
import NavbarComponent from "../Navbar/Navbar"


class ChangePassword extends Component {

    state = {
        loading:false,
        error:false,
        errorMessage:"",
        old_password:"",
        new_password:"",
        confirm_password:""
    }

    onChangeOldPassword=(e)=>{
        this.setState({old_password:e.target.value})
    }

    onChangeNewPassword=(e)=>{
        this.setState({new_password:e.target.value})
    }

    onChangeConfirmPassword=(e)=>{
        this.setState({confirm_password:e.target.value})
    }

    submitHandler=async(e)=>{
        e.preventDefault()
        this.setState({loading:true,error:false,errorMessage:""})
        const {old_password,new_password,confirm_password} = this.state
        const userDetails = {old_password,new_password}
        if(new_password!==confirm_password){
            this.setState({error:true,errorMessage:"New Password & Confirm Password Should Same",loading:false})
            return 
        }
       // console.log(userDetails)
        let url
        if(Cookies.get("isadmin")==="3"){
            url="/api/hostelIncharge/change_password"
        }
        else if(Cookies.get("isadmin")==="2"){
            url="/api/hod/change_password"
        }
        else if(Cookies.get("isadmin")==="1"){
            url="/api/warden/change_password"
        }else{
            url="/api/user/change_password"
        }
        const options = {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":Cookies.get("token")
            },
            body:JSON.stringify(userDetails),
        }
        const response = await fetch(url,options)
        const data = await response.json()
        //console.log(data)
        if(response.ok===true){
            const {history} = this.props
            history.replace("/")
        }else{
            this.setState({error:true,errorMessage:data.msg,loading:false})
        }
        this.setState({loading:false})

    }

   

    render() {
        const {loading,error,errorMessage} = this.state
        return (
            <div>
                <NavbarComponent />
                <div className="change-password-container">
                <div className="container p-5 change-fields-container">
                    <div className="row">
                            <div className="col-12">
                                <h5 className="text-center text-white mb-3">Change Password</h5>
                                {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button> */}
                            </div>
                            <div className="col-12">
                                <form onSubmit={this.submitHandler}>
                                    <div className="form-group col-12">
                                        <input type="password" onChange={this.onChangeOldPassword} required name="old_password" id="old_password" placeholder="Old Password" className="form-control" />
                                    </div>
                                    <div className="form-group col-12">
                                        <input type="password" onChange={this.onChangeNewPassword} required name="new_password" id="new_password" placeholder="New Password" className="form-control" />
                                    </div>
                                    <div className="form-group col-12">
                                        <input type="password" onChange={this.onChangeConfirmPassword} required name="confirm_password" id="confirm_password" placeholder="Confirm Password" className="form-control" />
                                    </div>
                                    <div className="text-center">
                                        {loading&&(
                                            <div className="mt-4 mb-4">
                                                <div class="spinner-border" role="status">
                                                </div>
                                            </div>)
                                        }
                                    {error&&(<p className="text-danger">*{errorMessage}</p>)}
                                    </div>
                                    <div className="col-12">
                                    {/* <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Close</button> */}
                                    <button type="submit" className="custom-change-password-button btn-block">CHANGE</button>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ChangePassword)
