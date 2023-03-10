import React, { Component } from 'react'
import NavbarComponent from "../Navbar/Navbar"
import Cookies from "js-cookie"
class Outings extends Component {


    state={
        allStudents:[]
    }

    getAllOutingStudents=async()=>{
        const url = "/api/hostelIncharge/all/outings"
        const options={
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        //console.log(data)
        this.setState({allStudents:data})
    }

    componentDidMount=()=>{
        //console.log("OUTINGS")
        this.getAllOutingStudents()
    }

    render() {
        return (
            <div>
                <NavbarComponent />
                <h1>Outings</h1>
            </div> 
        )
    }
}

export default Outings
