import React, { Component } from 'react'
import NavbarComponent from "../Navbar/Navbar"
import Cookies from "js-cookie"


class EditStudent extends Component {


    state={
        allHostels:[],
            firstname : "",
            lastname  : "",
            department: "",
            year : "",
            gender : "",
            email: "",
            regno : "",
            mobile : "",
            parentmobile : "",
            section : "",
            address : "",
            bloodgroup : "",
            parent : "",
            outingtype : "",
            hostelname : "",
            password:"",
            error:false,
            errorMessage:"" ,
            loading:false,
            success:true,
            successMessage:""  
    }

    onChangeFirstname=(e)=>{
        this.setState({firstname:e.target.value})
    }
    onChangeLastname=(e)=>{
        this.setState({lastname:e.target.value})
    }
    onChangeDepartment=(e)=>{
        this.setState({department:e.target.value})
    }
    onChangeYear=(e)=>{
        this.setState({year:e.target.value})
    }
    onChangeGender=(e)=>{
        this.setState({gender:e.target.value})
    }
    onChangeEmail=(e)=>{
        this.setState({email:e.target.value})
    }
    onChangeRegno=(e)=>{
        this.setState({regno:e.target.value})
    }
    onChangeMobile=(e)=>{
        this.setState({mobile:e.target.value})
    }
    onChangeParentmobile=(e)=>{
        this.setState({parentmobile:e.target.value})
    }
    onChangeSection=(e)=>{
        this.setState({section:e.target.value})
    }
    onChangeAddress=(e)=>{
        this.setState({address:e.target.value})
    }
    onChangeBloodgroup=(e)=>{
        this.setState({bloodgroup:e.target.value})
    }
    onChangeParent=(e)=>{
        this.setState({parent:e.target.value})
    }
    onChangePassword=(e)=>{
        this.setState({password:e.target.value})
    }
    onChangeOutingtype=(e)=>{
        this.setState({outingtype:e.target.value})
    }
    onChangeHostelname=(e)=>{
        this.setState({hostelname:e.target.value})
    }

    onSubmitHandler= async(e)=>{
        e.preventDefault()
        this.setState({loading:true,error:false,errorMessage:""})
        const {firstname,lastname,department,gender,section,year,outingtype,email,mobile,regno,parent,parentmobile,address,bloodgroup,hostelname} = this.state
        const user={firstname,lastname,department,gender,section,year,outingtype,email,mobile,regno,parent,parentmobile,address,bloodgroup,hostelname}
        console.log(user)
        if(department==="Select"||gender==="Select"||section==="Select"||year==="Select"||outingtype==="Select"||bloodgroup==="Select"){
            this.setState({loading:false,error:true,errorMessage:"All fields are Required"})
            return
        }
        const {match} = this.props
        const {params} = match
        const {id} = params
        const url = `/api/hostelIncharge/update/${id}`
        const options = {
            method:"PUT",
            body:JSON.stringify(user),
            headers:{
                "Content-Type":"application/json",
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        //console.log(data)
        if(response.ok===true){
            const {history} = this.props
            history.replace("/incharge")
        }else{
            this.setState({error:true,errorMessage:data.msg})
        }
        this.setState({loading:false})

    }

    getAllHostelNames=async()=>{
        const url = "/api/hostelIncharge/allHostels"
        const options={
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
       // console.log(data)
       this.setState({allHostels:data})
    }

    onDeleteHandler=async()=>{
        const {match} = this.props
        const {params} = match
        const {id} = params
        const url = `/api/hostelIncharge/delete/${id}`
        const options={
            method:"DELETE",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        //console.log(data)
        if(response.ok===true){
            const {history} = this.props
            history.replace("/incharge")
        }else{
            this.setState({error:true,errorMessage:data.msg})
        }
    }
    

    submitUpdatePassword=async()=>{
        const {match} = this.props
        const {params} = match
        const {id} = params
        const url = `/api/hostelIncharge/change_student_password/${id}`
        const userDetails = {newPassword:this.state.password}
        const options = {
            method:"PUT",
            body:JSON.stringify(userDetails),
            headers:{
                "Content-Type":"application/json",
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        //console.log(data)
        if(response.ok===true){
            const {history} = this.props
            history.replace("/incharge")
        }else{
            this.setState({error:true,errorMessage:data.msg})
        }
    }

    proxyAvoid=async()=>{
        this.getAllHostelNames()
        this.setState({loading:true})
        const {match} = this.props
        const {params} = match
        const {id} = params
        //console.log(id)
        const url = `/api/hostelIncharge/user/${id}`
        const options={
            method:"GET",
            headers:{
                "Authorization":Cookies.get("token")
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        //console.log(data)
        const {firstname,lastname,gender,bloodgroup,email,regno,mobile,parentmobile,parent,department,section,year,hostelname,outingtype,address} = data
        this.setState({firstname,lastname,gender,bloodgroup,email,regno,mobile,parentmobile,parent,department,section,year,hostelname,outingtype,address})
        this.setState({loading:false})
    }

    componentDidMount=async()=>{
        this.proxyAvoid()
    }

    render() {
        const {allHostels,loading,error,errorMessage} = this.state
        const {firstname,lastname,gender,mobile,parentmobile,parent,bloodgroup,department,section,year,address,outingtype,hostelname,email,regno} = this.state
        return (
            <div>
                <NavbarComponent />
                <div className="color">
                <div className="container p-5">
                    <div className="row">
                        <h1 className="col-12 text-center mt-2 mb-2">Edit Student</h1>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="firstname">Firstname</label>
                                <input onChange={this.onChangeFirstname} type="text" value={firstname} className="form-control" id="firstname" name="firstname" />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="lastname">Lastname</label>
                                <input onChange={this.onChangeLastname}  type="text" value={lastname} className="form-control" id="lastname" name="lastname" />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="email">Email</label>
                                <input onChange={this.onChangeEmail}  type="email" value={email} className="form-control" id="email" name="email" />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="regno">Reg. No</label>
                                <input onChange={this.onChangeRegno}  type="text" value={regno} className="form-control" id="regno" name="regno" />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="studentmobile">Student Mobile</label>
                                <input onChange={this.onChangeMobile} type="number" value={mobile} className="form-control" id="studentmobile" name="mobile" />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="parentname">Parent/Guardian Name</label>
                                <input onChange={this.onChangeParent} type="text" value={parent} className="form-control" id="parentname" name="parent"/>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="parentmobile">Parent/Guardian Mobile</label>
                                <input onChange={this.onChangeParentmobile} type="number" value={parentmobile} className="form-control" id="parentmobile" name="parentmobile"/>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="gender">Gender</label>
                                <select className="form-control" id="gender" name="gender" value={gender} onChange={this.onChangeGender} >
                                    <option  defaultValue>Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="department">Department</label>
                                <select className="form-control" id="department" name="department" value={department} onChange={this.onChangeDepartment} >
                                    <option  defaultValue>Select</option>
                                    <option value="CSE">CSE</option>
                                    <option value="IT">IT</option>
                                    <option value="ECE">ECE</option>
                                    <option value="EEE">EEE</option>
                                    <option value="MECHANICAL">Mechanical</option>
                                    <option value="CIVIL">Civil</option>
                                    <option value="BS">Basic Science</option>
                                </select>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="year">Year</label>
                                <select className="form-control" id="year" name="year" value={year} onChange={this.onChangeYear} >
                                    <option  defaultValue>Select</option>
                                    <option value="1">I</option>
                                    <option value="2">II</option>
                                    <option value="3">III</option>
                                    <option value="4">IV</option>
                                </select>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="section">Section</label>
                                <select className="form-control" id="section" name="section" value={section} onChange={this.onChangeSection} >
                                    <option  defaultValue>Select</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="hostelname">Hostel Name</label>
                                <select className="form-control" id="hostelname" name="hostelname" value={hostelname} onChange={this.onChangeHostelname} >
                                    <option  defaultValue>Select</option>
                                    {allHostels.map((item)=>(
                                        <option value={item.name} key={item._id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="outingtype">Outing Type</label>
                                <select className="form-control" id="outingtype" name="outingtype" value={outingtype} onChange={this.onChangeOutingtype} >
                                    <option  defaultValue>Select</option>
                                    <option value="self">Self</option>
                                    <option value="parent">Parent</option>
                                </select>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="bloodgroup">Blood Group</label>
                                <select className="form-control" id="bloodgroup" name="bloodgroup" value={bloodgroup} onChange={this.onChangeBloodgroup} >
                                    <option  defaultValue>Select</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="-">Other</option>
                                </select>
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="address">Address</label>
                                <textarea className="form-control" id="address" name="address" rows="5" value={address} onChange={this.onChangeAddress} ></textarea>
                            </div>
                           <div className="text-center">
                           {error&&(<p className="text-danger text-center mt-3 mb-3">*{errorMessage}</p>)}
                            {loading&&(
                            <div className="mt-4 text-center mb-4">
                                <div className="spinner-border" role="status">
                                </div>
                            </div>)
                            }
                           </div>
                           <div className="form-group col-12">
                                <button className="btn btn-success mb-4 btn-block" onClick={this.onSubmitHandler} >Update Student</button>
                                <div>
                                    <input type="text" className="form-control mb-4" placeholder="Update Student Password Here" onChange={this.onChangePassword}/>
                                    {/* {success&&(<p>{successMessage}df</p>)} */}
                                    <button className="btn btn-info mb-4 btn-block" onClick={this.submitUpdatePassword} >Update Password</button>
                                </div>
                                <button className="btn btn-danger btn-block" onClick={this.onDeleteHandler}>Delete Student</button>
                            </div>  
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default EditStudent
