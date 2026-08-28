import Service from "../models/Service.js";
import { createCrudController } from "./crudControllerFactory.js";

export default createCrudController(Service, { imagePublicIdField: "imagePublicId" });
