import React, { Component } from 'react'
import NavbarComponent from "../Navbar/Navbar"
import Cookies from "js-cookie"
import "./index.css"
import {Link} from "react-router-dom"

class InchargeHome extends Component {

    state={
        allHostels:[],
        loading:false,
        hostelData:[]
    }

    getAllHostels=async()=>{
        this.setState({loading:true})
        const url = "/api/hostelIncharge/allHostels"
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

    // getHostelData=async(hostel_id)=>{
    //     this.setState({loading:true})
    //     let url
    //     if(Cookies.get("isadmin")==="3"){
    //         url = `/api/hostelIncharge/hostel/${hostel_id}`
    //     }
    //     else if(Cookies.get("isadmin")==="1"){
    //         url = `/api/warden/hostel/${hostel_id}`
    //     }
    //     const options={
    //         method:"GET",
    //         headers:{
    //             "Authorization":Cookies.get("token")
    //         }
    //     }
    //     const response = await fetch(url,options)
    //     const data = await response.json()
    //     console.log(data)
    //    this.setState({hostelData:this.state.hostelData.push(data),loading:false})
    // }

    componentDidMount=()=>{
        this.getAllHostels()
    }
    
    render() {
        const {allHostels,loading} = this.state
        return (
            <div>
                <NavbarComponent />
               <div className="incharge-container p-5">
                <div className="container">
                    <div className="row">
                        {loading&&(
                                <div className="mt-4 alignText">
                                    <div className="spinner-border" role="status">
                                    </div>
                                </div>)
                        }
                        {allHostels.map((hostel)=>(
                            <Link key={hostel._id} className="card col-12 nav-link col-md-6 text-center p-4 shadow cardMarginHome" to={`/hostel/${hostel._id}`}>
                                <div>
                                    <h1 className="cardHeading">{hostel.name}</h1>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default InchargeHome
