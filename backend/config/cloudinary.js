import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloudinary.config(cloudinaryConfig);

// console.log("Cloudinary initialized:", {
//   cloud_name: cloudinaryConfig.cloud_name,
//   api_key: cloudinaryConfig.api_key ? "LOADED" : "MISSING",
//   api_secret: cloudinaryConfig.api_secret ? "LOADED" : "MISSING",
// });

export default cloudinary;