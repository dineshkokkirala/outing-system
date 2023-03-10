import React, { Component } from 'react'
import NavbarComponent from "../Navbar/Navbar"
import Cookies from "js-cookie"
import UserCard from "../UserCard"
import "./index.css"

class HodOutings extends Component {

    state={
        allHodOutings:[]
    }

    getAllHodOutings=async()=>{
        const url = `/api/hod/allOutings`
        const options={
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
       // console.log(data)
        this.setState({allHodOutings:data})
    }

    componentDidMount=()=>{
        this.getAllHodOutings()
    }

    render() {

        const {allHodOutings} = this.state
        return (
            <div className="hod-container">
            <div>
                <NavbarComponent />
                
                {allHodOutings.length>0 ?(allHodOutings.map((user)=>(
                    <UserCard key={user._id} userId={user.userId} outing={user} />
                ))):(
                    <h1 class="text-center">No Outings</h1>
                )}
                </div>
            </div>
        )
    }
}

export default HodOutings
