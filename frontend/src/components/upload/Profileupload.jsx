import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../conf/APiconfi";

const ProfileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("");

//   useEffect(() => {
//     // Fetch existing profile picture from backend
//     axios.get("http://localhost:5000/user/profile")
//       .then(response => setProfilePic(response.data.profilePic))
//       .catch(error => console.error("Error fetching profile:", error));
//   }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async (event) => {
  event.preventDefault();
  if (!file) return alert("Please select a file!");

  const formData = new FormData();
  formData.append("image", file);

  try {
    setLoading(true);
    
    const response = await axios.post(`${API_URL}/upload/profilephoto`, formData, {
      headers: {}, // Let browser set the correct Content-Type
    });

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
    <div className="upload-container">
      <h2>Upload Profile Picture</h2>

      {/* Show existing profile picture */}
      {profilePic && <img src={profilePic} alt="Profile" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />}

      <input type="file" onChange={handleFileChange} accept="image/*" />
      {preview && <img src={preview} alt="Preview" style={{ width: "100px", height: "100px", marginTop: "10px" }} />}

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ProfileUpload;
