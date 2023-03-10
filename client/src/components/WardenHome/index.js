import React, { Component } from 'react'
import NavbarComponent from "../Navbar/Navbar"
import Cookies from "js-cookie"
import "./index.css"
import {Link} from "react-router-dom"

class WardenHome extends Component {

    state={
        allHostels:[],
        loading:false
    }

    getAllHostels=async()=>{
        this.setState({loading:true})
        const url = "/api/warden/allHostels"
        const options={
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
       //console.log(data)
        this.setState({allHostels:data,loading:false})
    }

    componentDidMount=()=>{
        this.getAllHostels()
    }
    
    render() {
        const {allHostels,loading} = this.state
        return (
            <div>
                <NavbarComponent />
                <div className=" warden-container p-5">
                    <div className="row">
                        {loading&&(
                                <div className="mt-4 alignText col-12">
                                    <div className="spinner-border" role="status">
                                    </div>
                                </div>)
                        }
                        {allHostels.map((hostel)=>(
                            
                                <Link key={hostel._id} className="card col-12 col-md-6 text-center p-4 nav-link shadow cardMarginHome" to={`/warden/hostel/${hostel._id}`}>
                                    <div>
                                        <h1 className="cardHeading">{hostel.name}</h1>
                                    </div>
                                </Link>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default WardenHome
