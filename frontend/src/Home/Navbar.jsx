import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../conf/APiconfi";

export const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const ownername = localStorage.getItem("ownername");

  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Sign-up dropdown

  const handleLogout = async () => {
    const notify = toast.loading("Logging out...");
    await axios.post(`${API_URL}/auth/users/logout`);
    setTimeout(() => {
      localStorage.clear();
      toast.dismiss(notify);
      toast.success("Logged out successfully!");
      navigate("/");
    }, 2000);
  };


  //setprofilepic
  const [profilephoto,setProfilephoto]=useState({})
  useEffect(()=>{
    fetchphoto()
  },[])
  const userId=localStorage.getItem("userid")
  const fetchphoto=async()=>{
    const res=await axios.get(`${API_URL}/users/travelers/${userId}`)
    setProfilephoto(res.data.data)
  
  }

 

  return (
    <nav className="bg-slate-700 text-white relative">
      
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Toaster position="top-right" />

        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-3">
          <img
            className="w-10 h-10 rounded-full"
            src="https://res.cloudinary.com/duj6ublev/image/upload/v1739270875/Screenshot_2025-02-11_160957_w6ym6q.png"

            alt="Voyago Logo"
          />
          <span className="text-1xl font-bold">Voyago</span>
        </NavLink>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-[15px]">
          <li>
            <NavLink to="/" className="hover:text-gray-300">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/allpackages" className="hover:text-gray-300">
              Packages
            </NavLink>
          </li>
          <li>
            <NavLink to="/aboutus" className="hover:text-gray-300">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contactus" className="hover:text-gray-300">
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Authentication Section */}
        <div className="relative hidden md:flex items-center space-x-4">
          {username||ownername ? (
            // Logged-in state
            <div className="relative">
              <button
                className="p-1 rounded-full hover:bg-red-600 transition-all duration-300"
                onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={profilephoto?profilephoto.profilepic:null}
                  alt="user profile"
                  width="40px"
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg border border-gray-200 z-50">
                  <NavLink
                    to="/Userprofile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Settings
                  </NavLink>
                  <NavLink
                    to="/bookings"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Bookings
                  </NavLink>
                  <button
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            
            <>
              {/* Sign Up Section */}
              <div className="relative">
                <button
                  className="flex items-center text-[12px] bg-red-500 px-6 py-2 rounded-lg text-white font-semibold hover:bg-blue-600 transition-all duration-300"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Sign Up <ChevronDown className="ml-2 w-5 h-5" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg border border-gray-200 z-50">
                    <NavLink
                      to="/signup-traveler"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Sign Up as Traveler
                    </NavLink>
                    <NavLink
                      to="/packager-info"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Be a Packager
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Separate Login Button */}
              <NavLink
                to="/login"
                className="bg-red-500 px-6 py-[10px] text-[12px] rounded-lg text-white font-semibold hover:bg-blue-700 transition-all duration-300"
              >
                Log in
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-slate-800 text-white space-y-4 p-4">
          <li>
            <NavLink to="/" className="block hover:text-gray-300">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/allpackages" className="block hover:text-gray-300">
              Packages
            </NavLink>
          </li>
          <li>
            <NavLink to="/aboutus" className="block hover:text-gray-300">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contactus" className="block hover:text-gray-300">
              Contact
            </NavLink>
          </li>
          <li>
            {username ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};
