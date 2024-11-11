//creamos el schema
import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true,default:100 },
    ishabilitado: { type: Boolean, required: true },
});
//creamos el modelo
const Producto = mongoose.model("Producto", productoSchema);
export default Producto