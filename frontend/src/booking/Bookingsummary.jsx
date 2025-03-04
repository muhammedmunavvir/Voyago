import { FaCheckCircle, FaCalendarAlt, FaMoneyBillWave, FaMapMarkerAlt, FaFilePdf, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { API_URL } from "../conf/APiconfi";
import { useQuery } from "@tanstack/react-query";

export const Bookingsummary = () => {
  const fetchBookingDetails = async () => {
    const res = await axios.get(`${API_URL}/summary/bookingsummary`);
    return res.data.data;
  };

  const { data: bookingDetail = {}, isError, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookingDetails,
  });

  if (isLoading) return <h1 className="text-center text-xl font-bold">Loading...</h1>;
  if (isError) return <h1 className="text-center text-xl text-red-500">Error fetching data</h1>;

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
        ["Travel Date", bookingDetail.travelDate],
        ["Return Date", bookingDetail.returnDate],
        ["Travelers", bookingDetail.numOfTravelers],
        ["Total Cost", `₹${bookingDetail.totalCost}`],
        ["Payment Status", bookingDetail.paymentStatus],
        ["Status", bookingDetail.status],
      ],
    });

    doc.save("Booking_Summary.pdf");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-6 py-10">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-2xl w-full border border-gray-300">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Booking Summary</h2>
        <div className="border-t border-gray-300 py-6 space-y-6 text-lg">
          <div className="grid grid-cols-1 gap-4">
            {[ 
              { icon: FaUser, label: "Name", value: bookingDetail.name, color: "text-purple-500" },
              { icon: FaEnvelope, label: "Email", value: bookingDetail.email, color: "text-blue-500" },
              { icon: FaPhone, label: "Phone", value: bookingDetail.phoneNumber, color: "text-green-500" },
              { icon: FaMapMarkerAlt, label: "Package", value: `${bookingDetail.packageName} (${bookingDetail.providerName})`, color: "text-red-500" },
              { icon: FaCalendarAlt, label: "Travel Date", value: bookingDetail.travelDate, color: "text-indigo-500" },
              { icon: FaMoneyBillWave, label: "Total Cost", value: `₹${bookingDetail.totalCost}`, color: "text-yellow-500" },
              { icon: FaCheckCircle, label: "Payment", value: bookingDetail.paymentStatus, color: bookingDetail.paymentStatus === 'paid' ? "text-green-600" : "text-red-600" },
              { icon: FaCheckCircle, label: "Status", value: bookingDetail.status, color: bookingDetail.status === 'confirmed' ? "text-green-600" : "text-red-600" },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                <item.icon className={`text-xl ${item.color}`} />
                <p className="font-semibold text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          <button className="w-1/2 bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all shadow-md">
            View Details
          </button>
          <button
            onClick={generatePDF}
            className="w-1/2 bg-red-600 text-white py-3 rounded-xl text-lg font-semibold flex items-center justify-center hover:bg-red-700 transition-all shadow-md"
          >
            <FaFilePdf className="mr-2" /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};