import express from "express";
import { createProductController, getProductController, getProductsController, updateProductController, deleteProductController } from "../controller/controllerProducto.js";
//importamos la funcion para cada caso, esa funcion va a estar el controller

const routerproductos = express.Router();

routerproductos.get("/",getProductsController)
routerproductos.get("/:id",getProductController)
routerproductos.post("/",createProductController)
routerproductos.put("/:id",updateProductController)
routerproductos.delete("/:id",deleteProductController)

export default routerproductos;