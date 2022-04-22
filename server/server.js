import express from 'express'
import cors from 'cors' ;
const app = express();

import dotenv from 'dotenv'
dotenv.config();
const  PORT = process.env.PORT || 5000;

app.use(cors({origin : "http://localhost:3000"}));
app.use(express.json());

//routers
import postsRouter from './routes/postsRoutes.js'
//import authRouter from './routes/authRoutes.js'
//app.use('/api/v1/auth',authRouter);
app.use('/api/v1/posts',postsRouter)

import connectDB from './db/connect.js';
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI)
      app.listen(PORT, () => {
        console.log(`Server is listening on PORT ${PORT}...`)
      })
    } catch (error) {
      console.log(error)
    }
  }

start();