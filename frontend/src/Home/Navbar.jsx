import { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../conf/APiconfi";

export const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const ownername = localStorage.getItem("ownername");

  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);

  const profileDropdownRef = useRef(null);
  const signupDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const mobileProfileDropdownRef = useRef(null);

  const handleLogout = async () => {
    const notify = toast.loading("Logging out...");
    try {
      await axios.post(`${API_URL}/auth/users/logout`);
      setTimeout(() => {
        localStorage.clear();
        toast.dismiss(notify);
        toast.success("Logged out successfully!");
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.dismiss(notify);
      toast.error("Logout failed. Please try again.");
    }
  };

  // Set profile pic
  const [profilephoto, setProfilephoto] = useState({});

  useEffect(() => {
    if (userId) {
      fetchphoto();
    }
  }, []);

  const userId = localStorage.getItem("userid");
  const fetchphoto = async () => {
    try {
      const res = await axios.get(`${API_URL}/users/travelers/${userId}`);
      setProfilephoto(res.data.data);
    } catch (error) {
      console.error("Failed to fetch profile photo:", error);
    }
  };

  // Close the dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Desktop profile dropdown
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }

      // Sign up dropdown
      if (
        signupDropdownRef.current &&
        !signupDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }

      // Mobile profile dropdown
      if (
        mobileProfileDropdownRef.current &&
        !mobileProfileDropdownRef.current.contains(event.target)
      ) {
        setIsMobileProfileOpen(false);
      }

      // Close mobile menu when clicking outside
      if (
        mobileMenuRef.current &&
        mobileToggleRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !mobileToggleRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when navigating
  const handleNavigation = () => {
    setIsOpen(false);
    setIsMobileProfileOpen(false);
  };

  
 

 
const tobookings = () => {
  
  navigate(`/userbookings/${userId}`);

  setProfileDropdownOpen(false);
};

  

  return (
    <nav className="bg-slate-700 text-white relative">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Toaster position="top-right" />

        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2">
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            src="https://res.cloudinary.com/duj6ublev/image/upload/v1739270875/Screenshot_2025-02-11_160957_w6ym6q.png"
            alt="Voyago Logo"
          />
          <span className="text-lg sm:text-xl font-bold">Voyago</span>
        </NavLink>

        {/* Navigation Links - Desktop */}
        <ul className="hidden md:flex space-x-4 lg:space-x-6 text-sm lg:text-base">
          <li>
            <NavLink
              to="/"
              className="hover:text-gray-300 transition duration-200"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/allpackages"
              className="hover:text-gray-300 transition duration-200"
            >
              Packages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/aboutus"
              className="hover:text-gray-300 transition duration-200"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contactus"
              className="hover:text-gray-300 transition duration-200"
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Authentication Section - Desktop */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          {username || ownername  ? (
            // Logged-in state
            <div className="relative" ref={profileDropdownRef}>
              <button
                className="p-1 rounded-full hover:bg-red-600 transition-all duration-300 flex items-center"
                onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                aria-label="Open profile menu"
              >
                {profilephoto && profilephoto.profilepic ? (
                  <img
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
                    src={profilephoto.profilepic}
                    alt="user profile"
                  />
                ) : (
                  <User className="w-8 h-8 p-1 rounded-full bg-gray-600" />
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg border border-gray-200 z-50">
                  <NavLink
                    to="/Userprofile"
                    className="block px-4 py-2 hover:bg-gray-100 transition duration-200"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 transition duration-200"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Settings
                  </NavLink>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 transition duration-200"
                    onClick={tobookings}
                  >
                    Bookings
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition duration-200"
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
              <div className="relative" ref={signupDropdownRef}>
                <button
                  className="flex items-center text-xs sm:text-sm bg-red-500 px-3 sm:px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-600 transition-all duration-300"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Sign Up <ChevronDown className="ml-1 w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg border border-gray-200 z-50">
                    <NavLink
                      to="/signup-traveler"
                      className="block px-4 py-2 hover:bg-gray-100 transition duration-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Sign Up as Traveler
                    </NavLink>
                    <NavLink
                      to="/packager-info"
                      className="block px-4 py-2 hover:bg-gray-100 transition duration-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Be a Packager
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Login Button */}
              <NavLink
                to="/login"
                className="bg-red-500 px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg text-white font-semibold hover:bg-red-600 transition-all duration-300"
              >
                Log in
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={mobileToggleRef}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1 rounded hover:bg-slate-600 transition duration-200"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-slate-800 text-white">
          <ul className="divide-y divide-slate-700">
            <li>
              <NavLink
                to="/"
                className="block px-4 py-3 hover:bg-slate-700 transition duration-200"
                onClick={handleNavigation}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allpackages"
                className="block px-4 py-3 hover:bg-slate-700 transition duration-200"
                onClick={handleNavigation}
              >
                Packages
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/aboutus"
                className="block px-4 py-3 hover:bg-slate-700 transition duration-200"
                onClick={handleNavigation}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contactus"
                className="block px-4 py-3 hover:bg-slate-700 transition duration-200"
                onClick={handleNavigation}
              >
                Contact
              </NavLink>
            </li>

            {/* Mobile Authentication Section */}
            {username || ownername ? (
              <li ref={mobileProfileDropdownRef}>
                <button
                  className="flex items-center justify-between w-full px-4 py-3 hover:bg-slate-700 transition duration-200"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from closing the mobile menu
                    setIsMobileProfileOpen(!isMobileProfileOpen);
                  }}
                >
                  <span className="flex items-center">
                    {profilephoto && profilephoto.profilepic ? (
                      <img
                        className="w-8 h-8 rounded-full object-cover mr-3"
                        src={profilephoto.profilepic}
                        alt="Profile"
                      />
                    ) : (
                      <User className="w-6 h-6 mr-3" />
                    )}
                    <span>{username || ownername}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isMobileProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMobileProfileOpen && (
                  <div className="bg-slate-900 pl-8 pr-4">
                    <NavLink
                      to="/Userprofile"
                      className="block py-3 hover:text-gray-300 transition duration-200"
                      onClick={handleNavigation}
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/settings"
                      className="block py-3 hover:text-gray-300 transition duration-200"
                      onClick={handleNavigation}
                    >
                      Settings
                    </NavLink>
                    <NavLink
                      to={`/userbookings/${userId}`}
                      className="block py-3 hover:text-gray-300 transition duration-200"
                      onClick={handleNavigation}
                    >
                      Bookings
                    </NavLink>
                    <button
                      className="block w-full text-left py-3 text-red-400 hover:text-red-300 transition duration-200"
                      onClick={() => {
                        handleLogout();
                        handleNavigation();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="block px-4 py-3 hover:bg-slate-700 transition duration-200 text-red-400"
                    onClick={handleNavigation}
                  >
                    Log in
                  </NavLink>
                </li>
                <li ref={mobileProfileDropdownRef}>
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 hover:bg-slate-700 transition duration-200 text-red-400"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click from closing the mobile menu
                      setIsMobileProfileOpen(!isMobileProfileOpen);
                    }}
                  >
                    <span>Sign Up</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isMobileProfileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isMobileProfileOpen && (
                    <div className="bg-slate-900 pl-8 pr-4">
                      <NavLink
                        to="/signup-traveler"
                        className="block py-3 hover:text-gray-300 transition duration-200"
                        onClick={handleNavigation}
                      >
                        Sign Up as Traveler
                      </NavLink>
                      <NavLink
                        to="/packager-info"
                        className="block py-3 hover:text-gray-300 transition duration-200"
                        onClick={handleNavigation}
                      >
                        Be a Packager
                      </NavLink>
                    </div>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};
