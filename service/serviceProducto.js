import crypto from "crypto"
import Producto from "../model/modelProducto.js";

export const getProduct = async (id) => { 
    const producto = await Producto.find({id:id})
    return producto;
}

export const getProducts = async () => {
    const productos = await Producto.find()
    return productos;
}

export const getProductsPaginado = async (offset,limit,page) => {
    const productos = await Producto.find().skip(offset).limit(limit)
    const totalProductos = await Producto.countDocuments()
    const resultado = {
        productos: productos,
        paginaActual: page,
        totalProductos: totalProductos,
        totalPaginas: Math.ceil(totalProductos/limit) // 5.01 PAGINAS = 6 PAGINAS
    }
    return resultado;
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