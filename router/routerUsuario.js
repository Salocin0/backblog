import express from "express";
import { loginUsuarioController, crearUsuarioController, generarAccessTokenController } from "../controller/controllerUsuario.js";

const routerUsuarios = express.Router();

routerUsuarios.post("/login", loginUsuarioController);
routerUsuarios.post("/register", crearUsuarioController);
routerUsuarios.get("/token", generarAccessTokenController);

export default routerUsuarios