import {Redirect,Route} from "react-router-dom"
import Cookies from "js-cookie"

const HodProtected =(props)=>{
    const token = Cookies.get("token")
    const isadmin = Cookies.get("isadmin")
    if(token===undefined){
        return <Redirect to="/login" /> 
      }
      if(isadmin==="3"){
          return <Redirect to="/incharge" />
      }
      if(isadmin==="1"){
          return <Redirect to="/warden"/>
      }
      if(isadmin==="0"){
          return <Redirect to="/" />
      }
    
    return <Route {...props} />
}

export default HodProtected