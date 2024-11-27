import express from "express";
import {
  createProductController,
  getProductController,
  getProductsController,
  getProductPaginadoController,
  getProductFiltradoController,
  updateProductController,
  deleteProductController,
} from "../controller/controllerProducto.js";
import {
  authMiddleware
} from "../middleware/authMiddleware.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { validationBodyProducto, validationIdProducto, validationQueryProducto } from "../validations/validationProducto.js";

const routerproductos = express.Router();

routerproductos.get("/", authMiddleware, getProductsController);
routerproductos.get("/paginado",validationQueryProducto,validationMiddleware, getProductPaginadoController); // /productos/paginado
routerproductos.get("/filtrado",validationQueryProducto,validationMiddleware, getProductFiltradoController); // /productos/paginado
routerproductos.get("/:id", validationIdProducto,validationMiddleware, getProductController);
routerproductos.post("/",validationBodyProducto,validationMiddleware, createProductController);
routerproductos.put("/:id",validationIdProducto,validationBodyProducto,validationMiddleware, updateProductController);
routerproductos.delete("/:id", validationIdProducto,validationMiddleware, deleteProductController);

export default routerproductos;
