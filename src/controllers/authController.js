import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try{
        const token = await authService.login(email, password);
        res.cookie('auth', token, {httpOnly: true});
        res.redirect('/');
    } catch(err){
        console.error(err.message);         
    }
});

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;
    try{
        await authService.register(userData);
        res.redirect('/');

    } catch (err){
        console.error(err.message);              
    }    
})

export default authController;