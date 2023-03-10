import React, { Component } from 'react'
import Cookies from "js-cookie"
import {Redirect} from "react-router-dom"
import NavbarComponent from "../Navbar/Navbar"
import "./index.css"

class StudentLogin extends Component {

    state={
        user:{},
        loading:false
    }

    proxyAvoid=async()=>{
        this.setState({loading:true})
        const url = "/api/user/my_details"
        const options = {
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
       this.setState({user:data,loading:false})
    }


    componentDidMount=()=>{
        this.proxyAvoid()
    }

    render() {

        const {user,loading} = this.state
        const token = Cookies.get("token")
        if(token===undefined){
            return <Redirect to="/login" />
        }
        

        return (
            <div>
                <NavbarComponent />
                <div className="student-home-container">
                    <div className="details-container">
                        {loading?(
                            <div className="spinner-border" role="status"></div>
                        ):(
                            <div className="card p-3 container-1">
                                <h3>Name: {user.firstname} {user.lastname}</h3>
                                <p><span className="text-color">Reg No:  </span> {user.regno}</p>
                                <p><span className="text-color">Email:  </span>{user.email}</p>
                                <p><span className="text-color">Mobile:  </span> {user.mobile}</p>
                                <p><span className="text-color">Department:  </span> {user.department}</p>
                                <p><span className="text-color">Year:  </span>{user.year}</p>
                                <p><span className="text-color">Section:  </span> {user.section}</p>
                                <p><span className="text-color">Blood Group:  </span> {user.bloodgroup}</p>
                                <p><span className="text-color">Hostel Name:  </span> {user.hostelname}</p>
                                <p><span className="text-color">Outing Type:  </span>{user.outingtype&&(user.outingtype.charAt(0).toUpperCase()+user.outingtype.slice(1))}</p>
                                <p><span className="text-color">Parent/Guardian Name:  </span> {user.parent}</p>
                                <p><span className="text-color">Parent/Guardian Mobile:  </span> {user.parentmobile}</p>
                                <p><span className="text-color">Address:  </span> {user.address}</p>
                            </div>
                        )} 
                        {/* <div className="card p-3 container-2">
                            
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentLogin
