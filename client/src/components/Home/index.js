import React, { Component } from 'react'
import AdminLogin from "../AdminLogin"
import StudentLogin from "../StudentLogin"
import Cookies from "js-cookie"
import {Redirect} from "react-router-dom"
import "./index.css"

class Home extends Component {
    render() {
        if(Cookies.get("isadmin")==="3"){
            return <Redirect to="/incharge" />
        }
        if(Cookies.get("isadmin")==="2"){
            return <Redirect to="/hod" />
        }
        if(Cookies.get("isadmin")==="1"){
            return <Redirect to="/warden" />
        }
        if(Cookies.get("isadmin")==="0"){
            return <Redirect to="/" />
        }
        return (
            // <div className="home-container">
            //     <div className="container">
            //         <div className="row">
            //             <div className="col-12 col-md-6 mb-3 shadow">
            //                 <AdminLogin />
            //             </div>
            //             <div className="col-12 col-md-6 mb-3 shadow">
            //                 <StudentLogin />
            //             </div>
            //         </div>
            //     </div>
            // </div> 
                   
                    <div className="app-container">
                        <div className="admin-card">
                            <AdminLogin />
                        </div>
                        <div className="student-card">
                            <StudentLogin />
                        </div>
                    </div>
        )
    }
}

export default Home
