import {  useState } from "react";
import axios from "axios";
import { API_URL } from "../../conf/APiconfi";
import { useQuery } from "@tanstack/react-query";
import { ThreeDot } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";

export const ManagePackages = () => {
    const navigate=useNavigate()

  const [search, setSearch] = useState("");

 
  const fetchPackages = async () => {
    try {
      const res=await axios.get(`${API_URL}/packages/allpackages`)
      return res.data.data
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const {data:packages=[],isError,isLoading}=useQuery({
     queryKey:["allpackages"],
     queryFn:fetchPackages,

  })

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

  const handleEdit = async (id) => {

      try {
        await axios.delete(`${API_URL}/packager/editpackage/${id}`);
       
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await axios.delete(`${API_URL}/packager/deletepackage/${id}`);
        
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };
  const handlePackageClick=(id)=>{
    navigate(`/packager/packagedetailspageofprovider/${id}`)
  }



  return (
    <div className="p-6 bg-red-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Manage Packages</h2>
      <input
        type="text"
        placeholder="Search packages..."
        className="w-full p-2 mb-4 border rounded-md"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
             <button><th className="p-10">Package</th></button> 
              <th className="p-2">Destination</th>
              <th className="p-2">Price</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            
            {packages
            //   .filter((pkg) => pkg.title.toLowerCase().includes(search))
              .map((pkg) => (
                <tr key={pkg._id} className="border-t cursor-pointer " onClick={() => handlePackageClick(pkg._id)}>
                  <td className="p-2">{pkg.title}</td>
                  <td className="p-2">{pkg.destination}</td>
                  <td className="p-2">₹{pkg.price}</td>
                  <td className="p-2">{pkg.duration}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        pkg.status === "available" ? "bg-green-200" : "bg-red-200"
                      }`}
                    >
                      {pkg.status}
                    </span>
                  </td>
                  <td className="p-2 flex space-x-2">
                  <button
                      onClick={() => handleEdit(pkg._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pkg._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
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
