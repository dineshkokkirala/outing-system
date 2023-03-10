import React, { Component } from 'react'
import NavbarComponent from "../Navbar/Navbar"
import Cookies from "js-cookie"
import UserCard from "../UserCard"

class WardenOutings extends Component {

    state={
        allWardenOutings:[],
        loading:false
    }

    getAllWardenOutings=async()=>{
        this.setState({loading:true})
        const url = `/api/warden/allOutings`
        const options={
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        this.setState({allWardenOutings:data,loading:false})
    }

    componentDidMount=()=>{
        this.getAllWardenOutings()
    }

    render() {

        const {allWardenOutings,loading} = this.state
        return (
            <div>
                <NavbarComponent />
                <div className="p-5" style={{backgroundColor:"#d7c099",minHeight:"100vh"}}>
                    {loading?(
                        <div className="spinner-border p-3 m-3 mb-3" role="status">
                        </div>
                    ):(
                        allWardenOutings.length>0?(
                            allWardenOutings.map((user)=>(
                                <UserCard key={user._id} userId={user.userId} outing={user} />
                            ))
                        ):(
                            <h2>No Outings Found</h2>
                        )
                    )}
                </div>
                    
            </div>
        )
    }
}

export default WardenOutings
