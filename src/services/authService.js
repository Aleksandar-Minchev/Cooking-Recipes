import User from "../models/User.js";


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
    }
}