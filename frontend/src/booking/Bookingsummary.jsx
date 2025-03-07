// import { FaCheckCircle, FaCalendarAlt, FaMoneyBillWave, FaMapMarkerAlt, FaFilePdf, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import axios from "axios";
// import { API_URL } from "../conf/APiconfi";
// import { useQuery } from "@tanstack/react-query";

// export const Bookingsummary = () => {
//   const fetchBookingDetails = async () => {
//     const res = await axios.get(`${API_URL}/summary/bookingsummary`);
//     return res.data.data;
//   };

//   const { data: bookingDetail = {}, isError, isLoading } = useQuery({
//     queryKey: ["bookings"],
//     queryFn: fetchBookingDetails,
//   });

//   if (isLoading) return <h1 className="text-center text-2xl font-bold">Loading...</h1>;
//   if (isError) return <h1 className="text-center text-2xl text-red-500">Error fetching data</h1>;

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(20);
//     doc.text("Booking Summary", 80, 20);

//     autoTable(doc, {
//       startY: 30,
//       head: [["Field", "Details"]],
//       body: [
//         ["Name", bookingDetail.name],
//         ["Email", bookingDetail.email],
//         ["Phone", bookingDetail.phoneNumber],
//         ["Package", bookingDetail.packageName],
//         ["Provider", bookingDetail.providerName],
//         ["Travel Date", bookingDetail.travelDate],
//         ["Return Date", bookingDetail.returnDate],
//         ["Travelers", bookingDetail.numOfTravelers],
//         ["Total Cost", `₹${bookingDetail.totalCost}`],
//         ["Payment Status", bookingDetail.paymentStatus],
//         ["Status", bookingDetail.status],
//       ],
//     });

//     doc.save("Booking_Summary.pdf");
//   };

//   return (
// <div className="max-w-2xl mx-auto bg- p-8 rounded-xl shadow-lg border border-gray-200">
//   <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Booking Summary</h2>

//   <div className="space-y-4">
//     <div className="flex justify-between border-b pb-2">
//       <span className="text-gray-600 font-medium">Name:</span>
//       <span className="text-gray-900">{bookingDetail.name}</span>
//     </div>

//     <div className="flex justify-between border-b pb-2">
//       <span className="text-gray-600 font-medium">Email:</span>
//       <span className="text-gray-900">{bookingDetail.email}</span>
//     </div>

//     <div className="flex justify-between border-b pb-2">
//       <span className="text-gray-600 font-medium">Phone:</span>
//       <span className="text-gray-900">{bookingDetail.phoneNumber}</span>
//     </div>

//     <div className="flex justify-between border-b pb-2">
//       <span className="text-gray-600 font-medium">Package:</span>
//       <span className="text-gray-900">{bookingDetail.packageName} ({bookingDetail.providerName})</span>
//     </div>

//     <div className="flex justify-between border-b pb-2">
//       <span className="text-gray-600 font-medium">Travel Date:</span>
//       <span className="text-gray-900">{bookingDetail.travelDate}</span>
//     </div>

//     <div className="flex justify-between border-b pb-2">
//       <span className="text-gray-600 font-medium">Total Cost:</span>
//       <span className="text-gray-900 font-semibold">₹{bookingDetail.totalCost}</span>
//     </div>

//     <div className="flex justify-between border-b pb-2">
//       <span className="text-gray-600 font-medium">Payment Status:</span>
//       <span className={`font-semibold ${bookingDetail.paymentStatus === 'paid' ? "text-green-600" : "text-red-600"}`}>
//         {bookingDetail.paymentStatus}
//       </span>
//     </div>

//     <div className="flex justify-between border-b pb-2">
//       <span className="text-gray-600 font-medium">Status:</span>
//       <span className={`font-semibold ${bookingDetail.status === 'confirmed' ? "text-green-600" : "text-red-600"}`}>
//         {bookingDetail.status}
//       </span>
//     </div>
//   </div>

//   <div className="mt-6 flex justify-center space-x-4">
//     <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-blue-700 transition">
//       View Details
//     </button>
//     <button onClick={generatePDF} className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-red-700 transition">
//       Download PDF
//     </button>
//   </div>
// </div>

//   );
// };
import React from "react";
import { FaCheckCircle, FaCalendarAlt, FaMoneyBillWave, FaMapMarkerAlt, FaFilePdf, FaUser, FaEnvelope, FaPhone, FaUsers, FaComments } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { API_URL } from "../conf/APiconfi";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

export const Bookingsummary = () => {
  const fetchBookingDetails = async () => {
    const res = await axios.get(`${API_URL}/summary/bookingsummary`);
    return res.data.data;
  };

  const { data: bookingDetail = {}, isError, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookingDetails,
  });

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );
  
  if (isError) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <h1 className="text-xl font-bold">Error fetching booking details</h1>
        <p>Please try again later or contact support.</p>
      </div>
    </div>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Booking Summary", 80, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Field", "Details"]],
      body: [
        ["Name", bookingDetail.name],
        ["Email", bookingDetail.email],
        ["Phone", bookingDetail.phoneNumber],
        ["Package", bookingDetail.packageName],
        ["Provider", bookingDetail.providerName],
        ["Travel Date", formatDate(bookingDetail.travelDate)],
        ["Return Date", formatDate(bookingDetail.returnDate)],
        ["Travelers", bookingDetail.numOfTravelers],
        ["Total Cost", `₹${bookingDetail.totalCost.toLocaleString()}`],
        ["Payment Status", bookingDetail.paymentStatus],
        ["Status", bookingDetail.status],
        ["Transaction ID", bookingDetail.transactionId],
        ["Special Requests", bookingDetail.specialRequests || "None"]
      ],
    });

    doc.save("Booking_Summary.pdf");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 py-6 px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Booking Summary</h1>
            <p className="text-green-100">Booking Date: {formatDate(bookingDetail.bookingDate)}</p>
          </div>
          <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
            <FaCheckCircle className="text-white mr-2" />
            <span className="text-white font-semibold uppercase">{bookingDetail.status}</span>
          </div>
        </div>
      </div>

      {/* Booking Details Card */}
      <div className="p-8">
        {/* Package Info */}
        <div className="mb-8 p-6 bg-green-50 rounded-lg border border-green-100">
          <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            Package Details
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 font-semibold">Package Name:</p>
              <p className="text-gray-800 text-lg">{bookingDetail.packageName}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Provider:</p>
              <p className="text-gray-800 text-lg">{bookingDetail.providerName}</p>
            </div>
          </div>
        </div>

        {/* Travel Info */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaCalendarAlt className="mr-2" />
            Travel Information
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-gray-600 font-semibold">Travel Date:</p>
              <p className="text-gray-800">{formatDate(bookingDetail.travelDate)}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-gray-600 font-semibold">Return Date:</p>
              <p className="text-gray-800">{formatDate(bookingDetail.returnDate)}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-gray-600 font-semibold flex items-center">
                <FaUsers className="mr-2" />
                Travelers:
              </p>
              <p className="text-gray-800">{bookingDetail.numOfTravelers}</p>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaUser className="mr-2" />
            Customer Information
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-600 font-semibold flex items-center">
                <FaUser className="mr-2" />
                Name:
              </p>
              <p className="text-gray-800">{bookingDetail.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-600 font-semibold flex items-center">
                <FaEnvelope className="mr-2" />
                Email:
              </p>
              <p className="text-gray-800">{bookingDetail.email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-600 font-semibold flex items-center">
                <FaPhone className="mr-2" />
                Phone:
              </p>
              <p className="text-gray-800">{bookingDetail.phoneNumber}</p>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaMoneyBillWave className="mr-2" />
            Payment Information
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <p className="text-gray-600 font-semibold">Total Cost:</p>
              <p className="text-gray-800 text-xl font-bold">₹{bookingDetail.totalCost.toLocaleString()}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <p className="text-gray-600 font-semibold">Payment Status:</p>
              <p className={`text-lg font-semibold ${bookingDetail.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                {bookingDetail.paymentStatus.toUpperCase()}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <p className="text-gray-600 font-semibold">Transaction ID:</p>
              <p className="text-gray-800 text-sm">{bookingDetail.transactionId}</p>
            </div>
          </div>
        </div>

        {/* Special Requests */}
        {bookingDetail.specialRequests && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FaComments className="mr-2" />
              Special Requests
            </h2>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <p className="text-gray-800">{bookingDetail.specialRequests}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex justify-end">
          <NavLink 
             to="/"
            className="flex items-center bg-indigo-600 hover:bg-green-700 text-white font-bold py-3 px-6  mr-6 rounded-lg transition-colors duration-300"
          >
            Home page
          </NavLink>
          <button 
            onClick={generatePDF} 
            className="flex items-center bg-red-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            <FaFilePdf className="mr-2" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

