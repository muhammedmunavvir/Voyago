import { FaMapMarkerAlt, FaUsers, FaGlobe, FaStar } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="relative w-full min-h-screen bg-gray-100 dark:bg-slate-900 py-12">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg')",
        }}
      ></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">
          About <span className="text-blue-600">Voyago</span>
        </h1>
        <p className="mt-4 text-lg text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Voyago is your gateway to discovering the world. We curate the best travel packages,
          ensuring you have memorable and hassle-free journeys.
        </p>

        {/* Highlights Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
            <FaMapMarkerAlt className="text-blue-600 text-5xl" />
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">100+ Destinations</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
              Explore beautiful locations worldwide with our curated packages.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
            <FaUsers className="text-blue-600 text-5xl" />
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">5000+ Happy Travelers</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
              Trusted by thousands of travelers for their dream vacations.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
            <FaGlobe className="text-blue-600 text-5xl" />
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Global Packages</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
              Experience international trips with ease and comfort.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
            <FaStar className="text-blue-600 text-5xl" />
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Top-rated Service</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
              We ensure excellent services for a worry-free journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
