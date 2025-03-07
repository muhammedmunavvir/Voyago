import { FaBox, FaUsers, FaEnvelope, FaRupeeSign  } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchdshboarddata } from "../../redux/reduxslices/dashboardslice";
import MyLineChart from "./Reachart";
import CountUp from "react-countup"; // Import CountUp


export const PackagerDashboard = () => {
  useEffect(() => {
    window.scrollTo({ top: 141, behavior: "smooth" }); // Adjust `top` value as needed
  }, []);
  const { packages, bookings, status, error } = useSelector(
    (state) => state.dashboard
  );
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(fetchdshboarddata());
  }, []);

  if (status === "loading") {
    return <h1 className="text-center text-lg font-semibold text-blue-500">Loading...</h1>;
  }
  if (status === "failed") {
    return <h1 className="text-center text-lg font-semibold text-red-500">Error: {error}</h1>;
  }

  // Calculate total revenue
  const totalRevenue = bookings.reduce((acc, booking) => acc + (booking.totalCost || 0), 0);

  return (
    <div className="p-6 bg-gradient-to-r from-purple-500 to-blue-500 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Packager Dashboard</h1>

      {/* Charts Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Booking & Revenue Trends</h2>
        <MyLineChart />
      </div>

      {/* Stats Section */}
     

<div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
  {[
    {
      icon: <FaBox />,
      label: "Total Packages",
      value: <CountUp start={0} end={packages.length} duration={2} />,
      color: "bg-pink-500",
    },
    {
      icon: <FaUsers />,
      label: "Total Bookings",
      value: <CountUp start={0} end={bookings.length} duration={2} />,
      color: "bg-green-500",
    },
    {
      icon: <FaRupeeSign />,
      label: "Total Revenue",
      value: (
        <CountUp start={0} end={totalRevenue} duration={2.5} separator="," />
      ),
      color: "bg-yellow-500",
    },
    {
      icon: <FaEnvelope />,
      label: "New Messages",
      value: <CountUp start={0} end={5} duration={2} />, // You can replace 5 with a dynamic value
      color: "bg-red-500",
    },
  ].map((stat, index) => (
    <div
      key={index}
      className={`${stat.color} p-6 shadow-md rounded-lg flex items-center space-x-4`}
    >
      <div className="text-4xl text-white">{stat.icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-white">{stat.label}</h3>
        <p className="text-2xl font-bold text-white">{stat.value}</p>
      </div>
    </div>
  ))}
</div>;


      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          { path: "/packager/managepackage", label: "Manage Packages", color: "bg-blue-600 hover:bg-blue-700" },
          { path: "/packager/bookings", label: "View Bookings", color: "bg-green-600 hover:bg-green-700" },
          { path: "/packagers/chat", label: "Chat with Travelers", color: "bg-red-600 hover:bg-red-700" },
        ].map((action, index) => (
          <NavLink
            key={index}
            to={action.path}
            className={`p-4 rounded-lg flex items-center justify-center text-lg font-semibold text-white transition ${action.color}`}
          >
            {action.label}
          </NavLink>
        ))}
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white p-6 shadow-md rounded-lg text-gray-800">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3">Traveler</th>
                <th className="p-3">Package</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                [...bookings]
                  .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
                  .slice(0, 5)
                  .map((booking) => (
                    <tr key={booking._id} className="border-t bg-gray-100 hover:bg-gray-200">
                      <td className="p-3">{booking.name}</td>
                      <td className="p-3">{booking.packageName}</td>
                      <td className="p-3">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                      <td className={`p-3 font-semibold ${
                        booking.status === "confirmed" ? "text-green-600" :
                        booking.status === "pending" ? "text-yellow-600" : "text-red-600"
                      }`}>{booking.status}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-gray-500">No recent bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
