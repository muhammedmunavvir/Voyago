import { useState, useEffect } from "react";
import { ShimmerButton } from "../components/magicui/shimmer-button";
import { NavLink } from "react-router-dom";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      url: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Beautiful Mountain View",
    },
    { 
      url: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg",
      alt: "Tropical Island Beach",
    },
    {
      url: "https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Snowy Forest Path",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image Slider */}
      <div
        className="absolute inset-0 w-full h-full flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 h-full relative">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="absolute z-10 text-center px-4 text-white w-full">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
          Discover Your Next Adventure
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Experience breathtaking destinations and create unforgettable memories.
        </p>

   {/* Search Bar */}
   <div className="bg-white text-gray-800 p-2 rounded-full flex items-center max-w-lg w-full mx-auto mt-5 shadow-lg flex-nowrap gap-2">
  <input
    type="text"
    placeholder="Search destinations..."
    className="flex-grow p-2 rounded-l-full focus:outline-none min-w-0 text-sm"
  />
  <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition w-16 sm:w-20 text-sm">
    Search
  </button>
</div>


        {/* Start Exploring Button */}
        <NavLink to="/allpackages">
          <ShimmerButton className="bg-white text-gray-900 mx-auto mt-4 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg">
            Start Exploring
          </ShimmerButton>
        </NavLink>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white scale-125 shadow-md"
                : "bg-gray-400 hover:bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ImageSlider;
