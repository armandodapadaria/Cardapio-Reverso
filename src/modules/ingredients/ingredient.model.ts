export type UnitType = 'un' | 'g' | 'ml';

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: UnitType;
  
  macrosPer100: {
    kcal: number;
    carbs: number;
    protein: number;
    fat: number;
  };
}

export interface CreateIngredientDTO {
  name: string;
  quantity: number;
  unit: UnitType;
  macrosPer100: Ingredient['macrosPer100'];
}