import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../conf/APiconfi";
import toast from "react-hot-toast";

export const RazorpayCheckoutPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { totalAmount, transactionId } = state || {};

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (document.getElementById("razorpay-script")) {
          resolve(true); // Script already loaded
          return;
        }
 
        const script = document.createElement("script");
        script.id = "razorpay-script";
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const initializeRazorpay = async () => {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        toast.error("Failed to load Razorpay SDK.");
        return;
      }

      if (typeof window.Razorpay !== "function") {
        toast.error("Razorpay SDK not fully loaded. Please refresh and try again.");
        return;
      }

      const options = {
        key: "rzp_test_A59k6gc1kPArBf", // Replace with your Razorpay Key
        amount: totalAmount * 100, // Convert amount to paise
        currency: "INR",
        name: "Voyago",
        order_id: transactionId,
        handler: async (response) => {
            console.log("✅ Payment Response:", response); // Check Razorpay response in console

          try {
            const verifyResponse = await axios.post(`${API_URL}/payment/verifypayment`, {...response,transactionId,});
            console.log("🔹 Verification Response:", verifyResponse.data); // Log backend resp
            if (verifyResponse.data.success) {
              toast.success("Payment verified!"); 
              navigate("/bookingsummary");
            } else {
              toast.error("Payment failed.");
            }
          } catch (error) {
            toast.error("Server error verifying payment.",error);
          }
        }, 
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };

    initializeRazorpay();
  }, [totalAmount, transactionId, navigate]);

  return <div>Redirecting to Razorpay...</div>;
};
