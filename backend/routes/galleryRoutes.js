import galleryController from "../controllers/galleryController.js";
import { createCrudRoutes } from "./crudRouteFactory.js";

export default createCrudRoutes(galleryController);
