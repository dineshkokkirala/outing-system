import React, { Component } from 'react'
import NavbarComponent from "../Navbar/Navbar"
import Cookies from "js-cookie";
import "./index.css"
class ApplyOuting extends Component {

    state={
        reasontype:"",
        outtime:"",
        reason:"",
        from:"",
        to:"",
        error:false,
        errorMessage:"",
        loading:false
    }

    onSubmitHandler=async(e)=>{
        e.preventDefault()
        this.setState({loading:true})
        this.setState({error:false,errorMessage:""})
        const {reason,reasontype,from,to,outtime} = this.state
        const outingData = {reason,reasontype,from,to,outtime}
        //console.log(outingData)
        const url = "/api/outing/applyOuting"
        const options={
            method:"POST",
            body:JSON.stringify(outingData),
            headers:{
                    "Content-Type":"application/json",
                    "Authorization":Cookies.get("token")
            }  
        }
        const response = await fetch(url,options)
        const data = await response.json()
       // console.log(data)
        if(response.ok===true){
            const {history} = this.props
            history.replace("/")
        }else{
            this.setState({error:true,errorMessage:data.msg})
        }
        this.setState({loading:false})
    }

    
    onChangeReasontype=(e)=>{
        this.setState({reasontype:e.target.value})
    }
    onChangeOuttime=(e)=>{
        this.setState({outtime:e.target.value})
    }
    onChangeReason=(e)=>{
        this.setState({reason:e.target.value})
    }
    onChangeFrom=(e)=>{
        this.setState({from:e.target.value})
    }
    onChangeTo=(e)=>{
        this.setState({to:e.target.value})
    }

    render() {
        const {loading,error,errorMessage} = this.state
        return (
            <div>
                <NavbarComponent />
                <div className="apply-container">
                <div className="container blur">
                    <div className="row">
                        <div className="col-12 mt-3 mb-3">
                            <h1>Apply Outing</h1>
                        </div>
                                    <div className="form-group col-12 col-md-6">
                                       <label htmlFor="reasontype">Reason Type</label>
                                       <select className="form-control" id="reasontype" onChange={this.onChangeReasontype} name="reasontype" >
                                            <option  defaultValue>Select</option>
                                            <option value="general">General</option>
                                            <option value="personal">Personal</option>
                                            <option value="publicholiday">Public Holiday</option>
                                            <option value="emergency">Emergency</option>
                                        </select>
                                    </div>
                                 
                                    <div className="form-group col-12 col-md-6">
                                       <label htmlFor="outtime">Outing Time</label>
                                       <input type="text" className="form-control" onChange={this.onChangeOuttime} placeholder="Ex: 5PM, 6AM"  />
                                    </div>
                                    <div className="form-group col-12 col-md-6">
                                       <label htmlFor="from">From Date</label>
                                       <input type="date" className="form-control" onChange={this.onChangeFrom}  />
                                    </div>
                                    <div className="form-group col-12 col-md-6">
                                       <label htmlFor="to">To Date</label>
                                       <input type="date" className="form-control" onChange={this.onChangeTo}  />
                                    </div>
                                    <div className="form-group col-12">
                                       <label htmlFor="reason">Reason</label>
                                       <textarea className="form-control" rows="10" onChange={this.onChangeReason}></textarea>
                                    </div>
                                    {error&&(<p className="text-danger text-center mt-3 mb-3">*{errorMessage}</p>)}
                                    {loading&&(
                                    <div className="mt-4 text-center mb-4">
                                        <div className="spinner-border" role="status">
                                        </div>
                                    </div>)
                                    }
                                    <div className="col-12">
                                        <button className="btn btn-success w-100 mb-5" onClick={this.onSubmitHandler}>Apply</button>
                                    </div>
                    </div>
                </div>  
                </div>
            </div>
        )
    }
}

export default ApplyOuting
