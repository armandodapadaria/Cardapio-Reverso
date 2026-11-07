import express from 'express';
import cors from 'cors';
import { ingredientRoutes } from './modules/ingredients/ingredient.routes';
import { recipeRoutes } from './modules/recipes/recipe.routes';
import { errorHandler } from './shared/middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/ingredients', ingredientRoutes);
app.use('/recipes', recipeRoutes);

app.use(errorHandler);

export { app };