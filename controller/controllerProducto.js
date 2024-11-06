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
    res.status(200).json({
      status: "success",
      msg: "Listado de productos",
      data: productos,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error en el servidor", data: {} });
  }
};

export const getProductController = (req, res) => {
  try {
    const id = req.params.id;
    const producto = getProduct(id);
    if (!producto) {
      res.status(400).json({ status: "error", error: "producto no encontrado", data: {} });
    } else {
      res.status(200).json({status:"success", msg:"producto encontrado", data:{producto}});
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", msg: "Error en el servidor", data: {} });
  }
};
export const createProductController = (req, res) => {
  try {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
      res.status(400).json({ status: "error", error: "Faltan datos", data: {} });
    }
    const producto = createProduct({ nombre, precio });

    res.status(201).json({status:"success", msg:"producto creado", data:{producto}});
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", msg: "Error en el servidor", data: {} });
  }
};

export const updateProductController = (req, res) => {
  try {
    const { nombre, precio } = req.body;
    const id = req.params.id;
    if (!nombre && !precio) {
      res.status(400).json({ status: "error", error: "Faltan datos", data: {} });
    }
    const producto = updateProduct({ id, nombre, precio });
    //si no viene nombre y precio devolvemos 400

    if (producto == -1) {
      res.status(400).json({ status: "error", error: "producto no encontrado", data: {} });
    } else {
      res.status(200).json({status:"success", msg:"producto actualizado", data:{producto}});
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", msg: "Error en el servidor", data: {} });
  }
};

export const deleteProductController = (req, res) => {
  try {
    const id = req.params.id;
    const producto = deleteProduct(id);
    if (!producto) {
      res.status(400).json({ status: "error", error: "producto no encontrado", data: {} });
    } else {
      res.status(200).json({status:"success", msg:"producto eliminado", data:{producto}});
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", msg: "Error en el servidor", data: {} });
  }
};
