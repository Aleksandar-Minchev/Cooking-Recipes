import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import recipesService from "../services/recipesService.js";
import { getErrorMessage } from "../utils/errorUtils.js";


const recipesController = Router();

recipesController.get('/', async (req, res) => {
    try {
        const recipes = await recipesService.getAll();
        res.render('recipes/catalog', {recipes});        
    } catch (err) {
        res.render('/', {
            error: getErrorMessage(err)
        }); 
    }    
})

recipesController.get('/create', isAuth, (req, res) => {
    res.render('recipes/create');
});

recipesController.post('/create', isAuth, async (req, res) => {
    const recipeData = req.body;
    const ownerId = req.user.id;

    console.log(recipeData);    
    try {
        await recipesService.create(recipeData, ownerId);
        res.redirect('/recipes');
    } catch (err) {
        res.render('recipes/create', {
            error: getErrorMessage(err),
            recipes: recipeData
        })
    }    
});

export default recipesController;