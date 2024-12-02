import {
  crearUsuario,
  loginUsuario,
  actualizarToken,
} from "../service/serviceUsuario.js";
export const crearUsuarioController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usuario = await crearUsuario(username, password);
    res.status(201).json({
      status: "success",
      msg: "usuario creado",
      data: usuario,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: "Error en el servidor",
      data: {},
    });
  }
};
export const loginUsuarioController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const {accessToken, refreshToken} = await loginUsuario(username, password);
    res.status(201).json({
      status: "success",
      msg: "login correcto",
      data: {accessToken:accessToken, refreshToken:refreshToken},
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "error",
      msg: "Error en el servidor",
      data: {},
    });
  }
};
export const generarAccessTokenController = async(req, res) => {
    try {
        const token = req.headers["refreshtoken"];
        console.log(token)
        if (token) {
          const accessToken = await actualizarToken(token);
          res.status(201).json({
            status: "success",
            msg: "token actualizado",
            data: accessToken,
          });
        }else{
            res.status(400).json({
                status: "error",
                msg: "token no encontrado",
                data: {},
              });
        } 
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Error en el servidor",
            data: {},
        })
    }
};
