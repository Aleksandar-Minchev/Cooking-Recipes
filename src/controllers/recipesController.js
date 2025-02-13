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

recipesController.get('/:recipeId/details', async (req, res) => {
    const recipeId = req.params.recipeId;
    
    try {
        const recipe = await recipesService.getOne(recipeId);

        const isOwner = recipe.owner?.equals(req.user?.id);
        const isRecommended = recipe.recommendList.includes(req.user?.id);

        res.render('recipes/details', {recipe, isOwner, isRecommended});
    } catch (err) {
        res.redirect('404');
    }    
});

recipesController.get('/:recipeId/recommend', isAuth, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user.id;
    
    try {
        const recipe = await recipesService.recommend(recipeId, userId);
        res.redirect(`/recipes/${recipeId}/details`)
    } catch (err) {
        res.redirect('404');
    }
});

recipesController.get('/:recipeId/delete', isAuth, async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipe = await recipesService.getOne(recipeId);

    if (!recipe.owner?.equals(req.user?.id)){
        return res.redirect('404')
    }

    await recipesService.remove(recipeId);

    res.redirect('/recipes');
});

recipesController.get('/:recipeId/edit', isAuth, async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipe = await recipesService.getOne(recipeId);
    
    if (!recipe.owner?.equals(req.user?.id)){
        return res.redirect('404')
    }

    res.render('recipes/edit', {recipe})
});

recipesController.post('/:recipeId/edit', isAuth, async (req, res) => {
    const recipeData = req.body;
    const recipeId = req.params.recipeId;
    const recipe = await recipesService.getOne(recipeId);
    
    if (!recipe.owner?.equals(req.user?.id)){
        return res.redirect('404')
    }
    
    try {
        await recipesService.update(recipeData, recipeId); 
        res.redirect(`/recipes/${recipeId}/details`);       
    } catch (err) {
      res.render('recipes/edit', {recipe: recipeData, error: getErrorMessage(err)});  
    }
});

export default recipesController;