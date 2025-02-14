import { Router } from 'express';
import homeController from './controllers/homeController.js';
import authController from './controllers/authController.js';
import recipesController from './controllers/recipesController.js';

const routes = Router();

routes.use(homeController);
routes.use('/auth', authController);
routes.use('/recipes', recipesController);

routes.all('*', (req, res) => {
    res.render('404');
});

export default routes;