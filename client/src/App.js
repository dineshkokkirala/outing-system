import './App.css';
import Home from "./components/Home"
import {BrowserRouter,Route,Switch} from "react-router-dom"
import StudentHome from "./components/StudentHome"
import InchargeHome from "./components/InchargeHome"
import HodHome from "./components/HodHome"
import WardenHome from "./components/WardenHome"
import Hostel from "./components/Hostel"
import AddStudent from "./components/AddStudent"
import AddHostel from "./components/AddHostel"
import ApplyOuting from "./components/ApplyOuting"
// import Outings from "./components/Outings"
import WardenOutings from "./components/WardenOutings"
import InchargeOutings from "./components/InchargeOutings"
import EachInchargeOuting from "./components/EachInchargeOuting"
import EachWardenOuting from "./components/EachWardenOuting"
import HodOutings from "./components/HodOutings"
import ChangePassword from "./components/ChangePassword"
import EditStudent from "./components/EditStudent"
import EachHodOuting from "./components/EachHodOuting"
import StudentOutings from "./components/StudentOutings"
import InchargeProtected from "./components/ProtectedRoutes/InchargeProtected"
import HodProtected from "./components/ProtectedRoutes/HodProtected"
import WardenProtected from "./components/ProtectedRoutes/WardenProtected"
import StudentProtected from "./components/ProtectedRoutes/StudentProtected"
import LoginProtected from "./components/ProtectedRoutes/LoginProtected"


function App() {
  

  return (
    <BrowserRouter>
      
      <Switch>
        <Route exact path="/login" component={Home} />
        <LoginProtected exact path="/change_password" component={ChangePassword} />
        <StudentProtected exact path="/" component={StudentHome} />
        <StudentProtected exact path="/apply/outing" component={ApplyOuting} />
        <StudentProtected exact path="/my_outings" component={StudentOutings} />
        <InchargeProtected exact path="/incharge" component={InchargeHome} />
        <InchargeProtected exact path="/incharge/outings" component={InchargeOutings} />
        <InchargeProtected exact path="/hostel/:id" component={Hostel} />
        <InchargeProtected exact path="/add/student" component={AddStudent}/>
        <InchargeProtected exact path="/add/hostel" component={AddHostel}/>
        <InchargeProtected exact path="/edit/student/:id" component={EditStudent}/>
        <InchargeProtected exact path="/incharge/outing/:id/:user_id" component={EachInchargeOuting}/>
        <HodProtected exact path="/hod" component={HodHome} />
        <HodProtected exact path="/hod/outings" component={HodOutings} />
        <HodProtected exact path="/hod/outing/:id/:user_id" component={EachHodOuting} />
        <WardenProtected exact path="/warden" component={WardenHome} />
        <WardenProtected exact path="/warden/outings" component={WardenOutings} />
        <WardenProtected exact path="/warden/outing/:id/:user_id" component={EachWardenOuting} />
        <WardenProtected exact path="/warden/hostel/:id" component={Hostel} />
        <HodProtected exact path="/warden/outings" component={WardenOutings} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
