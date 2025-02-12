import { SignUpfortravelers } from "./components/auth/travelersSignup"
import { Homepage } from "./Home/Homepage"
import { Routes,Route } from "react-router-dom"
import { Navbar } from "./Home/Navbar"
import { Login } from "./components/auth/Login"
import { Allpackages } from "./pages/Allpackages"
import { Packagedetails } from "./pages/Packagedetails"

const App = () => {
  return (
    <div>
  <Navbar/>  
  
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/signup-traveler" element={<SignUpfortravelers/>}/>
    <Route path="/login"element={<Login/>}/>
    <Route path="/allpackages"element={<Allpackages/>}/>
    <Route path="/packagedetailpage/:id"element={<Packagedetails/>}/>
  </Routes>
  
    </div>
  
  )
}

export default App 