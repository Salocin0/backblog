import jwt from "jsonwebtoken";
const JWT_ACCESS = process.env.JWT_ACCESS
const JWT_REFRESH = process.env.JWT_REFRESH
const JWT_ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES
const JWT_REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES

export const generarAccessToken=payload =>{
    const expiraen = JWT_ACCESS_EXPIRES || 900
    return jwt.sign(payload,JWT_ACCESS || "cualquier clave",{expiresIn:expiraen})
}

export const generarRefreshToken=payload =>{
    const expiraen = JWT_REFRESH_EXPIRES || 2592000
    return jwt.sign(payload,JWT_REFRESH || "cualquier clave",{expiresIn:expiraen})
}