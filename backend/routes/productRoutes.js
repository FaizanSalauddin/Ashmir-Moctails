import productController from "../controllers/productController.js";
import { createCrudRoutes } from "./crudRouteFactory.js";

export default createCrudRoutes(productController);
