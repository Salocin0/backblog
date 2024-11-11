import crypto from "crypto"
import Producto from "../model/modelProducto.js";

export const getProduct = async (id) => { 
    const producto = await Producto.find({id:id})
    return producto;
}

export const getProducts = async () => {
    const productos2 = await Producto.find()
    return productos2;
}

export const createProduct = async ({nombre, precio}) => {
    const producto= {
        id: crypto.randomUUID(),
        nombre: nombre,
        precio: precio,
        ishabilitado: true,
    }
    const producto2 = await Producto.create(producto)
    return producto
}

export const updateProduct = async ({id,nombre,precio}) => {
    const productoActualizado = await Producto.findOneAndUpdate({id:id},{nombre:nombre,precio:precio})
    if (!productoActualizado) {
        return -1
    }else {
        return productoActualizado
    }
}

export const deleteProduct = async (id) => {
    const producto = await Producto.findOneAndUpdate({id:id},{ishabilitado:false})
    if (!producto) {
        return -1
    }else{
        return producto
    }
}