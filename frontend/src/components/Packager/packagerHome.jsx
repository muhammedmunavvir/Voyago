import { FaHome, FaBox, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export const PackagerHome = () => {
  const navigate = useNavigate();

  const user=useSelector((state)=>state)
  console.log(user)

  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("userrole");
    setUserRole(role);
    if (role !== "packager") {
      navigate("/"); 
    }
  }, [navigate]);

  if (userRole === "traveler") {
    navigate("/accessdenied")
  }

  return (
    <div className="flex h-screen bg-[#a6a6a7]">
     
    {/* Sidebar */}
    <aside className="w-64 bg-[#642191] text-white p-6 space-y-6 h-screen fixed">
      <h2 className="text-2xl font-bold text-center">Packager Panel</h2>
      <nav className="space-y-4">
      <NavLink 
          to="/packager/profile"
          className="flex items-center space-x-3 p-3 rounded-md hover:bg-slate-700"
        >
          <img src={user.profilepic} alt="pic" /> <span>profile</span>
        </NavLink>

        <NavLink 
          to="/packager/packagerdashboard"
          className="flex items-center space-x-3 p-3 rounded-md hover:bg-slate-700"
        >
          <FaHome /> <span>Dashboard</span>
        </NavLink>
        <NavLink 
          to="/packager/managepackage"
          className="flex items-center space-x-3 p-3 rounded-md hover:bg-slate-700"
        >
          <FaBox /> <span>Manage Packages</span>
        </NavLink>
        <NavLink 
          to="/packager/bookings"
          className="flex items-center space-x-3 p-3 rounded-md hover:bg-slate-700"
        >
          <FaUsers /> <span>Bookings</span>
        </NavLink>
        <button 
          className="flex items-center space-x-3 p-3 w-full rounded-md hover:bg-red-600"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </nav>
    </aside>
  
    {/* Main Content (Adjusted for Sidebar) */}
    <div className="flex-1 flex flex-col ml-64"> {/* Add margin-left for sidebar */}
      {/* Top Navbar */}
      <header  
  className="relative bg-cover bg-center text-white shadow p-4 flex justify-between items-center h-[45px]" 
  style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/007/997/267/small_2x/businessmen-point-to-successful-business-growth-plans-ladder-of-success-action-planning-and-long-term-business-goals-photo.jpg')", height: "150px" }}
>
  <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay for readability */}
  
  <h2 className="relative text-xl font-semibold z-10 pl-4">Dashboard</h2>

  <NavLink 
    to="addnewpackage" 
    className="relative px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-900 z-10"
  >
    Add New Package
  </NavLink>
</header>

  
      {/* Main Content */}
      <main className="p-6 flex-grow bg-white shadow rounded-lg m-4">
        <Outlet />
      </main>
    </div>
  </div>
    );
};
