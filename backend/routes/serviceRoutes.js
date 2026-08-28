import serviceController from "../controllers/serviceController.js";
import { createCrudRoutes } from "./crudRouteFactory.js";

export default createCrudRoutes(serviceController);
