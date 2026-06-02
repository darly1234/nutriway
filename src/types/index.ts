// ── Food / Nutrition ────────────────────────────────────────
export interface FoodItem {
  id: string;
  name: string;
  barcode?: string;
  category: string;
  portion_g: number;
  calories: number;
  carbs_g: number;
  protein_g: number;
  fat_g: number;
  fiber_g: number;
  water_pct: number;
  sodium_mg: number;
  source: "TACO" | "OpenFoodFacts" | "USDA" | "manual";
  confidence: 1 | 2 | 3 | 4 | 5;
}

export interface MealEntry {
  id: string;
  foodId: string;
  foodName: string;
  portionG: number;
  carbs_g: number;
  calories: number;
  water_ml: number;
  meal: "breakfast" | "lunch" | "snack" | "dinner";
  date: string; // ISO date
}

// ── Hydration ────────────────────────────────────────────────
export interface HydrationEntry {
  id: string;
  amount_ml: number;
  time: string;
  date: string;
}

// ── Body Metrics ─────────────────────────────────────────────
export interface BodyMetric {
  id: string;
  date: string;
  weight_kg: number;
  height_cm: number;
  waist_cm?: number;
  bmi: number;
  bmi_category: string;
}

// ── Meal Plan (Cardápio) ─────────────────────────────────────
export interface MealPlan {
  id: string;
  date: string;
  budget_brl: number;
  meals: PlannedMeal[];
  total_cost: number;
  total_calories: number;
  total_carbs_g: number;
}

export interface PlannedMeal {
  meal: "breakfast" | "lunch" | "snack" | "dinner";
  items: { name: string; portion: string; cost_brl: number; carbs_g: number; calories: number }[];
}

// ── User Profile ─────────────────────────────────────────────
export interface UserProfile {
  name: string;
  weight_kg: number;
  height_cm: number;
  age: number;
  sex: "M" | "F";
  activity: "sedentary" | "light" | "moderate" | "active";
  goal: "lose" | "maintain" | "gain";
  daily_budget_brl: number;
  carb_limit_g: number;
  dietary_restrictions: string[];
  diabetes_type?: "type1" | "type2" | "pre";
}

// ── Dashboard ────────────────────────────────────────────────
export interface DashboardSummary {
  hydration_pct: number;
  hydration_ml: number;
  hydration_goal_ml: number;
  carbs_g: number;
  carbs_goal_g: number;
  weight_kg: number;
  weight_goal_kg: number;
  calories: number;
  calories_goal: number;
  cardapio_cost_brl: number;
  cardapio_budget_brl: number;
}
