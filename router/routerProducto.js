import express from "express";
import { createProductController, getProductController, getProductsController,getProductPaginadoController,getProductFiltradoController, updateProductController, deleteProductController } from "../controller/controllerProducto.js";
import { authMiddleware, isAdmin, isUser } from "../middleware/authMiddleware.js";

const routerproductos = express.Router();



routerproductos.get("/",authMiddleware,getProductsController)
routerproductos.get("/paginado",getProductPaginadoController) // /productos/paginado
routerproductos.get("/filtrado",getProductFiltradoController) // /productos/paginado
routerproductos.get("/:id",isUser,getProductController)
routerproductos.post("/",isAdmin,createProductController)
routerproductos.put("/:id",isAdmin,updateProductController)
routerproductos.delete("/:id",isAdmin,deleteProductController)


export default routerproductos;