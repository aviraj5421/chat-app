import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {

    const { fullName, email, password } = req.body;

    try {

        // Check required fields
        if (!fullName || !email || !password) {    
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        // Check email format
        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        // Check existing user
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );

        // Create user
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {


            // generateToken(newUser._id, res);

            const savedUser=await newUser.save();
           generateToken(savedUser._id,res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });

        } else {

            return res.status(400).json({
                message: "Invalid user data"
            });

        }

    } catch (error) {

        console.log("Error in signup:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};