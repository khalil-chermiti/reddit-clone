import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET } = process.env;

export function jwtAuth(req, res, next) {
  const token = req.cookies?.access_token;

  const decodedToken = token ? jwt.verify(token, JWT_SECRET) : null;

  if (!decodedToken) {
    return res.clearCookie("access_token").redirect("/login");
  }

  req.userID = decodedToken.id;

  next();
}
