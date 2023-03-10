import React, { Component } from 'react'
import Cookies from "js-cookie"
import NavbarComponent from "../Navbar/Navbar"
import "./index.css"
import {Link} from "react-router-dom"

class Hostel extends Component {

    state={
        hostelData:[],
        searchInput:"",
        outing:false,
        loading:false
    }

    onChangeSearchInput=(e)=>{
        this.setState({searchInput:e.target.value})
    }

    getHostelData=async()=>{
        this.setState({loading:true})
        const {match} = this.props
        const {params} = match
        const {id} = params
        //console.log(id)
        let url
        if(Cookies.get("isadmin")==="3"){
            url = `/api/hostelIncharge/hostel/${id}`
        }
        else if(Cookies.get("isadmin")==="1"){
            url = `/api/warden/hostel/${id}`
        }
        const options={
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        //console.log(data)
       this.setState({hostelData:data,loading:false})
    }

    updateOuting=async(userId)=>{
        const url = `/api/warden/update/user/${userId}`
        const options = {
            method:"POST",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        await fetch(url,options)
       // const data = await response.json()
      //  console.log(data)
        const {history} = this.props
        history.replace("/warden")

    }

    componentDidMount=()=>{
        this.getHostelData()
    }

    render() {
        const {hostelData,searchInput,loading} = this.state
       // console.log(searchInput)
        var searchResults;
        if(searchInput === ""){
            searchResults=hostelData;
        }
        else if("outing".includes(searchInput)){
            searchResults = hostelData.filter(eachUser=>eachUser.outing===true)
        }
        else
        searchResults = hostelData.filter(eachUser=>eachUser.regno.includes(searchInput)||eachUser.firstname.toLowerCase().includes(searchInput.toLowerCase())||eachUser.lastname.toLowerCase().includes(searchInput.toLowerCase()))
       // console.log(searchResults)
        // searchResults = hostelData.filter(eachUser=>eachUser.outing===outing)
        return (
            <div>
                <NavbarComponent />
                <div className="container">
                    <div className="row">
                    <div className="col-12 mt-5">
                        {!loading?(
                            <div className="card p-4 stats">
                            <div>
                                <h3>Total : {hostelData.length}</h3>
                            </div>
                            <div>
                                <h3>In Outing : {hostelData.filter((student)=>(student.outing===true)).length}</h3>
                            </div>
                            <div>
                                <h3>In Hostel : {hostelData.filter((student)=>(student.outing===false)).length}</h3>
                            </div>
                        </div>
                        ):(
                            <div className="spinner-border" role="status">
                            </div>
                        )}
                    </div>
                    <div className="col-12">
                        <input type="search" placeholder="Search..." onChange={this.onChangeSearchInput}  className="form-control mt-5 mb-2" />
                        {/* <input type="checkbox" name="outing" value="in" onChange={this.onChangeOuting} className="ml-2" />
                        <label className="mr-3"> In Hostel</label> */}
                       
                    </div>
                    {!loading?(
                        searchResults.length>0?(
                            searchResults.map((student)=>(
                                <div className="card col-12 p-4 shadow col-lg-4 cardMargin" key={student._id}>
                                    <h2>{student.firstname} {student.lastname}</h2>
                                    <p><span className="sideHeading">Email: </span>{student.email}</p>
                                    <p><span className="sideHeading">Reg.no: </span>{student.regno}</p>
                                    <p><span className="sideHeading">Mobile: </span>{student.mobile}</p>
                                    <p><span className="sideHeading">Year: </span>{student.year}</p>
                                    <p><span className="sideHeading">Department: </span>{student.department}</p>
                                    <p><span className="sideHeading">Section: </span>{student.section}</p>
                                    <p><span className="sideHeading">Outing Type: </span>{student.outingtype}</p>
                                    <p><span className="sideHeading">Parent/Guardian Mobile: </span>{student.parentmobile}</p>
                                    <p><span className="sideHeading">Parent/Guardian Name: </span>{student.parent}</p>
                                    <p><span className="sideHeading">Blood Group: </span>{student.bloodgroup}</p>
                                    <p><span className="sideHeading">Hostel Name: </span>{student.hostelname}</p>
                                    <p><span className="sideHeading">Outing: </span><span className="text-bold">{student.outing===true?"In Outing":"In Hostel"}</span></p>
                                    {(Cookies.get("isadmin")==="1"&&student.outing===true)&&(<button className="btn btn-success" onClick={()=>this.updateOuting(student._id)}>Update Outing</button>)}
                                    {(Cookies.get("isadmin")==="3")&&(<Link to={`/edit/student/${student._id}`}><button className="btn btn-success w-100">Update Student</button></Link>)}
                                    {/* <i className="bi bi-trash"></i> */}
                                </div>
                            ))
                        ):(
                            <h5>No Students Found in Hostel</h5>
                        )
                    ):(
                        <div className="spinner-border" role="status">
                        </div>
                    )
                }
                    {/* {outing&&
                    outingResults.map((student)=>(
                        <div className="card col-12 p-4 shadow col-lg-4 cardMargin" key={student._id}>
                            <h2>{student.firstname} {student.lastname}</h2>
                            <p><span className="sideHeading">Email: </span>{student.email}</p>
                            <p><span className="sideHeading">Reg.no: </span>{student.regno}</p>
                            <p><span className="sideHeading">Mobile: </span>{student.mobile}</p>
                            <p><span className="sideHeading">Year: </span>{student.year}</p>
                            <p><span className="sideHeading">Department: </span>{student.department}</p>
                            <p><span className="sideHeading">Section: </span>{student.section}</p>
                            <p><span className="sideHeading">Outing Type: </span>{student.outingtype}</p>
                            <p><span className="sideHeading">Parent/Guardian Mobile: </span>{student.parentmobile}</p>
                            <p><span className="sideHeading">Parent/Guardian Name: </span>{student.parent}</p>
                            <p><span className="sideHeading">Blood Group: </span>{student.bloodgroup}</p>
                            <p><span className="sideHeading">Hostel Name: </span>{student.hostelname}</p>
                            <p><span className="sideHeading">Outing: </span>{student.outing===true?"In Outing":"In Hostel"}</p>
                        </div>
                    ))
                } */}
                    </div>
                </div>
                

            </div>
        )
    }   
}

export default Hostel
