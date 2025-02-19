import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export const ContactUs = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center px-6 md:px-12"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative w-full max-w-4xl p-8 bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Contact Us</h2>
        <p className="text-center text-gray-600 mt-2">
          Get in touch with us for any inquiries or support.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-blue-600" />
              <span className="text-gray-700 font-semibold">+123 456 7890</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-blue-600" />
              <span className="text-gray-700 font-semibold">info@voyago.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-blue-600" />
              <span className="text-gray-700 font-semibold">123 Travel St, City, Country</span>
            </div>

            <div className="flex space-x-4 mt-4">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 text-2xl hover:scale-110 transition-transform"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://instagram.com/voyago"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 text-2xl hover:scale-110 transition-transform"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              required
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
