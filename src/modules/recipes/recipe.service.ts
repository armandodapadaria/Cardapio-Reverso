import { Recipe, CreateRecipeDTO, RecipeCategory, RecipeGoal } from './recipe.model';
import { randomUUID } from 'crypto';
import { ingredientService } from '../ingredients/ingredient.service';
import { calculateTotalMacros } from '../../shared/utils/macros.util';

class RecipeService {
  private recipes: Recipe[] = [];

  public create(data: CreateRecipeDTO): Recipe {
    const recipe: Recipe = {
      id: randomUUID(),
      ...data,
    };
    // Calcula macros no momento da criação (opcional)
    recipe.totalMacros = calculateTotalMacros(recipe.ingredients);
    this.recipes.push(recipe);
    return recipe;
  }

  public findAvailable(
    category?: RecipeCategory,
    goal?: RecipeGoal
  ): Recipe[] {
    const userIngredients = ingredientService.getAll().map((i) => i.name.toLowerCase());

    return this.recipes.filter((recipe) => {
      // 1. Filtro por categoria e objetivo
      if (category && recipe.category !== category) return false;
      if (goal && recipe.goal !== goal) return false;

      // 2. Verifica se o usuário tem todos os ingredientes da receita
      const hasAllIngredients = recipe.ingredients.every((ri) =>
        userIngredients.includes(ri.ingredientName.toLowerCase())
      );
      return hasAllIngredients;
    });
  }

  public getById(id: string): Recipe | undefined {
    return this.recipes.find((r) => r.id === id);
  }
}

export const recipeService = new RecipeService();