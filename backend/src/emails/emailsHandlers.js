import {resendClient,sender} from '../lib/resend.js'
import {createWelcomeEmailTemplate} from '../emails/emailTemplates.js'



export const sendWelcomeEmail=async(email,name,clientURL)=>{
    const {data,error}=await resendClient.emails.send({
      from:`${sender.name}<${sender.email}>`,
        to:email,
        subject:"Welcome to Chatify", 
         html:createWelcomeEmailTemplate(name,clientURL)


    
         
});

if(error){
    console.error("error sending welcome email:",error);
    throw new Error("failed to send welcome email");
} else{
    console.log("welcome email sent sucessfully",data);
}

} ;