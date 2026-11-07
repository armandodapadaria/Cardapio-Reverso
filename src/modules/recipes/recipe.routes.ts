import { Router } from 'express';
import { RecipeController } from './recipe.controller';

const recipeRoutes = Router();
const controller = new RecipeController();

recipeRoutes.post('/', controller.create);
recipeRoutes.get('/available', controller.listAvailable);
recipeRoutes.get('/:id', controller.getById);

export { recipeRoutes };