import React, { Component } from 'react'
import NavbarComponent from "../Navbar/Navbar"
import Cookies from "js-cookie"
import "./index.css"
// import {Link} from "react-router-dom"

class HodHome extends Component {

    state={
        allUsers:[],
        searchInput:"",
        loading:false,
        outing:false
    }

    getAllUsers=async()=>{
        this.setState({loading:true})
        const url = "/api/hod/allUsers"
        const options={
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
       // console.log(data)
       this.setState({allUsers:data,loading:false})
    }
    

    componentDidMount=()=>{
        this.getAllUsers()
    }

    onChangeSearchInput=(e)=>{
        this.setState({searchInput:e.target.value})
        //console.log(e.target.value)  
    }

    
    render() {
        const {allUsers,loading,searchInput} = this.state
        var searchResults;
        if(searchInput === ""){
            searchResults= allUsers;
        }
        else if("outing".includes(searchInput)){
            searchResults = allUsers.filter(eachUser=>eachUser.outing===true)
        }
        else
        searchResults = allUsers.filter(eachUser=>eachUser.regno.includes(searchInput)||eachUser.firstname.toLowerCase().includes(searchInput.toLowerCase())||eachUser.lastname.toLowerCase().includes(searchInput.toLowerCase()))
       // console.log(searchResults)
        //let searchResults = allUsers.filter(eachUser=>eachUser.regno.includes(searchInput)||eachUser.outing===true||eachUser.firstname.toLowerCase().includes(searchInput.toLowerCase())||eachUser.lastname.toLowerCase().includes(searchInput.toLowerCase()))
       // searchResults = allUsers.filter(eachUser=>eachUser.outing===outing)
        return (
            <div className="hod-container">
            <div>
                <NavbarComponent />
                <div className="container">
                    <div className="row">
                        {loading&&(
                                 <div className="mt-4 col-12 alignText">
                                    <div class="spinner-border" role="status">
                                    </div>
                                </div>)
                        }
                         <div className="col-12">
                            <input type="search" placeholder="Search..." onChange={this.onChangeSearchInput}  className="form-control mt-5 mb-2" />
            
                        </div>
                        
                            {searchResults.map((student)=>(
                                // <Link key={student._id} className="card col-12 col-md-4 text-center p-3 shadow cardMarginHome" >
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
                                // </Link>
                            ))}
                       
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default HodHome
