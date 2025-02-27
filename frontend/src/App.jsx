import { SignUpfortravelers } from "./components/auth/travelersSignup";
import { Homepage } from "./Home/Homepage";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./Home/Navbar";
import { Login } from "./components/auth/Login";
import { Allpackages } from "./pages/Allpackages";
import { Packagedetails } from "./pages/Packagedetails";
import { PackagerInfo } from "./Home/Packagerinfo";
import { SignUpForPackagers } from "./components/auth/PackagersSign";
import NotFound from "./pages/Notfound";
import AboutUs from "./pages/Aboutpage";
import { ContactUs } from "./pages/Contactus";
import { UserProfile } from "./pages/Userprofile";
import Footer from "./Home/Footer";
import { PackagerSetup } from "./components/Packager/PackagerSetup";
import { PackagerHome } from "./components/Packager/packagerHome";
import { PackagerDashboard } from "./components/Packager/PackagerDashboard";
import { AccessDenied } from "./pages/AccessDenied";
import { AddNewPackage } from "./components/Packager/Addnewpackage";
import { ManagePackages } from "./components/Packager/Managepackage";
import { Packagedetailspageofprovider } from "./components/Packager/Packagedetailpageofprovider";
// import EVAChat from "./pages/Chatwithme";
import { Bookings } from "./components/Packager/Bookings";
import { PackagerChat } from "./components/Chat/Packagermessage";
import { TravelerChat } from "./components/Chat/Travelersmessage";
import { BookingPage } from "./booking/Bookingform";
import { Bookingsummary } from "./booking/Bookingsummary";


const App = () => {
  const location = useLocation();
  const istrue = location.pathname.startsWith("/packager");
  return (
    <div>
      {!istrue && <Navbar />}

      <Routes>
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/signup-traveler" element={<SignUpfortravelers />} />
        <Route path="/signup-packager" element={<SignUpForPackagers />} />
        <Route path="/packager-info" element={<PackagerInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/allpackages" element={<Allpackages />} />
        <Route path="/packagedetailpage/:id" element={<Packagedetails />} />
        <Route path="/bookingpage" element={<BookingPage />} />
        <Route path="/userprofile" element={<UserProfile />} />
        {/* <Route path="/Evachat" element={<EVAChat />} /> */}
        <Route path="/travelers/chat" element={<TravelerChat />} />
        <Route path="/packagers/chat" element={<PackagerChat />} />
        <Route path="/bookingsummary" element={<Bookingsummary />} />
        {/* packager module */}
        <Route path="/packager/packagerset-up" element={<PackagerSetup />} />

        <Route path="/packager" element={<PackagerHome />}>
          <Route path="packagerdashboard" element={<PackagerDashboard />} />
          <Route path="addnewpackage" element={<AddNewPackage />} />
          <Route path="managepackage" element={<ManagePackages />} />
          <Route path="/packager/bookings" element={<Bookings />} />
          <Route
            path="packagedetailspageofprovider/:id"
            element={<Packagedetailspageofprovider />}
          /> 
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/accessdenied" element={<AccessDenied />} />
      </Routes>
    </div>
  );
};

export default App;
