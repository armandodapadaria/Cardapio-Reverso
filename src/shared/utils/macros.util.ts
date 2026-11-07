import { RecipeIngredient } from '../../modules/recipes/recipe.model';
import { ingredientService } from '../../modules/ingredients/ingredient.service';

export function calculateTotalMacros(recipeIngredients: RecipeIngredient[]) {
  let totalKcal = 0;
  let totalCarbs = 0;
  let totalProtein = 0;
  let totalFat = 0;

  for (const item of recipeIngredients) {
    const ingredient = ingredientService.findByName(item.ingredientName);
    if (!ingredient) continue; // Ignora se o ingrediente não estiver cadastrado

    // Converte a quantidade para a mesma base (ex: se for 'un', assume 100g para simplificar)
    let factor = 0;
    if (item.unit === 'g' || item.unit === 'ml') {
      factor = item.quantity / 100;
    } else if (item.unit === 'un') {
      factor = item.quantity; // Assume que 1 unidade = 100g (ajuste conforme necessário)
    }

    totalKcal += ingredient.macrosPer100.kcal * factor;
    totalCarbs += ingredient.macrosPer100.carbs * factor;
    totalProtein += ingredient.macrosPer100.protein * factor;
    totalFat += ingredient.macrosPer100.fat * factor;
  }

  return {
    kcal: Math.round(totalKcal),
    carbs: Math.round(totalCarbs * 10) / 10,
    protein: Math.round(totalProtein * 10) / 10,
    fat: Math.round(totalFat * 10) / 10,
  };
}