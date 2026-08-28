import Review from "../models/Review.js";
import { createCrudController } from "./crudControllerFactory.js";

export default createCrudController(Review, { sort: { createdAt: -1 } });
