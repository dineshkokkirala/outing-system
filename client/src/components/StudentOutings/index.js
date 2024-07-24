import React, { Component } from 'react'
import NavbarComponent from "../Navbar/Navbar"
import Cookies from "js-cookie"
import "./index.css"

class StudentOutings extends Component {

    state={
        my_outings:[],
        my_outing:[],
        loading:false
    }

    getAllMyOutings=async()=>{
        this.setState({loading:true})
        const url = "/api/user/myOutings"
        const options={
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        //console.log(data)
        this.setState({my_outings:data,loading:false})
    }

    getMyOutingStatus=async()=>{
        const url = "/api/user/my_outing"
        const options={
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        //console.log(data)
        this.setState({my_outing:data})
    }


    componentDidMount=async()=>{
        this.getAllMyOutings()
        this.getMyOutingStatus()
    }

    hodProcessContainer=()=>{
        return (
            <div className="d-flex flex-row effects-container justify-content-between">
                <div className="light bg-warning"></div>
                <div className="light"></div>
                <div className="light"></div>
            </div>
        )
    }
    hodApporveContainer=()=>{
        return (
            <div className="d-flex flex-row effects-container justify-content-between">
                <div className="light bg-success"></div>
                <div className="light bg-warning"></div>
                <div className="light"></div>
            </div>
        )
    }
    hodRejectionContainer=()=>{
        return (
            <div className="d-flex flex-row effects-container justify-content-between">
                <div className="light bg-danger"></div>
                <div className="light"></div>
                <div className="light"></div>
            </div>
        )
    }
    inchargeProcessContainer=()=>{
        return (
            <div className="d-flex flex-row effects-container justify-content-between">
                <div className="light bg-success"></div>
                <div className="light bg-warning"></div>
                <div className="light"></div>
            </div>
        )
    }
    inchargeApporveContainer=()=>{
        return (
            <div className="d-flex flex-row effects-container justify-content-between">
                <div className="light bg-success"></div>
                <div className="light bg-success"></div>
                <div className="light bg-warning"></div>
            </div>
        )
    }
    inchargeRejectionContainer=()=>{
        return (
            <div className="d-flex flex-row effects-container justify-content-between">
                <div className="light bg-success"></div>
                <div className="light bg-danger"></div>
                <div className="light"></div>
            </div>
        )
    }
    wardenProcessContainer=()=>{
        return (
            <div className="d-flex flex-row effects-container justify-content-between">
                <div className="light bg-success"></div>
                <div className="light bg-success"></div>
                <div className="light bg-warning"></div>
            </div>
        )
    }
    wardenApporveContainer=()=>{
        return (
            <div className="d-flex flex-row effects-container justify-content-between">
                <div className="light bg-success"></div>
                <div className="light bg-success"></div>
                <div className="light bg-success"></div>
            </div>
        )
    }
    wardenRejectionContainer=()=>{
        return (
            <div className="d-flex flex-row effects-container justify-content-between">
                <div className="light bg-success"></div>
                <div className="light bg-success"></div>
                <div className="light bg-danger"></div>
            </div>
        )
    }

    render() {
        const {my_outings,my_outing,loading} = this.state
        const outing = my_outing[0]
        //console.log(outing)
        return (
            <div className="my-outings-container">
                <NavbarComponent />
                <div>
                <div className="blur">
                    {my_outing.length>0&&(
                        <div className="card p-3 text-center m-5" style={{marginTop:"40px"}}>
                            <div className="lights-container">
                                <h4>Outing Status</h4>  
                                <div>
                                    {(outing.hod===0&&outing.process===1&&outing.incharge===0&&outing.warden===0)&&(this.hodProcessContainer())}
                                    {(outing.hod===1&&outing.process===1&&outing.incharge===0&&outing.warden===0)&&(this.hodApporveContainer())}
                                    {/*(outing.hod===1&&outing.process===1&&outing.incharge===0&&outing.warden===0)&&(this.inchargeProcessContainer())*/}
                                    {(outing.hod===1&&outing.process===1&&outing.incharge===1&&outing.warden===0)&&(this.inchargeApporveContainer())}
                                    {/*(outing.hod===1&&outing.process===1&&outing.incharge===1&&outing.warden===0)&&(this.wardenProcessContainer())*/}
                                    {(outing.hod===1&&outing.process===0&&outing.incharge===1&&outing.warden===1)&&(this.wardenApporveContainer())}
                                    {(outing.hod===0&&outing.process===0&&outing.incharge===0&&outing.warden===0&&outing.rejectby==="HOD")&&(this.hodRejectionContainer())}
                                    {(outing.hod===0&&outing.process===0&&outing.incharge===0&&outing.warden===0&&outing.rejectby==="INCHARGE")&&(this.inchargeRejectionContainer())}
                                    {(outing.hod===0&&outing.process===0&&outing.incharge===0&&outing.warden===0&&outing.rejectby==="WARDEN")&&(this.wardenRejectionContainer())}
                                </div>
                            </div>
                            {outing.rejectreason!==""&&(<p className="mt-4">Reason: <span className="text-danger font-weight-bold">{outing.rejectreason}</span></p>)}
                            
                        </div>
                    )}
                </div>
                <h4 className="mt-5 ml-4">My Outings</h4>
                    <div className="p-4">
                        {loading?(
                            <div className="spinner-border" role="status">
                               
                            </div>
                        ):(
                            my_outings.length>0?(
                                <table className="table blur">
                                    <thead className="thead-dark">
                                        <tr>
                                        <th scope="col">Reason Type</th>
                                        <th scope="col">From</th>
                                        <th scope="col">To</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {my_outings.map((outing)=>(
                                            <tr className="outingText" key={outing._id}>
                                            <td>{outing.reasontype.charAt(0).toUpperCase()+outing.reasontype.slice(1)}</td>
                                            <td>{outing.from}</td>
                                            <td>{outing.to}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ):(
                                <h3>No Previous Outings</h3>
                            )
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentOutings
