import jwt from "jsonwebtoken";

export function verifyUser(req, res, next) {
  // Leer el token del header
  const token = req.header("x-auth-token");

  // Revisar si no hay token
  if (!token)
    return res.status(401).json({ msg: "No hay token, permiso no valido" });
  // Validar el token

  try {
    const encoded = jwt.verify(token, process.env.SECRET_WORD);
    req.user = encoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido" });
  }
}
