

import { log } from "node:console";
import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./config/connectDB";
import userRoute from "./routes/userRoutes";
import cors from 'cors'
const app=express()
dotenv.config()

connectDB()
const port=process.env.PORT


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))



app.use('/api',userRoute)

app.listen(port,()=>{
    console.log(`Server is running..... on port ${port}`);
    
})