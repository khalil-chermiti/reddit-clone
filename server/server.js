import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import { credentials, corsOptions } from "./utils/corsConfig.js";
import postsRouter from "./routes/postsRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./db/connect.js";

const app = express();

const PORT = process.env.PORT || 5000;

// allow access credentials before CORS check
app.use(credentials);
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/user", userRouter);

// handles any errors
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(400).json({ error: "bad request" });
});

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
