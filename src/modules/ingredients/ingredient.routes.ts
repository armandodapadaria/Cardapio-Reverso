import { Router } from 'express';
import { IngredientController } from './ingredient.controller';

const ingredientRoutes = Router();
const controller = new IngredientController();

ingredientRoutes.post('/', controller.create);
ingredientRoutes.get('/', controller.list);
ingredientRoutes.delete('/:id', controller.delete);

export { ingredientRoutes };