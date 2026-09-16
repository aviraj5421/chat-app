import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';





dotenv.config();

const app=express();

const __dirname=path.resolve();
app.use(express.json());


app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);


// production level
if(ENV.NODE_ENV=="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}






app.listen(ENV.PORT,()=>{
    console.log(`Server is running on port ${ENV.PORT}`);
    connectDB()
})
