import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../conf/APiconfi";
import { 
  FaCalendarAlt, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaRupeeSign, 
  FaPlane, 
  FaHotel,
  FaUsers,
  FaComments,
  FaArrowRight,
  FaGift,
  FaCheckCircle,
  FaArrowLeft
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchuser } from "../redux/reduxslices/users";

export const BookingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const passeddata = location.state || {};
  
  const { user, status, error } = useSelector((state) => state.users);
  
  useEffect(() => {
    dispatch(fetchuser());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    travelDate: "",
    returnDate: "",
    numOfTravelers: 1,
    specialRequests: "",
  });

  const [totalCost, setTotalCost] = useState(passeddata.price || 0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  // Form validation states
  const [errors, setErrors] = useState({});
  const [personalInfoComplete, setPersonalInfoComplete] = useState(false);
  const [travelInfoComplete, setTravelInfoComplete] = useState(false);

  // Update form data when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phoneNumber: user.phoneNumber || prev.phoneNumber
      }));
    }
  }, [user]);

  useEffect(() => {
    if (passeddata?.price) {
      let total = Number(formData.numOfTravelers) * passeddata.price;
      if (user?.oncebooked === "yes") {
        total -= total * 0.1;
      }
      setTotalCost(total.toFixed(2));
    }
  }, [formData.numOfTravelers, passeddata?.price, user?.oncebooked]);

  // Check if personal information is complete
  useEffect(() => {
    const isPersonalInfoComplete = 
      formData.name.trim() !== "" && 
      formData.email.trim() !== "" && 
      formData.email.includes('@') &&
      formData.phoneNumber.trim() !== "";
    
    setPersonalInfoComplete(isPersonalInfoComplete);
  }, [formData.name, formData.email, formData.phoneNumber]);

  // Check if travel information is complete
  useEffect(() => {
    const isTravelInfoComplete = 
      formData.travelDate !== "" && 
      formData.returnDate !== "";
    
    setTravelInfoComplete(isTravelInfoComplete);
  }, [formData.travelDate, formData.returnDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateStep = (step) => {
   
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    }
    
    if (step === 2) {
      if (!formData.travelDate) newErrors.travelDate = "Travel date is required";
      if (!formData.returnDate) newErrors.returnDate = "Return date is required";
      else if (new Date(formData.returnDate) < new Date(formData.travelDate)) {
        newErrors.returnDate = "Return date must be after travel date";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Replace the nextStep function with this:
  const nextStep = () => {
    console.log("Attempting to move from step", activeStep);
    if (validateStep(activeStep)) {
      console.log("Validation passed, moving to step", activeStep + 1);
      setActiveStep(prev => prev + 1);
    } else {
      console.log("Validation failed for step", activeStep);
    }
  };

  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all steps before submission
    const isStep1Valid = validateStep(1);
    const isStep2Valid = validateStep(2);
    
    if (!isStep1Valid) {
      setActiveStep(1);
      return;
    }
    
    if (!isStep2Valid) {
      setActiveStep(2);
      return;
    }
    if (activeStep !== 3) {
      setActiveStep(3);
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/booking/packagebooking`, {
        ...formData,
        packageId: passeddata.packageid,
        packageName: passeddata.packagename,
        providerId: passeddata.packagerId,
        providerName: passeddata.packagername,
        userId: user._id,
        totalCost: totalCost,
      });
      
      toast.success("Booking created successfully!");
      
      navigate("/razorpaycheckoutflow", {
        state: {
          totalAmount: response.data.booking.totalCost,
          transactionId: response.data.razorpay_order_id,
        },
      });
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(`❌ Booking failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-600 to-purple-500">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-600 to-purple-500">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-500">Error fetching user data</h1>
          <p className="mt-2">Please try again later or contact support.</p>
          <button 
            onClick={() => dispatch(fetchuser())}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Render different form sections based on active step
  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUser className={errors.name ? "text-red-400" : "text-gray-400"} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 p-4 bg-gray-50 border ${errors.name ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"} rounded-lg outline-none transition-all`}
                placeholder="Full Name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className={errors.email ? "text-red-400" : "text-gray-400"} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 p-4 bg-gray-50 border ${errors.email ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"} rounded-lg outline-none transition-all`}
                placeholder="Email Address"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaPhone className={errors.phoneNumber ? "text-red-400" : "text-gray-400"} />
              </div>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full pl-10 p-4 bg-gray-50 border ${errors.phoneNumber ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"} rounded-lg outline-none transition-all`}
                placeholder="Phone Number"
              />
              {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUsers className="text-gray-400" />
              </div>
              <select
                name="numOfTravelers"
                value={formData.numOfTravelers}
                onChange={handleChange}
                className="w-full pl-10 p-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num} Traveler{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Travel Details</h3>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">Travel Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaCalendarAlt className={errors.travelDate ? "text-red-400" : "text-gray-400"} />
                </div>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  className={`w-full pl-10 p-4 bg-gray-50 border ${errors.travelDate ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"} rounded-lg outline-none transition-all`}
                />
              </div>
              {errors.travelDate && <p className="mt-1 text-sm text-red-600">{errors.travelDate}</p>}
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">Return Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaCalendarAlt className={errors.returnDate ? "text-red-400" : "text-gray-400"} />
                </div>
                <input
                  type="date"
                  min={formData.travelDate || new Date().toISOString().split("T")[0]}
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className={`w-full pl-10 p-4 bg-gray-50 border ${errors.returnDate ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"} rounded-lg outline-none transition-all`}
                />
              </div>
              {errors.returnDate && <p className="mt-1 text-sm text-red-600">{errors.returnDate}</p>}
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">Special Requests (Optional)</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FaComments className="text-gray-400" />
                </div>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  className="w-full pl-10 p-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all h-32"
                  placeholder="Any special requirements or preferences..."
                ></textarea>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Summary</h3>
            
            <div className="bg-indigo-50 p-6 rounded-xl">
              <h4 className="font-medium text-gray-700 mb-4">Booking Details</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{formData.name}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{formData.phoneNumber}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Travelers</p>
                  <p className="font-medium">{formData.numOfTravelers} person(s)</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Travel Date</p>
                  <p className="font-medium">{new Date(formData.travelDate).toLocaleDateString()}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Return Date</p>
                  <p className="font-medium">{new Date(formData.returnDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <h4 className="font-medium text-gray-700 mb-4">Cost Breakdown</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Base Price ({formData.numOfTravelers} {formData.numOfTravelers > 1 ? 'travelers' : 'traveler'})</span>
                  <span className="flex items-center font-medium">
                    <FaRupeeSign className="mr-1" /> {(Number(formData.numOfTravelers) * passeddata.price).toFixed(2)}
                  </span>
                </div>
                
                {user?.oncebooked === "yes" && (
                  <div className="flex justify-between items-center text-green-600">
                    <span className="flex items-center">
                      <FaGift className="mr-2" /> Loyalty Discount (10%)
                    </span>
                    <span>- <FaRupeeSign className="inline mr-1" />{((Number(formData.numOfTravelers) * passeddata.price) * 0.1).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-300 pt-3 mt-3">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="flex items-center text-indigo-700">
                      <FaRupeeSign className="mr-1" /> {totalCost}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-blue-700">
                By proceeding with payment, you agree to our Terms and Conditions. Your booking will be confirmed once payment is complete.
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderNavigationButtons = () => {
    return (
      <div className="flex justify-between mt-8">
        {activeStep > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center bg-gray-200 text-gray-700 py-3 px-6 rounded-lg text-lg font-medium hover:bg-gray-300 transition-all duration-300"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
        )}
  
        {activeStep < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className={`ml-auto flex items-center ${
              (activeStep === 1 && !personalInfoComplete) || (activeStep === 2 && !travelInfoComplete)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white py-3 px-6 rounded-lg text-lg font-medium transition-all duration-300`}
            disabled={(activeStep === 1 && !personalInfoComplete) || (activeStep === 2 && !travelInfoComplete)}
          >
            {activeStep === 2 ? "Review Summary" : "Continue"} <FaArrowRight className="ml-2" />
          </button>
        ) : (
          // Ensure API call only happens when "Proceed to Payment" is clicked
          <button
            type="button"  // Changed from "submit" to "button"
            onClick={handleSubmit}  // Only triggers API on click
            className="ml-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                Processing...
              </>
            ) : (
              <>
                Proceed to Payment <FaArrowRight className="ml-2" />
              </>
            )}
          </button>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Book Your Dream Getaway</h1>
          <p className="text-blue-100 text-lg">Complete your booking for an unforgettable experience</p>
        </div>
        
        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Package Info Banner */}
          {passeddata.packagename && (
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{passeddata.packagename}</h2>
                  <p className="flex items-center text-indigo-100">
                    <FaHotel className="mr-2" /> Provided by {passeddata.packagername}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 bg-white bg-opacity-20 rounded-xl p-3">
                  <div className="text-xl font-bold flex items-center">
                    <FaRupeeSign className="mr-1" /> {passeddata.price} <span className="text-sm font-normal ml-1">per person</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Progress Steps */}
          <div className="px-6 pt-6">
            <div className="flex justify-between mb-8">
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full ${activeStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  <FaUser />
                </div>
                <span className={`text-sm mt-2 ${activeStep >= 1 ? 'text-black-600 font-medium' : 'text-gray-500'}`}>Details</span>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`flex-1 h-1 ${activeStep >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full ${activeStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  <FaCalendarAlt />
                </div>
                <span className={`text-sm mt-2 ${activeStep >= 2 ? 'text-black-600 font-medium' : 'text-gray-500'}`}>Schedule</span>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`flex-1 h-1 ${activeStep >= 3 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full ${activeStep >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  <FaRupeeSign />
                </div>
                <span className={`text-sm mt-2 ${activeStep >= 3 ? 'text-black-600 font-medium' : 'text-gray-500'}`}>Payment</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 pt-0">
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${message.includes("failed") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                {message}
              </div>
            )}
            
            {renderStepContent()}
            {renderNavigationButtons()}
            
            {activeStep === 3 && user?.oncebooked === "yes" && (
              <div className="mt-4 flex items-center justify-center text-green-600">
                <FaCheckCircle className="mr-2" />
                <span>You're eligible for a 10% loyalty discount!</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;