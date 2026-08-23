import express from 'express';
import dotenv from 'dotenv';

const router=express.Router();


router.get('/send',(req,res)=>{
    res.send("Send message page");
})

export default router;