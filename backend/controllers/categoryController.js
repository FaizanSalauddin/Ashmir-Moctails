import Category from "../models/Category.js";
import { createCrudController } from "./crudControllerFactory.js";

export default createCrudController(Category, { sort: { order: 1, name: 1 } });
