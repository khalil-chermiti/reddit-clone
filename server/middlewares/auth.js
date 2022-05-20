import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

export function jwtAuth(req, res, next) {
  // get bearer from header if exists
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer")) return res.status(401);

  const token = authHeader.split(" ")[1];

  // verify token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403); // invalid token
    req.userId = decoded.id;
    next();
  });
}
