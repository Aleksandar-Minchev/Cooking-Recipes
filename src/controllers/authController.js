import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;
    try{
        await authService.register(userData);

    } catch (err){
        console.error(err.message);              
    }

    res.redirect('/');
})

export default authController;