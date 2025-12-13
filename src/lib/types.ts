// Types for NutriDog Pro

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  activityLevel: 'low' | 'moderate' | 'high';
  allergies: string[];
  photo?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  status: 'available' | 'avoid' | 'toxic';
  toxicInfo?: {
    reason: string;
    alternative: string;
  };
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: RecipeIngredient[];
  instructions: string;
  calories: number;
  macros: {
    protein: number;
    fat: number;
    carbs: number;
  };
  prepTime: number;
  servings: number;
}

export interface RecipeIngredient {
  item: string;
  grams: number;
}

export interface DietRequest {
  pet: Pet;
  availableIngredients: string[];
  objectives: string[];
  mealsPerDay: number;
  budget?: number;
}

export interface DietResponse {
  metadata: {
    pet_nome: string;
    raca: string;
    peso_kg: number;
    calorias_diarias_kcal: number;
  };
  recipe: Recipe;
  shopping_list: string[];
  alerts: string[];
}

export interface HealthRecord {
  id: string;
  date: string;
  weight: number;
  energy: number;
  appetite: number;
  stoolQuality: number;
  notes?: string;
}

export interface WeeklyPlan {
  id: string;
  week: string;
  days: {
    [key: string]: {
      breakfast?: Recipe;
      lunch?: Recipe;
      dinner?: Recipe;
    };
  };
}

export interface VetContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface MarketplaceProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  link: string;
  category: string;
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}
