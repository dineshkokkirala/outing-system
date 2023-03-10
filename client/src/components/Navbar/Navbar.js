import React,{useState} from 'react'
import {Link,withRouter} from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"
let user

const NavbarComponent = (props) => {

  const [userDetails,setUserDetails] = useState({})


  const onClickLogout=()=>{
    Cookies.remove("token")
    Cookies.remove("isadmin")
    const {history} = props
    history.replace("/login")
  }

  const getUserDetails=async()=>{
    const url = "/api/user/my_details"
    const options = {
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
    const response = await fetch(url,options)
    const data = await response.json()
    setUserDetails(data)
    Cookies.set("studentName",userDetails.firstname)
  }


  const isadmin = Cookies.get("isadmin")
  if(isadmin==="3"){
    user="Incharge"
  }else if(isadmin==="2"){
    user="HOD"
  }else if(isadmin==="1"){
    user="Warden"
  }else{
    getUserDetails()
    // user="Student"
    user = Cookies.get("studentName")
  }

  const inchargeLinks=()=>{
    return(
      <div className="navbar-nav">
        <Link className="nav-link navLink text-white" to="/add/student">Add Student</Link>
        <Link className="nav-link navLink text-white" to="/add/hostel">Add Hostel</Link>
        <Link className="nav-link navLink text-white" to="/incharge/outings">Outings</Link>
      </div>
    )
  }
  const studentLinks=()=>{
    return(
      <div className="navbar-nav">
        <Link className="nav-link navLink text-white" to="/apply/outing">Apply Outing</Link>
        <Link className="nav-link navLink text-white" to="/my_outings">My Outings</Link>
      </div>
    )
  }
  const hodLinks=()=>{
    return(
      <div className="navbar-nav">
        <Link className="nav-link navLink text-white" to="/hod/outings">Outings</Link>
      </div>
    )
  }
  const wardenLinks=()=>{
    return(
      <div className="navbar-nav">
        <Link className="nav-link navLink text-white" to="/warden/outings">Outings</Link>
      </div>
    )
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-rand pt-3 pb-3">
            <div className="container-fluid">
              <Link className="navbar-brand nav-head logo-heading" to="/">V-outing</Link>
              <button className="navbar-toggler text-white togglerCustom" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon text-white"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto pl-4">
                        <Link className="nav-link navLink text-white">Hello {user!=="undefined"&&user}</Link>
                        {Cookies.get("isadmin")==="3"&&(inchargeLinks())}
                        {Cookies.get("isadmin")==="2"&&(hodLinks())}
                        {Cookies.get("isadmin")==="1"&&(wardenLinks())}
                        {Cookies.get("isadmin")==="0"&&(studentLinks())}
                        <Link to="/change_password" className="nav-link navLink text-white">
                              Change Password
                        </Link>
                        <Link className="nav-link navLink text-white" onClick={onClickLogout} >Logout <i className="fas fa-sign-out-alt"></i></Link>
                        
                    </div>
                </div>
              
            </div>
        </nav>
    </div>
  );
}

export default withRouter(NavbarComponent);