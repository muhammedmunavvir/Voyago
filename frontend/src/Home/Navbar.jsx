import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react"; 
import logo from "../assets/Screenshot 2025-02-11 160957.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
export const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 
  const handleLogout = () => {
    const notify = toast.loading("Logging out..."); 
  
    setTimeout(() => {
      localStorage.clear();
      toast.dismiss(notify); // Remove loading toast
      toast.success("Logged out successfully!"); 
      navigate("/");
    }, 2000); 
  };

  return (
    <nav className="bg-slate-700 text-white relative">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
      <Toaster position="top-right" />
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-3">
          <img className="w-10 h-10 rounded-full" src={logo} alt="Voyago Logo" />
          <span className="text-2xl font-bold">Voyago</span>
        </NavLink>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <li><NavLink to="/" className="hover:text-gray-300">Home</NavLink></li>
          <li><NavLink to="/allpackages" className="hover:text-gray-300">Packages</NavLink></li>
          <li><NavLink to="/about" className="hover:text-gray-300">About</NavLink></li>
          <li><NavLink to="/contact" className="hover:text-gray-300">Contact</NavLink></li>
        </ul>

        {/* Authentication Section */}
        <div className="relative hidden md:block" ref={dropdownRef}>
          {username ? (
            // Logged-in state
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold">Welcome, {username}</span>
              <button 
                className="bg-red-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-600 transition-all duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            // Not logged in - Show Sign Up Dropdown
            <button 
              className="flex items-center bg-red-500 px-6 py-2 rounded-lg text-white font-semibold hover:bg-blue-600 transition-all duration-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Sign Up <ChevronDown className="ml-2 w-5 h-5" />
            </button>
          )}

          {/* Sign Up Dropdown */}
          {isDropdownOpen && !username && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-lg z-50">
              <NavLink to="/signup-traveler" className="block px-4 py-2 hover:bg-gray-200">Be a Traveler</NavLink>
              <NavLink to="/packager-info" className="block px-4 py-2 hover:bg-gray-200">Be a Packager</NavLink>
            </div>
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
          <li><NavLink to="/" className="block hover:text-gray-300">Home</NavLink></li>
          <li><NavLink to="/allpackages" className="block hover:text-gray-300">Packages</NavLink></li>
          <li><NavLink to="/about" className="block hover:text-gray-300">About</NavLink></li>
          <li><NavLink to="/contact" className="block hover:text-gray-300">Contact</NavLink></li>
          <li>
            {username ? (
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="block px-4 py-2 hover:bg-gray-700">Login</NavLink>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};
