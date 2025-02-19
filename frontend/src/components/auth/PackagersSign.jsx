import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../conf/APiconfi";
import toast from "react-hot-toast";

export const SignUpForPackagers = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [packager, setPackager] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    licenseNumber: "",
    address: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackager({ ...packager, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/v1/auth/packager/signup`, packager);
      setPackager({
        businessName: "",
        ownerName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        licenseNumber: "",
        address: "",
        website: "",
      });
      toast.success("sign up successfull")
      navigate("/login");
    } catch (error) {
      console.log(error, "from backend");
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
      className="relative flex items-center justify-center min-h-screen px-10 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute top-6 right-10">
        <img
          src="https://res.cloudinary.com/duj6ublev/image/upload/v1739270875/Screenshot_2025-02-11_160957_w6ym6q.png"
          alt="Voyago Logo"
          className="w-32 h-auto md:w-40 lg:w-48"
        />
      </div>

      <div className="relative w-full max-w-2xl p-6 bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-white">
          Sign Up as a Packager
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-2 gap-4">
          <input
            type="text"
            name="businessName"
            value={packager.businessName}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 shadow-sm"
            placeholder="Business Name"
            required
          />
          <input
            type="text"
            name="ownerName"
            value={packager.ownerName}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 shadow-sm"
            placeholder="Owner's Name"
            required
          />
          <input
            type="email"
            name="email"
            value={packager.email}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 shadow-sm"
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phoneNumber"
            value={packager.phoneNumber}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 shadow-sm"
            placeholder="Phone Number"
            required
          />
          <input
            type="password"
            name="password"
            value={packager.password}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 shadow-sm"
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={packager.confirmPassword}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 shadow-sm"
            placeholder="Confirm Password"
            required
          />
          <input
            type="text"
            name="licenseNumber"
            value={packager.licenseNumber}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 shadow-sm"
            placeholder="Business License Number"
            required
          />
          <input
            type="text"
            name="address"
            value={packager.address}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 shadow-sm"
            placeholder="Business Address"
            required
          />
          <input
            type="text"
            name="website"
            value={packager.website}
            onChange={handleChange}
            className="col-span-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 shadow-sm"
            placeholder="Website (Optional)"
          />
         

          <button
            type="submit"
            className="col-span-2 w-full py-2 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all"
          >
            Sign Up
          </button>
        </form>
        {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

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
