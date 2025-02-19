import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../conf/APiconfi";
import toast from "react-hot-toast";
export const SignUpfortravelers = () => {
  const navigate = useNavigate();
  const [errorMessage,setErrorMessage]=useState()
  const [user, setUser] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/api/v1/auth/traveler/signup`, user);

      setUser({
        username: "",
        email: "",
        phonenumber: "",
        password: "",
        confirmPassword: "",
      });
     toast.success("sign up successfull")
      navigate("/login");
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
    
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute top-6 right-10">
        <img
          src="https://res.cloudinary.com/duj6ublev/image/upload/v1739270875/Screenshot_2025-02-11_160957_w6ym6q.png" // Replace with your actual logo path
          alt="Voyago Logo"
          className="w-32 h-auto md:w-40 lg:w-48"
        />
      </div>

      {/* Form Container */}
      <div className="relative w-full max-w-sm p-6 bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-white">
          Sign Up as a Traveler
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full px-4 py-2 text-white bg-transparent border rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-300"
              placeholder="User Name"
              required
            />
          </div>

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
              type="text"
              name="phonenumber"
              value={user.phonenumber}
              onChange={handleChange}
              className="w-full px-4 py-2 text-white bg-transparent border rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-300"
              placeholder="Phone Number"
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

          <div>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 text-white bg-transparent border rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-300"
              placeholder="Confirm Password"
              required
            />
          </div>
          {errorMessage ? (
  <p className="text-red-500 text-sm text-center">{errorMessage}</p>
) : null}
          <button
            type="submit"
            className="w-full py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-white">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-300 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};
