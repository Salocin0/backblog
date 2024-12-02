import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    console.log(token)
    if (!token) {
        return res.status(401).json({ status: "error", message: "token no encontrado", data: {} });
    }
    jwt.verify(token, process.env.JWT_ACCESS || "cualquierclave", (err, user) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ status: "error", message: "token no valido", data: {} });
        }
        req.user = user;
        next();
    })
}
