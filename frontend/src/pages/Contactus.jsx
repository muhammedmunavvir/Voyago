import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_4h4ld0d", "template_yu7smcu", form.current, "fY2PeEYQlVdIoM6iz")
      .then(
        (result) => {
          alert("Message sent successfully!");
          console.log(result.text);
        },
        (error) => {
          alert("Failed to send message. Try again later.");
          console.error(error.text);
        }
      );

    e.target.reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white bg-opacity-10 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-lg border border-white/20"
      >
        {/* Header */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">Let's Connect 💬</h2>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500 text-2xl transition">
            <FaInstagram />
          </a>
          <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-500 text-2xl transition">
            <FaWhatsapp />
          </a>
          <a href="mailto:your@email.com" className="text-white hover:text-blue-400 text-2xl transition">
            <FaEnvelope />
          </a>
        </div>

        {/* Contact Form */}
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          {/* Name Input */}
          <div className="relative">
            <input
              type="text"
              name="from_name"
              required
              className="peer w-full px-4 py-3 bg-transparent border border-white/30 text-white placeholder-gray-400 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Your Name"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              name="user_email"
              required
              className="peer w-full px-4 py-3 bg-transparent border border-white/30 text-white placeholder-gray-400 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Your Email"
            />
          </div>

          {/* Message Input */}
          <div className="relative">
            <textarea
              name="message"
              required
              className="peer w-full px-4 py-3 bg-transparent border border-white/30 text-white placeholder-gray-400 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition h-32 resize-none"
              placeholder="Your Message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-lg"
          >
               Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
