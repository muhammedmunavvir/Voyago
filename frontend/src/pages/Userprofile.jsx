import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "janedoe@example.com",
    phone: "987-654-3210",
    profilePic: "https://via.placeholder.com/100",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-900 text-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">User Profile</h2>
      <div className="flex flex-col items-center">
        {/* Navigate to upload page when profile image is clicked */}
        <div onClick={() => navigate("/uploadprofilephoto")} className="cursor-pointer">
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-600"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block font-semibold text-gray-300">Full Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          disabled={!editMode}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-4">
        <label className="block font-semibold text-gray-300">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={user.email}
          disabled={!editMode}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-4">
        <label className="block font-semibold text-gray-300">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={user.phone}
          disabled={!editMode}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setEditMode((prev) => !prev)}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
        {editMode && (
          <button className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition">
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};
