import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  getProductsPaginado,
  deleteProduct,
  getProductsFiltrado,
} from "../service/serviceProducto.js";
import { validationResult } from "express-validator";

export const getProductsController = async (req, res) => {
  try {
    const productos = await getProducts();
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

export const getProductPaginadoController = async (req, res) => {
  try {
    const { limit = 5, page = 1 } = req.query;
    const offset = (page - 1) * limit;
    const productos = await getProductsPaginado(offset, limit, page);
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

export const getProductFiltradoController = async (req, res) => {
  try {
    //const { limit=5 , page=1 } = req.query;

    const {
      limit = 2,
      page = 1,
      nombre,
      precioMax,
      precioMin,
      sortby,
      order,
    } = req.query; // {nombre: pepito, precio: 1000}
    const offset = (page - 1) * limit;
    const productos = await getProductsFiltrado(
      offset,
      limit,
      page,
      nombre,
      precioMax,
      precioMin,
      sortby,
      order
    );
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

export const getProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await getProduct(id);
    if (!producto) {
      res
        .status(400)
        .json({ status: "error", error: "producto no encontrado", data: {} });
    } else {
      res.status(200).json({
        status: "success",
        msg: "producto encontrado",
        data: { producto },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", msg: "Error en el servidor", data: {} });
  }
};
export const createProductController = async (req, res) => {
  try {
    const { nombre ="asas", precio } = req.body;
    const producto = await createProduct({ nombre, precio });
    res
      .status(201)
      .json({ status: "success", msg: "producto creado", data: { producto } });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ status: "error", msg: "Error en el servidor", data: {} });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    const id = req.params.id;
    if (!nombre && !precio) {
      res
        .status(400)
        .json({ status: "error", error: "Faltan datos", data: {} });
    }
    const producto = await updateProduct({ id, nombre, precio });
    //si no viene nombre y precio devolvemos 400

    if (producto == -1) {
      res
        .status(400)
        .json({ status: "error", error: "producto no encontrado", data: {} });
    } else {
      res.status(200).json({
        status: "success",
        msg: "producto actualizado",
        data: { producto },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", msg: "Error en el servidor", data: {} });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await deleteProduct(id);
    if (!producto) {
      res
        .status(400)
        .json({ status: "error", error: "producto no encontrado", data: {} });
    } else {
      res.status(200).json({
        status: "success",
        msg: "producto eliminado",
        data: { producto },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", msg: "Error en el servidor", data: {} });
  }
};
