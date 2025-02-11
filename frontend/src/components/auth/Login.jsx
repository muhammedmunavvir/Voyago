import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const nav=useNavigate()

  const [user, setUser] = useState({
    email: "",
    password:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:9297/api/v1/auth/traveler/login",
        user
      );
      
      setUser({
        email: "",
        password: "",
      });
      nav("/")
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <div
      className="relative flex items-center min-h-screen px-10 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/7276634/pexels-photo-7276634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Company Logo on Right */}
      <div className="absolute top-6 right-10">
        <img
          src="/your-logo.png" // Replace with actual logo path
          alt="Voyago Logo"
          className="w-32 h-auto md:w-40 lg:w-48"
        />
      </div>

      {/* Form Container */}
      <div className="relative w-full max-w-sm p-6 bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-2 text-white bg-transparent border rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-300"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full px-4 py-2 text-white bg-transparent border rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-300"
              placeholder="password"
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-blue-300 text-sm hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-4 text-center text-white">
          Don't have an account?{" "}
          <NavLink
            to="/signup-traveler"
            className="text-blue-300 hover:underline"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};
