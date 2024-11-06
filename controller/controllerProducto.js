import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../service/serviceProducto.js";

export const getProductsController = (req, res) => {
  try {
    const productos = getProducts();
    res.status(200).json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const getProductController = (req, res) => {
  try {
    const id = req.params.id;
    const producto = getProduct(id);
    if (!producto) {
      res.status(400).json({ error: "producto no encontrado" });
    } else {
      res.status(200).json(producto);
    }
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};
export const createProductController = (req, res) => {
  try {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
      res.status(400).json({ error: "Faltan datos" });
    }
    const producto = createProduct({ nombre, precio });

    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const updateProductController = (req, res) => {
  try {
    const { nombre, precio } = req.body;
    const id = req.params.id;
    if (!nombre && !precio) {
      res.status(400).json({ error: "Faltan datos" });
    }
    const producto = updateProduct({ id, nombre, precio });
    //si no viene nombre y precio devolvemos 400

    if (producto == -1) {
      res.status(400).json({ error: "producto no encontrado" });
    } else {
      res.status(200).json(producto);
    }
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const deleteProductController = (req, res) => {
    try {
        const id = req.params.id;
        const producto = deleteProduct(id);
        if (!producto) {
            res.status(400).json({ error: "producto no encontrado" });
        } else {
            res.status(200).json(producto);
        }
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};
