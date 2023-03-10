import React, { Component } from 'react'
import NavbarComponent from "../Navbar/Navbar"
import Cookies from "js-cookie"
import "./index.css"


class AddHostel extends Component {

    state={
        name:""
    }

    onChangeHandler=(e)=>{
        this.setState({name:e.target.value})
    }

    addHostel=async()=>{
        const {name}  = this.state
        const hostelData = {name}
        const url = "/api/hostelIncharge/addHostel"
        const options = {
            method:"POST",
            body:JSON.stringify(hostelData),
            headers:{
                "Authorization":Cookies.get("token"),
                "Content-Type":"application/json"
            }
        }
       await fetch(url,options)
         //const data = await response.json()
        // console.log(data)
        const {history} = this.props
        history.replace("/incharge")
    }

    render() {
        return (
            <div>
                <NavbarComponent />
                <div className="img">
                <div className="add-hostel-conatiner">
                    <div className="text-center">
                        <h3 className="add-hostel-heading text-center mb-4">Add Hostel</h3>
                        <input type="text" className="form-control mb-3 w-100" placeholder="Hostel Name" onChange={this.onChangeHandler} />
                        <button className="custom-btn" onClick={this.addHostel}>Add</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default AddHostel
