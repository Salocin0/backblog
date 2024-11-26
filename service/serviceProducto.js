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

export const getProductsFiltrado = async (offset,limit,page,nombre,precioMax,precioMin,sortby,order) => {
    //const productos = await Producto.find()
   
   
    const filters = {ishabilitado:true}
    if(nombre){
        filters.nombre = {$regex: nombre, $options: "i"}
    }
    if(precioMax|| precioMin){
        filters.precio = {}
        if(precioMax){
            filters.precio.$lte = precioMax
        }
        if(precioMin){
            filters.precio.$gte = precioMin
        }
    }
    console.log("filtros:",filters)

    const sortOptions = {}
    if(sortby){
        sortOptions[sortby] = order === "desc" ? -1 : 1
    }
    console.log("ordenamiento:",sortOptions)
    const productos = await Producto.find(filters).sort(sortOptions).skip(offset).limit(limit)
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