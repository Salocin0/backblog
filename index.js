import express from "express";
import cors from "cors";
import routerproductos from "./router/routerProducto.js";
import env from "dotenv";
import mongoose from "mongoose";
import routerBlogs from "./router/routerBlogs.js"
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };
import routerAutores from "./router/routerAutores.js";
import compression from "compression";
import zlib from "zlib";
import routerUsuarios from "./router/routerUsuario.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
env.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization", "x-token"],
}))
app.use(
  compression({
      brotli: {
          enabled: true,
          zlib: zlib.constants.BROTLI_PARAM_QUALITY,
      },
  })
);
/*
200 OK para éxito.
201 Created para creación exitosa.
400 Bad Request para errores en la solicitud del cliente.
404 Not Found si el recurso no se encuentra.
500 Internal Server Error para errores en el servidor
*/

//routerproductos -> 5 funciones que van a ser llamas desde aca

app.use("/productos", routerproductos)
//app.use("/user", routerproductos)
app.use("/blogs",routerBlogs)
app.use("/autores",routerAutores)
app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument))
app.use("/auth",routerUsuarios)

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Acceso permitido", user: req.user });
});


app.get("/pruebacompresion", (req, res) => {
  const productos = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    nombre: `Producto ${i + 1}`,
    descripcion: `Descripción del producto ${i + 1}`,
    precio: (Math.random() * 100).toFixed(2),
    disponible: i % 2 === 0,
  }));
  res.json(productos);
})


app.use((req, res) => {
  res.status(404).json({ error: "Error: 404" });
});


mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Conectado a la base de datos");
}).catch((error) => {
  console.log(error);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
