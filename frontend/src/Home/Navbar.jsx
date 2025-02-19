import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../conf/APiconfi";
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

  const handleLogout = async () => {
    const notify = toast.loading("Logging out...");
    await axios.post(`${API_URL}/auth/users/logout`);
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
          <img
            className="w-10 h-10 rounded-full"
            src='https://res.cloudinary.com/duj6ublev/image/upload/v1739270875/Screenshot_2025-02-11_160957_w6ym6q.png'
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
            <NavLink to="aboutus" className="hover:text-gray-300">
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
        <div
          className="relative hidden md:flex items-center space-x-4"
          ref={dropdownRef}
        >
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
            // Not logged in - Separate Login & Sign-Up
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
                    Sign Up as traveler
                    </NavLink>
                    <NavLink
                      to="/packager-info"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                     Be a packager
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
            <NavLink to="/about" className="block hover:text-gray-300">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="block hover:text-gray-300">
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
