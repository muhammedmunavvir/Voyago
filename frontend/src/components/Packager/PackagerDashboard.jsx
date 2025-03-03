
import { FaBox, FaUsers, FaEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchdshboarddata } from "../../redux/reduxslices/dashboardslice";

export const PackagerDashboard = () => {
 
  const {packages,bookings,status,error}=useSelector((state)=>state.dashboard)
  console.log("packages :",packages)
console.log("bookings  :",bookings)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchdshboarddata())
  },[])

  if(status==="loading"){
    return <h1>loading..</h1>
  }
  if(status==="faild"){
    return  <h1>Error: {error}</h1>
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Packager Dashboard</h1>
     
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Packages */}
        <div className="bg-white p-4 shadow-md rounded-lg flex items-center space-x-4">
          <FaBox className="text-3xl text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Packages</h3>
            <p className="text-xl font-bold">{packages.length}</p>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white p-4 shadow-md rounded-lg flex items-center space-x-4">
          <FaUsers className="text-3xl text-green-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Bookings</h3>
            <p className="text-xl font-bold">{bookings.length}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white p-4 shadow-md rounded-lg flex items-center space-x-4">
          <FaEnvelope className="text-3xl text-red-500" />
          <div>
            <h3 className="text-lg font-semibold">New Messages</h3>
            <p className="text-xl font-bold">5</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <NavLink
          to="/packager/managepackage"
          className="p-4 bg-blue-600 text-white rounded-lg flex items-center justify-center text-lg font-semibold hover:bg-blue-700"
        >
          Manage Packages
        </NavLink>

        <NavLink
          to="/packager/bookings"
          className="p-4 bg-green-600 text-white rounded-lg flex items-center justify-center text-lg font-semibold hover:bg-green-700"
        >
          View Bookings
        </NavLink>

        <NavLink
          to="/packagers/chat"
          className="p-4 bg-red-600 text-white rounded-lg flex items-center justify-center text-lg font-semibold hover:bg-red-700"
        >
          Chat with Travelers
        </NavLink>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Traveler</th>
              <th className="p-3">Package</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3">John Doe</td>
              <td className="p-3">Beach Tour</td>
              <td className="p-3">2025-03-12</td>
              <td className="p-3 text-green-500 font-semibold">Confirmed</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Jane Smith</td>
              <td className="p-3">Mountain Trek</td>
              <td className="p-3">2025-03-15</td>
              <td className="p-3 text-yellow-500 font-semibold">Pending</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">David Brown</td>
              <td className="p-3">City Exploration</td>
              <td className="p-3">2025-03-18</td>
              <td className="p-3 text-red-500 font-semibold">Cancelled</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
