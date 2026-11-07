import { Request, Response } from 'express';
import { recipeService } from './recipe.service';
import { RecipeCategory, RecipeGoal } from './recipe.model';

export class RecipeController {
  public create(req: Request, res: Response): Response {
    const { title, category, goal, ingredients, instructions } = req.body;
    if (!title || !category || !goal || !ingredients || !instructions) {
      return res.status(400).json({ error: 'Dados incompletos.' });
    }
    const recipe = recipeService.create({
      title,
      category,
      goal,
      ingredients,
      instructions,
    });
    return res.status(201).json(recipe);
  }

  public listAvailable(req: Request, res: Response): Response {
    const { category, goal } = req.query;
    const recipes = recipeService.findAvailable(
      category as RecipeCategory,
      goal as RecipeGoal
    );
    return res.json(recipes);
  }

  public getById(req: Request, res: Response): Response {
    const recipe = recipeService.getById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Receita não encontrada.' });
    }
    return res.json(recipe);
  }
}