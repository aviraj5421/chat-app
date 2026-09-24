import express from 'express';
import {signup,login,logout,updateProfile} from '../controllers/auth.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js';
import {arcjetProtection} from '../middleware/arcjet.middleware.js';

const router=express.Router();


router.use(arcjetProtection);

router.post('/signup',signup);
router.get('/check',arcjetProtection,(req,res)=>{
    res.status(200).json({
        message:"Arcjet protection is working"
    })
})



router.post('/login',arcjetProtection,login);

router.post('/logout',logout);

router.put('/update-profile',protectRoute,updateProfile);
router.get('/check',protectRoute, (req,res)=>{
    res.status(200).json({
        message:"User is authenticated",
        user:req.user
    })
});




export default router;