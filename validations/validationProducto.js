import { body,param, query } from "express-validator";
export const validationBodyProducto = [
  body("nombre")
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage("El nombre debe tener entre 1 y 100 caracteres"),
  body("precio").isNumeric().withMessage("El precio debe ser un número"),
];

export const validationIdProducto = [
  param("id").isString().withMessage("el id debe ser una cadena").isUUID().withMessage("el id debe tener el formato UUID"),
];

export const validationQueryProducto = [
    query("limit").optional().isInt({min:1}).withMessage("El limit debe ser un número entero mayor a 1"),
    query("page").optional().isInt({min:1}).withMessage("El limit debe ser un número entero mayor a 1"),
    query("nombre").optional().isString().withMessage("El nombre debe ser una cadena"),
    query("precioMax").optional().isFloat({min:0}).withMessage("El precioMax debe ser un número mayor a 0"),
    query("precioMin").optional().isFloat({min:0}).withMessage("El precioMin debe ser un número mayor a 0"),
    query("sortby").optional().isIn(["nombre", "precio","id"]).withMessage("El sortby debe ser 'nombre', 'precio' o 'id'"),
    query("order").optional().isIn(["asc", "desc"]).withMessage("El order debe ser 'asc' o 'desc'"),
]