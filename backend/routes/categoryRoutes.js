import categoryController from "../controllers/categoryController.js";
import { createCrudRoutes } from "./crudRouteFactory.js";

export default createCrudRoutes(categoryController);
