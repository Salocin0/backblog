import bcrypt from "bcrypt";
import {
  generarAccessToken,
  generarRefreshToken,
} from "../utils/generarTokens.js";
import jwt from "jsonwebtoken";
import { Usuario } from "../model/modelUsuario.js";

export const crearUsuario = async (username, password) => {
  const usuarioEnBD = await Usuario.findOne({ username });
  if (usuarioEnBD) {
    return -1;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const usuario = {
    username,
    password: passwordHash,
  };

  const usuariocreado = await Usuario.create(usuario);
  return usuariocreado;
};

export const loginUsuario = async (username, password) => {
  const usuarioEnBD = await Usuario.findOne({ username });
  if (!usuarioEnBD) {
    return -1;
  }
  const passwordValido = await bcrypt.compare(password, usuarioEnBD.password);
  if (!passwordValido) {
    return -1;
  }
  const accessToken = generarAccessToken({
    id: usuarioEnBD._id,
    username: usuarioEnBD.username,
  });
  const refreshToken = generarRefreshToken({
    id: usuarioEnBD._id,
    username: usuarioEnBD.username,
  });
  usuarioEnBD.refreshToken = refreshToken;
  await Usuario.findOneAndUpdate({ id: usuarioEnBD.id }, usuarioEnBD);
  return { accessToken, refreshToken };
};

export const actualizarToken = async (refreshToken) => {
  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH);
  const usuario = Usuario.findById(payload.id);
  if (!usuario) {
    return -1;
  }
  const accessToken = generarAccessToken({
    id: payload.id,
    username: payload.username,
  });
  return accessToken;
};
