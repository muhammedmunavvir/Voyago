import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../conf/APiconfi";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://voyago-e49eujdtq-muhammed-munavvirs-projects.vercel.app";

export const Login = () => {
  const nav = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await axios.post(`${API_URL}/auth/traveler/login`, user, {
        withCredentials: true,
      });

      console.log(res);

      var userdetails = res.data.data; // Use a different variable name

      localStorage.setItem("userid", userdetails._id);

      if (userdetails.role === "traveler") {
        localStorage.setItem("username", userdetails.username);
      } else {
        localStorage.setItem("ownername", userdetails.ownerName);
      }

      localStorage.setItem("userrole", userdetails.role);

      setUser({ email: "", password: "" });

      toast.success("Login successful");

      if (
        userdetails.role === "packager" &&
        userdetails.onceLogin === "logined"
      ) {
        nav("/packager/packagerdashboard");
      } else if (
        userdetails.role === "packager" &&
        userdetails.onceLogin == "notLogined"
      ) {
        nav("/packager/packagerset-up");
      } else {
        nav("/");
      } 
    } catch (error) {
      console.log(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
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
      <div className="absolute top[999px] right-[100px] opacity-45 ">
        <img
          src="https://res.cloudinary.com/duj6ublev/image/upload/v1739270875/Screenshot_2025-02-11_160957_w6ym6q.png"
          alt="Voyago Logo"
          className="w-85em h-80"
        />
      </div>

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
              placeholder="Password"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

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

        <p className="mt-4 text-center text-white">
          Don t have an account?{" "}
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
