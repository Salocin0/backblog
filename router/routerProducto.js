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
import { gzipCompression } from "../middleware/gzipMiddleware.js";
import { validationBodyProducto, validationIdProducto, validationQueryProducto } from "../validations/validationProducto.js";

const routerproductos = express.Router();

routerproductos.get("/",gzipCompression, authMiddleware, getProductsController);
routerproductos.get("/paginado",gzipCompression,validationQueryProducto,validationMiddleware, getProductPaginadoController); // /productos/paginado
routerproductos.get("/filtrado",gzipCompression,validationQueryProducto,validationMiddleware, getProductFiltradoController); // /productos/paginado
routerproductos.get("/:id", validationIdProducto,validationMiddleware, getProductController);
routerproductos.post("/",authMiddleware,validationBodyProducto,validationMiddleware, createProductController);
routerproductos.put("/:id",authMiddleware,validationIdProducto,validationBodyProducto,validationMiddleware, updateProductController);
routerproductos.delete("/:id",authMiddleware, validationIdProducto,validationMiddleware, deleteProductController);

export default routerproductos;
