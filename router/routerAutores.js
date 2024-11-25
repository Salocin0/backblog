import express from "express"
import { getAutorController, getAutoresController, createAutorController, updateAutorController, deleteAutorController } from "../controller/controllerAutor.js";
const routerAutores = express.Router();

routerAutores.get("/",getAutoresController)
routerAutores.get("/:id",getAutorController)
routerAutores.post("/",createAutorController)
routerAutores.put("/:id",updateAutorController)
routerAutores.delete("/:id",deleteAutorController)

export default routerAutores