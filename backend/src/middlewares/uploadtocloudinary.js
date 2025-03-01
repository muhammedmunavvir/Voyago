// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// console.log("Initializing Cloudinary Storage...");

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async (req, file) => {
//         console.log("Processing file in middleware:", file.originalname);
//         return {
//             folder: "uploads", // Ensure folder creation
//             format: file.mimetype.split("/")[1], // Keep original format
//             public_id: file.originalname.split(".")[0], // Use original filename without extension
//         };
//     },
// }); 

// console.log("Cloudinary Storage initialized!");

// // Initialize Multer with Cloudinary storage
// const uploadMiddleware = multer({ storage:storage });

// // // Debugging to check if `single()` is accessible
// // if (typeof uploadMiddleware.single !== "function") {
// //     console.error("❌ ERROR: uploadMiddleware.single is not a function! Check multer setup.");
// // } else {
// //     console.log("✅ uploadMiddleware is correctly configured.");
// // }

// export default uploadMiddleware;

import multer from "multer"
import cloudinary from "../config/cloudinary.js"
import {CloudinaryStorage} from "multer-storage-cloudinary"

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
    }
})

const uploadMiddleware = multer({storage: storage})

export default uploadMiddleware