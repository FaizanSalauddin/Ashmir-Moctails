import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25 MB
  },
});

export function uploadBufferToCloudinary(
  buffer,
  folder = "ashmir-mocktails"
) {
  return new Promise((resolve, reject) => {
    const config = cloudinary.config();

    // console.log("Cloudinary upload config:", {
    //   cloud_name: config.cloud_name,
    //   api_key: config.api_key ? "LOADED" : "MISSING",
    //   api_secret: config.api_secret ? "LOADED" : "MISSING",
    // });

    if (!config.api_key) {
      return reject(
        new Error("Cloudinary API key is missing in configured instance.")
      );
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}