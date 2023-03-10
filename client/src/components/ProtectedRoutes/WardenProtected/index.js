import {Redirect,Route} from "react-router-dom"
import Cookies from "js-cookie"

const WardenProtected =(props)=>{
    const token = Cookies.get("token")
    const isadmin = Cookies.get("isadmin")
    if(token===undefined){
        return <Redirect to="/login" /> 
      }
      if(isadmin==="2"){
          return <Redirect to="/hod" />
      }
      if(isadmin==="3"){
          return <Redirect to="/incharge"/>
      }
      if(isadmin==="0"){
          return <Redirect to="/" />
      }
    
    return <Route {...props} />
}

export default WardenProtected