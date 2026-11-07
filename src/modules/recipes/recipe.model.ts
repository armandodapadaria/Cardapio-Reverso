export type RecipeCategory = 'doce' | 'salgada' | 'agridoce';
export type RecipeGoal = 'ganho_massa' | 'emagrecimento' | 'saboroso';

export interface RecipeIngredient {
  ingredientName: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  category: RecipeCategory;
  goal: RecipeGoal;
  ingredients: RecipeIngredient[];
  instructions: string[];
  // Macros totais da receita (calculados posteriormente)
  totalMacros?: {
    kcal: number;
    carbs: number;
    protein: number;
    fat: number;
  };
}

export interface CreateRecipeDTO {
  title: string;
  category: RecipeCategory;
  goal: RecipeGoal;
  ingredients: RecipeIngredient[];
  instructions: string[];
}