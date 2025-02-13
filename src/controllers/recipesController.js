import { Router } from "express";


const recipesController = Router();

recipesController.get('/create', (req, res) => {
    res.render('recipes/create');
})

export default recipesController;