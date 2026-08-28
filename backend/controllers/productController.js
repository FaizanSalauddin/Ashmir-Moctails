import Product from "../models/Product.js";
import { createCrudController } from "./crudControllerFactory.js";

export default createCrudController(Product, {
  sort: { category: 1, order: 1 },
  imagePublicIdField: "imagePublicId",
});
