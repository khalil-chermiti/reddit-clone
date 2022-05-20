import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import postsRouter from "./routes/postsRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./db/connect.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*", methods: ["PATCH", "PUT", "POST", "GET"] }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/user", userRouter);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Server is listening on PORT ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
