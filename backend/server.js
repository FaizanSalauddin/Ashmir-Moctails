import "dotenv/config";
import express from "express";
import cors from "cors";


import { connectDB } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";


// console.log("ENV TEST:", {
//   cwd: process.cwd(),
//   cloudName: process.env.CLOUDINARY_CLOUD_NAME,
//   apiKey: process.env.CLOUDINARY_API_KEY
//     ? "LOADED"
//     : "MISSING",
// });

const app = express();

const corsOrigin = process.env.CORS_ORIGIN;
app.use(
  cors({
    origin: corsOrigin ? corsOrigin.split(",").map((o) => o.trim()) : true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Ashmir Mocktails API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/uploads", uploadRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Ashmir Mocktails API running on port ${PORT}`));
});
