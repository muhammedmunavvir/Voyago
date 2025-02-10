import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for mobile menu
import logo from "../assets/daf31324-59a4-4960-afdf-1d6cec354d11.jpg";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-700 text-white">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left Section: Logo + "Voyago" */}
        <div className="flex items-center space-x-3">
          <img className="w-10 h-10 rounded-full" src={logo} alt="Voyago Logo" />
          <span className="text-2xl font-bold">Voyago</span>
        </div>

        {/* Center: Navigation Links (Hidden on Mobile) */}
        <ul className="hidden md:flex space-x-6 text-lg mr-48">
          <li><a href="/" className="hover:text-gray-300">Home</a></li>
          <li><a href="/packages" className="hover:text-gray-300">Packages</a></li>
          <li><a href="/about" className="hover:text-gray-300">About</a></li>
          <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
        </ul>

        <span>Login</span>

        {/* Right: Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <ul className="md:hidden bg-slate-800 text-white space-y-4 p-4">
          <li><a href="/" className="block hover:text-gray-300">Home</a></li>
          <li><a href="/packages" className="block hover:text-gray-300">Packages</a></li>
          <li><a href="/about" className="block hover:text-gray-300">About</a></li>
          <li><a href="/contact" className="block hover:text-gray-300">Contact</a></li>
        </ul>
      )}
    </nav>
  );
};
