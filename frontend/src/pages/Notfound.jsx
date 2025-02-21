import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold">Oops! Page Not Found</h2>
      <p className="mt-2 text-gray-400">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-X6 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
}
