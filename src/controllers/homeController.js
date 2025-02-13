import { Router } from "express";
import recipesService from "../services/recipesService.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    const latestRecipes = await recipesService.getLastThree();
    
    res.render('home', { recipes: latestRecipes });
});

export default homeController;