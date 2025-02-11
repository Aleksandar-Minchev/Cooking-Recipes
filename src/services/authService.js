import User from "../models/User.js";


export default {
    async register(userData){

        if (userData.password !== userData.rePassword){
            throw new Error ('Passwords mismatch');
        };

        return User.create(userData) 
    }
}