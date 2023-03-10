import React, { Component } from 'react'
import NavbarComponent from "../Navbar/Navbar"
import Cookies from "js-cookie"
import "./index.css"
import {withRouter} from "react-router-dom"

class EachWardenOuting extends Component {

    state={
        outing:{},
        user:{},
        userId:"",
        classNames:"d-none",
        acceptClassNames:"",
        rejectionReason:"",
        error:false,
        errorMessage:"",
        loading:false,
        loading2:false
    }

    onChangeRejectionHandler=(e)=>{
        this.setState({rejectionReason:e.target.value})
    }


    rejectOuting=async(outing_id)=>{
        const {rejectionReason} = this.state
        this.setState({loading:true})
       // console.log(rejectionReason)
       const {history} = this.props
       const inputData={rejectionReason}
        if(rejectionReason===""){
            this.setState({error:true,errorMessage:"*Rejection Message is Required"})
        }else{
            const url = `/api/warden/reject/${outing_id}`
            const options = {
                method:"POST",
                body:JSON.stringify(inputData),
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":Cookies.get("token")
                }
            }
             await fetch(url,options)
           // const data = await response.json()
           // console.log(data)
            history.replace("/warden/outings")
        }
        this.setState({loading:false})

    }

    rejectionCalled=()=>{
        this.setState({classNames:"",acceptClassNames:"disabled"})
        const {match} = this.props
        const {params} = match
        const {id} = params
        this.rejectOuting(id)
    }

    acceptOuting=async(outing_id)=>{
       const {history} = this.props
        this.setState({loading:true})
            const url = `/api/warden/approve/${outing_id}`
            const options = {
                method:"POST",
                headers:{
                    "Authorization":Cookies.get("token")
                }
            }
             await fetch(url,options)
           // const data = await response.json()
           // console.log(data)
            history.replace("/warden/outings")
            this.setState({loading:false})
    }

    acceptanceCalled=()=>{
        const {match} = this.props
        const {params} = match
        const {id} = params
        this.acceptOuting(id)
    }

    getOutingData=async(outing_id)=>{
        this.setState({loading2:true})
        const url = `/api/warden/outing/${outing_id}`
        const options={
            methos:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        //console.log(data)
        this.setState({outing:data,userId:data.userId,loading2:false})
    }

    getUser=async(id)=>{
        this.setState({loading2:true})
        const url = `/api/warden/user/${id}`
        const options={
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        //console.log(data)
        this.setState({user:data,loading2:false})
    }

   

    componentDidMount=async()=>{
        const {match} = this.props
        const {params} = match
        const {id,user_id} = params
        this.getOutingData(id)
        this.getUser(user_id)
    }

    render() {
        const {outing,user,classNames,acceptClassNames,error,errorMessage,loading,loading2} = this.state
        //console.log(error,errorMessage)
       const {firstname,lastname,gender,department,section,year,parent,parentmobile,mobile,regno,outingtype} = user
       const {from,to,outtime,reason,reasontype} = outing
      // console.log(user)
        return (
            <div>
                <NavbarComponent />
                {!loading2?(
                    <div className="mainDiv card shadow m-4">
                    <div className="bg_container">
                        <p><span className="sub-heading">Name</span> : {firstname} {lastname}</p>
                        <p><span className="sub-heading">Reg No</span> : {regno}</p>
                        <p><span className="sub-heading">Department</span>: {department}</p>
                        <p><span className="sub-heading">Year</span>: {year}</p>
                        <p><span className="sub-heading">Section</span>: {section}</p>
                        <p><span className="sub-heading">Gender</span>: {gender}</p>
                        <p><span className="sub-heading">Student Mobile</span>: {mobile}</p>
                        <p><span className="sub-heading">Parent/Guardian Name</span>: {parent}</p>
                        <p><span className="sub-heading">Parent/Guardian Mobile</span>: {parentmobile} </p>
                    </div>
                    <div className="bg_container">
                        <p><span className="sub-heading">Outing Type</span>: {outingtype}</p>
                        <p><span className="sub-heading">From</span> : {from}</p>
                        <p><span className="sub-heading">To</span> : {to}</p>
                        <p><span className="sub-heading">Reason Type</span>: {reasontype}</p>
                        <p><span className="sub-heading">Out Time</span>: {outtime}</p>
                    </div>
                </div>

                ):(
                    <div className="spinner-border p-3 m-5" role="status">
                    </div>
                )}
                {!loading2?(
                    <div className="card shadow m-4 bg_container">
                    <p><span className="sub-heading">Reason</span>: {reason}</p>
                    <div className={`form-group ${classNames}`}>
                        <textarea className="form-control" onChange={this.onChangeRejectionHandler} row="5" placeholder="Rejection Reason"></textarea>
                    </div>
                    {error&&(<p className="text-danger">{errorMessage}</p>)}
                    {loading&&(
                        <div className="spinner-border p-3 m-3 mb-3" role="status">
                        </div>
                    )}
                    <div className="d-flex flex-row justify-content-around">
                        <button className={`btn btn-success w-100 mr-5 ${acceptClassNames}`} onClick={this.acceptanceCalled}>Accept</button>
                        <button className="btn btn-danger w-100" onClick={this.rejectionCalled}>Reject</button>
                    </div>
                </div>
                ):null}
                
            </div>
        )
    }
}

export default withRouter(EachWardenOuting)
