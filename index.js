import express from "express";
import cors from "cors";
import routerproductos from "./router/routerProducto.js";
import env from "dotenv";
import mongoose from "mongoose";
import routerBlogs from "./router/routerBlogs.js"

env.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

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
