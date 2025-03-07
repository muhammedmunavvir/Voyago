import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../conf/APiconfi";
import { useQuery } from "@tanstack/react-query";
import { ThreeDot } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";

export const ManagePackages = () => {
  window.scroll(0,0)
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const fetchPackages = async () => {
    try {
      const res = await axios.get(`${API_URL}/packages/allpackages`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const { data: packages = [], isError, isLoading } = useQuery({
    queryKey: ["allpackages"],
    queryFn: fetchPackages,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="black" size="medium" text="" textColor="black" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl font-semibold">
          Error loading packages. Please try again later.
        </p>
      </div>
    );
  }

  const handleEdit = async (id,event) => {
    event.stopPropagation(); // Prevents the row click event
    navigate(`/packager/editpackage/${id}`)
  };

  const handleDelete = async (id,event) => {
    event.stopPropagation()
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await axios.delete(`${API_URL}/packager/deletepackage/${id}`);
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };

  const handlePackageClick = (id) => {
    navigate(`/packager/packagedetailspageofprovider/${id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Packages</h2>
      <input
        type="text"
        placeholder="Search packages..."
        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-[#642191] text-white">
            <tr>
              <th className="p-4 text-left">Package</th>
              <th className="p-4 text-left">Destination</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Duration</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr
                key={pkg._id}
                className="border-t hover:bg-gray-100 transition cursor-pointer"
                onClick={() => handlePackageClick(pkg._id)}
              >
                <td className="p-4 font-medium">{pkg.title}</td>
                <td className="p-4">{pkg.destination}</td>
                <td className="p-4 font-semibold text-green-600">₹{pkg.price}</td>
                <td className="p-4">{pkg.duration}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      pkg.status === "available"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {pkg.status}
                  </span>
                </td>
                <td className="p-4 flex space-x-2">
                  <button
                    onClick={(e) => handleEdit(pkg._id,e)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(pkg._id,e)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
