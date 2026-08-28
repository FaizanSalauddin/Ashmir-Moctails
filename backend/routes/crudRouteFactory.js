import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export function createCrudRoutes(controller) {
  const router = Router();

  router.get("/", asyncHandler(controller.list));
  router.post("/", requireAuth, asyncHandler(controller.create));
  router.put("/:id", requireAuth, asyncHandler(controller.update));
  router.delete("/:id", requireAuth, asyncHandler(controller.remove));

  return router;
}
