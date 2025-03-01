import axios from "axios";
import { useState } from "react";
import { API_URL } from "../conf/APiconfi";

export const UserProfile = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // Free previous preview URL to prevent memory leaks
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(URL.createObjectURL(selectedFile));
  };

  // Handle file upload
  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/upload/profilephoto`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.imageUrl) {
        setProfilePic(response.data.imageUrl);
        alert("Upload successful!");
      } else {
        alert("Upload failed, no image URL returned.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };


  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-black">
      <div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-6 w-96 text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">Upload Profile Photo</h2>

        {/* Profile Image Preview */}
        <div className="relative flex justify-center mb-4">
          <label className="cursor-pointer">
            <div className="relative w-32 h-32 border-4 border-gray-400 rounded-full overflow-hidden hover:border-blue-400 transition">
              <img
                src={preview || profilePic || "/default-profile.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent animate-spin rounded-full"></div>
                </div>
              )}
            </div>
          </label>
        </div>

        {/* File Input */}
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg cursor-pointer hover:bg-blue-700 transition"
        >
          Choose File
        </label>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full mt-4 px-4 py-2 rounded-lg text-white font-semibold transition 
          ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {/* Success Message */}
        {profilePic && (
          <p className="mt-3 text-green-400 font-medium">Profile Picture Updated!</p>
        )}
      </div>
    </div>
  );
};
