import express from "express";
import {jwtAuth} from '../middlewares/auth.js';
import { getProfileInfo } from "../controllers/userController.js";

const userRouter = express.Router() ;


userRouter.get("/" , jwtAuth , getProfileInfo);

export default userRouter ;