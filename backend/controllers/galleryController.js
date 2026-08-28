import Gallery from "../models/Gallery.js";
import { createCrudController } from "./crudControllerFactory.js";

export default createCrudController(Gallery, {
  sort: { order: 1, createdAt: -1 },
  imagePublicIdField: "imagePublicId",
});
