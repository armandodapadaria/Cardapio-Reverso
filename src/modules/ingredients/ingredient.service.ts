import { Ingredient, CreateIngredientDTO } from './ingredient.model';
import { randomUUID } from 'crypto';

class IngredientService {
  private ingredients: Ingredient[] = [];

  public create(data: CreateIngredientDTO): Ingredient {
    const ingredient: Ingredient = {
      id: randomUUID(),
      ...data,
    };
    this.ingredients.push(ingredient);
    return ingredient;
  }

  public getAll(): Ingredient[] {
    return this.ingredients;
  }

  public findByName(name: string): Ingredient | undefined {
    return this.ingredients.find(
      (ing) => ing.name.toLowerCase() === name.toLowerCase()
    );
  }

  public remove(id: string): boolean {
    const index = this.ingredients.findIndex((ing) => ing.id === id);
    if (index === -1) return false;
    this.ingredients.splice(index, 1);
    return true;
  }
}

export const ingredientService = new IngredientService();