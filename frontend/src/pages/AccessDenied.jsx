import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

export const AccessDenied = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
      <FaLock className="text-red-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
      <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};
