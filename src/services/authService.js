import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export default {
    async register(userData){

        if (userData.password !== userData.rePassword){
            throw new Error ('Passwords mismatch');
        };

        const userId = await User.findOne({ email: userData.email}).select({_id: 1});
        if (userId){
            throw new Error("This username already exists");            
        }

        return User.create(userData); 
    },

    async login (email, password){
        const user = await User.findOne({email});
        if (!user){
            throw new Error('Invalid email or password!')
        }

        const isValidPass = await bcrypt.compare(password, user.password);
        if (!isValidPass){
            throw new Error('Invalid email or password!');
        }

        const payload = {
            id: user.id,
            email: user.email,
            username: user.username
        }

        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});

        return token;
    }
}