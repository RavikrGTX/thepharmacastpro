import express from 'express';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from './routes/post.route.js'
import cookieParser from 'cookie-parser';

configDotenv();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("mongodb is connected ");
}).catch((err)=>{
    console.log(err);
});
const app=express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log("server is running on 3000");
});
//test api

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);

app.use((err, req, res, next)=>{
    const statusCode=err.statusCode || 500;
    const message =err.message || 'internal server error';
    res.status(statusCode).json({
        succes:false,
        statusCode,
        message
    })
});