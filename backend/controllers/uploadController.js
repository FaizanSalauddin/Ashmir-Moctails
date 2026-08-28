import { uploadBufferToCloudinary } from "../middleware/upload.js";

export async function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({
      message: "No image file provided.",
    });
  }

  try {
    const result = await uploadBufferToCloudinary(
      req.file.buffer
    );

    return res.status(201).json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.error("Cloudinary upload error:", err);

    return res.status(500).json({
      message: "Image upload failed.",
      error: err.message,
    });
  }
}