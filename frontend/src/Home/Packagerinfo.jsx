import { useNavigate } from "react-router-dom";

export const PackagerInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800">What is a Packager?</h1>
      <p className="text-lg text-gray-600 mt-2">
        A Packager is a travel agency or individual who can create and list tour packages for travelers on our platform.
      </p>

      <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">How It Works?</h2>
        <ul className="list-disc pl-6 mt-3 text-gray-700 space-y-2">
          <li>Register as a Packager.</li>
          <li>Create and list your tour packages.</li>
          <li>Get bookings from travelers.</li>
          <li>Earn revenue from each package sold.</li>
        </ul>
      </div>  

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">Why Become a Packager?</h2>
        <ul className="list-disc pl-6 mt-3 text-gray-700 space-y-2">
          <li>🌍 Reach thousands of travelers.</li>
          <li>💰 Earn more by selling your packages.</li>
          <li>📈 Grow your travel business with our platform.</li>
          <li>🔧 Easy management with our dashboard.</li>
        </ul>
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={() => navigate("/signup-packager")} className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700">
          Get Started as a Packager
        </button>
        <button onClick={() => navigate(-1)} className=" bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 ">
          Go Back
        </button>
      </div>
    </div>
  );
};
