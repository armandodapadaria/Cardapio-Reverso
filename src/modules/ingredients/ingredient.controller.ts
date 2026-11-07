import { Request, Response } from 'express';
import { ingredientService } from './ingredient.service';

export class IngredientController {
  public create(req: Request, res: Response): Response {
    const { name, quantity, unit, macrosPer100 } = req.body;
    if (!name || !quantity || !unit || !macrosPer100) {
      return res.status(400).json({ error: 'Dados incompletos.' });
    }
    const ingredient = ingredientService.create({
      name,
      quantity,
      unit,
      macrosPer100,
    });
    return res.status(201).json(ingredient);
  }

  public list(_req: Request, res: Response): Response {
    const ingredients = ingredientService.getAll();
    return res.json(ingredients);
  }

  public delete(req: Request, res: Response): Response {
    const { id } = req.params;
    const deleted = ingredientService.remove(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Ingrediente não encontrado.' });
    }
    return res.status(204).send();
  }
}