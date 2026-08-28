import reviewController from "../controllers/reviewController.js";
import { createCrudRoutes } from "./crudRouteFactory.js";

export default createCrudRoutes(reviewController);
