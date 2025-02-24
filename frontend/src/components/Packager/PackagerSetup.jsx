import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PackagerSetup = () => {
  const userRole = localStorage.getItem("userrole");
  if (userRole === "traveler") {
    navigate("/accessdenied");
  }
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (!agreed) {
      alert("You must agree to the Terms & Conditions to continue.");
      return;
    }
    navigate("/packager/add-package");
  };

  const handleSkip = () => {
    navigate("/packager/packagerdashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Welcome to Voyago!</h2>
        <p className="text-gray-600 mb-6">
          Start your journey by adding your first package or skip to the
          dashboard.
        </p>

        {!showTerms ? (
          <>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="terms"
                // checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="h-4 w-4"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <button
                  onClick={() => setShowTerms(true)}
                  className="text-blue-500 underline"
                >
                  Terms & Conditions
                </button>
              </label>
            </div>

            <button
              onClick={handleProceed}
              className={`w-full bg-blue-500 text-white py-2 rounded-lg mb-3 ${
                !agreed ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
              disabled={!agreed}
            >
              Add Your First Package
            </button>

            <button
              onClick={handleSkip}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              Skip
            </button>
          </>
        ) : (
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-4">Terms & Conditions</h3>
            <p className="text-gray-700">
              By using Voyago, you agree to the following terms:
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-600">
              <li>You must provide accurate package details.</li>
              <li>All bookings must be managed responsibly.</li>
              <li>Voyago is not responsible for cancellations or disputes.</li>
              <li>Misuse of the platform may result in account suspension.</li>
            </ul>
            <p className="mt-4 text-gray-700">
              For full details, please contact our support team.
            </p>
            <button
              onClick={() => setShowTerms(false)}
              className="mt-4 text-blue-500 underline"
            >
              Back to Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
