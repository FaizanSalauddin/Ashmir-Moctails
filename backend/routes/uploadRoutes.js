import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { uploadImage } from "../controllers/uploadController.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post("/", requireAuth, upload.single("image"), asyncHandler(uploadImage));

export default router;
