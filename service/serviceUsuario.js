import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
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
  const accessToken = generateAccessToken({
    id: usuarioEnBD._id,
    username: usuarioEnBD.username,
  });
  const refreshToken = generateRefreshToken({
    id: usuarioEnBD._id,
    username: usuarioEnBD.username,
  });
  return { accessToken, refreshToken };
};

export const actualizarToken = async (refreshToken) => {
  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH || "cualquierclave");
  const usuario = Usuario.findById(payload.id);
  if (!usuario) {
    return -1;
  }
  const accessToken = generateAccessToken({
    id: payload.id,
    username: payload.username,
  });
  return accessToken;
};
