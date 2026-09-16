import "dotenv/config";

export const ENV={
    PORT:process.env.PORT || 3000,
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET,
     NODE_ENV:process.env.NODE_ENV || "development",
    EMAIL_FROM:process.env.EMAIL_FROM,
    EMAIL_FROM_NAME:process.env.EMAIL_FROM_NAME,
    RESEND_API_KEY:process.env.RESEND_API_KEY,
    CLIENT_URL:process.env.CLIENT_URL || "http://localhost:5173/"





}



