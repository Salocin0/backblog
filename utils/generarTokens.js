import jwt from "jsonwebtoken";

const JWT_ACCESS = process.env.JWT_ACCESS || "cualquierclave"
const JWT_REFRESH = process.env.JWT_REFRESH || "cualquierclave"
const JWT_ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || 900
const JWT_REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || 2592000

export const generateAccessToken = payload => {
    const expiraEn = JWT_ACCESS_EXPIRES || 60*15;
    const token = jwt.sign(payload, JWT_ACCESS, { expiresIn: expiraEn });
    return token
}

export const generateRefreshToken = payload => {
    const expiraEn = JWT_REFRESH_EXPIRES || 60*60*24*30;
    const token = jwt.sign(payload, JWT_REFRESH, { expiresIn: expiraEn });
    return token
}