import crypto from "crypto"
let productos = [
    {
      id: crypto.randomUUID(),
      nombre: "producto 1",
      precio: 100,
      ishabilitado: true,
      codigo: crypto.hash("semilla", 10)
    },
    {
      id: crypto.randomUUID(),
      nombre: "producto 2",
      precio: 200,
      ishabilitado: true,
    },
    {
      id: crypto.randomUUID(),
      nombre: "producto 3",
      precio: 300,
      ishabilitado: false,
    },
    {
      id: crypto.randomUUID(),
      nombre: "producto 4",
      precio: 400,
      ishabilitado: true,
    },
  ];

export const getProduct = (id) => { 
    const producto = productos.find((producto) => producto.id == id);
    return producto;
}

export const getProducts = () => {
    return productos;
}

export const createProduct = ({nombre, precio}) => {
    const producto= {
        id: crypto.randomUUID(),
        nombre: nombre,
        precio: precio,
        ishabilitado: true,
    }
    productos.push(producto);
    return producto
    
}

export const updateProduct = ({id,nombre,precio}) => {
    const producto = this.getProduct(id)
    if (!producto) {
        return -1
    }else {
        producto.nombre = nombre;
        producto.precio = precio;
        return producto
    }
}

export const deleteProduct = (id) => {
    const producto = this.getProduct(id)
    if (!producto) {
        return -1
    }else{
        producto.ishabilitado = false;
        return producto
    }
}