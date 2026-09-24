// here we check the rate limit and also we check 
import aj from "../lib/arcjet.js";
import {isSpoofedBot} from "@arcjet/inspect";

export const arcjetProtection=async(req,res,next)=>{
    try{

        const decision=await aj.protect(req);

        if(decision.isDenied()){

            if(decision.reason.isRateLimit()){
                res.status(429).json({message:"Rate limit exceeded. Please try again later."});
            }


        } else if(decision.reason.isBot()){
            return res.status(403).json({message:"Access denied. Bot traffic is not allowed."});

        } else{
            return res.status(403).json({message:"Access denied. Unknown reason."});

        }

        if(decision.results.some(isSpoofedBot)){
            return res.status(403).json({error:"spoofed bot detected",
                message:"Access denied. Spoofed bot traffic is not allowed."});

        }


        next();
    }


    catch(err){
        console.log("Error in arcjetProtection middleware:", err);
        next();
      
    }

}

