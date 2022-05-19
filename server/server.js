import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
const app = express();

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());

//routers
import postsRouter from "./routes/postsRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/user", userRouter);

import connectDB from "./db/connect.js";
const start = async () => {
  try {
    await connectDB("mongodb://localhost:27017/myapp");
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
