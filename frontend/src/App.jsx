import { SignUpfortravelers } from "./components/auth/travelersSignup"
import { Homepage } from "./Home/Homepage"
import { Routes,Route } from "react-router-dom"
import { Navbar } from "./Home/Navbar"
import { Login } from "./components/auth/Login"

const App = () => {
  return (
    <div>
  <Navbar/>  
  
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/signup-traveler" element={<SignUpfortravelers/>}/>
    <Route path="/login"element={<Login/>}/>
  </Routes>
  
    </div>
  
  )
}

export default App 