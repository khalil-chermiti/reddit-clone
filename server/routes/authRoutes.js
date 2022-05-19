import express from "express";
const AuthRouter = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";

AuthRouter.post("/register", registerUser);
AuthRouter.route("/login").post(loginUser);
AuthRouter.route("/logout").post(logoutUser);
AuthRouter.route("/profile").post(logoutUser);


export default AuthRouter;
