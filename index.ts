import express from "express";
import { createServer } from "http";
import { connectDb } from "./utils/DB_Connection";
import * as dotenv from 'dotenv'
import { carRouter } from "./Router/Car_Routes";
import cors from 'cors'
import { userRouter } from "./Router/User_Routes";
import { authRouter } from "./Router/Auth_Routes";
import {categoryRouter} from './Router/Categories_Routes'
dotenv.config()

let app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

connectDb(process.env.MONGO_URI)

app.use(cors())

// routes
app.use('/api/cars', carRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/category', categoryRouter)

export const httpServer = createServer(app);
httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});









