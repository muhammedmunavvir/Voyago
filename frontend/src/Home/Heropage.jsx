export const Heropage = () => {
  const destinations = [
    {
      title: "Santorini, Greece",
      image: "https://images.pexels.com/photos/1797166/pexels-photo-1797166.jpeg",
      description: "Breathtaking sunsets and stunning white-washed buildings.",
    },
    {
      title: "Kyoto, Japan",
      image: "https://images.pexels.com/photos/1025469/pexels-photo-1025469.jpeg",
      description: "Ancient temples, cherry blossoms, and rich culture.",
    },
    {
      title: "Bali, Indonesia",
      image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
      description: "Lush jungles, serene beaches, and vibrant nightlife.",
    },
    {
      title: "Kyoto, Japan",
      image: "https://images.pexels.com/photos/1025469/pexels-photo-1025469.jpeg",
      description: "Ancient temples, cherry blossoms, and rich culture.",
    },
    {
      title: "Bali, Indonesia",
      image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
      description: "Lush jungles, serene beaches, and vibrant nightlife.",
    },
  ];

  return (
    <section className="relative w-full h-[80vh] text-white flex items-center">
      
      {/* Background & Overlay */}
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 px-10 w-full">
        {/* Title & Caption Aligned Left */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-5xl font-bold mb-4 text-left">
            Top Trending Destinations
          </h1>
          <p className="text-lg md:text-xl text-left">
            Discover breathtaking locations and unforgettable experiences.
          </p>
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="bg-white text-gray-900 p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={destination.image}
                alt={destination.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-bold">{destination.title}</h3>
              <p className="text-sm text-gray-700">{destination.description}</p>
            </div>
          ))}
        </div>

        
      <div className="fixed bottom-4 right-4 flex items-center gap-4">
        <div className="bg-white rounded-full shadow-lg p-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            EVA
          </div>
          <div className="bg-blue-100 px-3 py-1 rounded-full text-blue-600 text-sm">
            Chat with me
          </div>
        </div>
        
        <button className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          Plan Your Trip
        </button>
      </div>
      </div>
    </section>
  );
};
