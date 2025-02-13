import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react"; // Icons for mobile & dropdown
import logo from "../assets/Screenshot 2025-02-11 160957.png";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controls dropdown
  const dropdownRef = useRef(null); // To detect clicks outside

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

  return (
    <nav className="bg-slate-700 text-white relative">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left Section: Logo + "Voyago" */}
        <div className="flex items-center space-x-3">
          <img className="w-10 h-10 rounded-full" src={logo} alt="Voyago Logo" />
          <span className="text-2xl font-bold">Voyago</span>
        </div>

        {/* Center: Navigation Links (Hidden on Mobile) */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <li><NavLink to="/" className="hover:text-gray-300">Home</NavLink></li>
          <li><NavLink to="/allpackages" className="block hover:text-gray-300">Packages</NavLink></li>
          <li><a href="/about" className="hover:text-gray-300">About</a></li>
          <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
        </ul>

        {/* Sign Up Button with Clickable Dropdown */}
        <div className="relative hidden md:block" ref={dropdownRef}>
          <button 
            className="flex items-center bg-red-500 px-6 py-2 rounded-lg text-white font-semibold hover:bg-blue-600 transition-all duration-300"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Click to toggle
          >
            Sign Up <ChevronDown className="ml-2 w-5 h-5" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
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

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <ul className="md:hidden bg-slate-800 text-white space-y-4 p-4">
          <li><a href="/" className="block hover:text-gray-300">Home</a></li>
          <li><NavLink to="/allpackages" className="block hover:text-gray-300">Packages</NavLink></li>
          <li><a href="/about" className="block hover:text-gray-300">About</a></li>
          <li><a href="/contact" className="block hover:text-gray-300">Contact</a></li>
        </ul>
      )}
    </nav>
  );
};
