export const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Voyago</h3>
            <p className="text-sm">
              Your ultimate travel partner, offering unforgettable trips and amazing deals worldwide. 
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Destinations</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
  
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
            </ul>
          </div>
  
          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-xl hover:text-white"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-xl hover:text-white"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-xl hover:text-white"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
  
        {/* Bottom Bar */}
        <div className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} Voyago. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  