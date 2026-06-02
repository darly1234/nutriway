import type { FoodItem } from "@/types";

// ── TACO data (subset of ~60 most common Brazilian foods) ────
// Full TACO table: https://www.unicamp.br/nepa/taco/
export const TACO_FOODS: FoodItem[] = [
  { id:"taco-001", name:"Arroz branco cozido",       category:"grãos",      portion_g:100, calories:128, carbs_g:28.1, protein_g:2.5, fat_g:0.2, fiber_g:1.6, water_pct:68.0, sodium_mg:1,  source:"TACO", confidence:5 },
  { id:"taco-002", name:"Feijão carioca cozido",     category:"leguminosas",portion_g:100, calories:76,  carbs_g:13.6, protein_g:4.8, fat_g:0.5, fiber_g:8.5, water_pct:71.0, sodium_mg:2,  source:"TACO", confidence:5 },
  { id:"taco-003", name:"Pão francês",               category:"pães",       portion_g:50,  calories:134, carbs_g:27.0, protein_g:4.3, fat_g:0.8, fiber_g:1.4, water_pct:32.0, sodium_mg:280,source:"TACO", confidence:5 },
  { id:"taco-004", name:"Banana prata",              category:"frutas",     portion_g:100, calories:98,  carbs_g:26.0, protein_g:1.3, fat_g:0.1, fiber_g:2.0, water_pct:72.0, sodium_mg:2,  source:"TACO", confidence:5 },
  { id:"taco-005", name:"Maçã com casca",            category:"frutas",     portion_g:100, calories:56,  carbs_g:15.2, protein_g:0.3, fat_g:0.1, fiber_g:2.0, water_pct:84.0, sodium_mg:1,  source:"TACO", confidence:5 },
  { id:"taco-006", name:"Frango grelhado (peito)",   category:"carnes",     portion_g:100, calories:163, carbs_g:0.0,  protein_g:31.5,fat_g:3.6, fiber_g:0.0, water_pct:65.0, sodium_mg:70, source:"TACO", confidence:5 },
  { id:"taco-007", name:"Ovo inteiro cozido",        category:"ovos",       portion_g:50,  calories:77,  carbs_g:0.6,  protein_g:6.3, fat_g:5.3, fiber_g:0.0, water_pct:74.0, sodium_mg:62, source:"TACO", confidence:5 },
  { id:"taco-008", name:"Leite integral",            category:"laticínios", portion_g:200, calories:121, carbs_g:9.6,  protein_g:6.6, fat_g:6.4, fiber_g:0.0, water_pct:88.0, sodium_mg:100,source:"TACO", confidence:5 },
  { id:"taco-009", name:"Batata cozida",             category:"tubérculos", portion_g:100, calories:86,  carbs_g:19.3, protein_g:1.9, fat_g:0.1, fiber_g:1.8, water_pct:77.0, sodium_mg:6,  source:"TACO", confidence:5 },
  { id:"taco-010", name:"Mandioca cozida",           category:"tubérculos", portion_g:100, calories:125, carbs_g:30.1, protein_g:0.6, fat_g:0.3, fiber_g:1.9, water_pct:63.0, sodium_mg:2,  source:"TACO", confidence:5 },
  { id:"taco-011", name:"Alface",                   category:"hortaliças", portion_g:50,  calories:9,   carbs_g:1.6,  protein_g:0.7, fat_g:0.1, fiber_g:0.7, water_pct:95.0, sodium_mg:10, source:"TACO", confidence:5 },
  { id:"taco-012", name:"Tomate",                   category:"hortaliças", portion_g:100, calories:17,  carbs_g:3.8,  protein_g:0.8, fat_g:0.1, fiber_g:1.2, water_pct:94.0, sodium_mg:5,  source:"TACO", confidence:5 },
  { id:"taco-013", name:"Carne bovina (patinho)",    category:"carnes",     portion_g:100, calories:219, carbs_g:0.0,  protein_g:28.6,fat_g:11.4,fiber_g:0.0, water_pct:63.0, sodium_mg:70, source:"TACO", confidence:5 },
  { id:"taco-014", name:"Laranja pera",              category:"frutas",     portion_g:130, calories:57,  carbs_g:15.5, protein_g:0.9, fat_g:0.1, fiber_g:1.8, water_pct:87.0, sodium_mg:1,  source:"TACO", confidence:5 },
  { id:"taco-015", name:"Aveia em flocos",           category:"cereais",    portion_g:40,  calories:149, carbs_g:27.0, protein_g:5.1, fat_g:2.6, fiber_g:4.4, water_pct:8.0,  sodium_mg:2,  source:"TACO", confidence:5 },
  { id:"taco-016", name:"Iogurte natural integral",  category:"laticínios", portion_g:170, calories:97,  carbs_g:6.6,  protein_g:5.3, fat_g:5.8, fiber_g:0.0, water_pct:86.0, sodium_mg:75, source:"TACO", confidence:5 },
  { id:"taco-017", name:"Macarrão cozido",           category:"massas",     portion_g:100, calories:156, carbs_g:32.9, protein_g:5.0, fat_g:0.6, fiber_g:1.5, water_pct:62.0, sodium_mg:2,  source:"TACO", confidence:5 },
  { id:"taco-018", name:"Queijo minas frescal",      category:"laticínios", portion_g:30,  calories:64,  carbs_g:0.5,  protein_g:5.1, fat_g:4.4, fiber_g:0.0, water_pct:73.0, sodium_mg:110,source:"TACO", confidence:5 },
  { id:"taco-019", name:"Mamão papaia",              category:"frutas",     portion_g:100, calories:40,  carbs_g:10.4, protein_g:0.5, fat_g:0.1, fiber_g:1.8, water_pct:89.0, sodium_mg:3,  source:"TACO", confidence:5 },
  { id:"taco-020", name:"Sopa de legumes caseira",   category:"sopas",      portion_g:250, calories:75,  carbs_g:10.5, protein_g:3.2, fat_g:1.5, fiber_g:2.2, water_pct:91.0, sodium_mg:350,source:"TACO", confidence:5 },
  { id:"taco-021", name:"Cuscuz de milho",           category:"cereais",    portion_g:100, calories:188, carbs_g:41.0, protein_g:3.8, fat_g:0.8, fiber_g:2.8, water_pct:48.0, sodium_mg:5,  source:"TACO", confidence:5 },
  { id:"taco-022", name:"Tapioca (beiju)",           category:"cereais",    portion_g:50,  calories:80,  carbs_g:19.8, protein_g:0.2, fat_g:0.1, fiber_g:0.6, water_pct:48.0, sodium_mg:1,  source:"TACO", confidence:5 },
  { id:"taco-023", name:"Abacaxi",                  category:"frutas",     portion_g:100, calories:48,  carbs_g:12.3, protein_g:0.9, fat_g:0.1, fiber_g:1.0, water_pct:86.0, sodium_mg:1,  source:"TACO", confidence:5 },
  { id:"taco-024", name:"Cenoura crua",              category:"hortaliças", portion_g:100, calories:34,  carbs_g:7.7,  protein_g:1.3, fat_g:0.2, fiber_g:3.2, water_pct:91.0, sodium_mg:77, source:"TACO", confidence:5 },
  { id:"taco-025", name:"Lentilha cozida",           category:"leguminosas",portion_g:100, calories:93,  carbs_g:16.3, protein_g:7.1, fat_g:0.6, fiber_g:7.9, water_pct:72.0, sodium_mg:2,  source:"TACO", confidence:5 },
];

// ── Open Food Facts API ───────────────────────────────────────
// Docs: https://world.openfoodfacts.org/data
const OFF_BASE = "https://world.openfoodfacts.org";

export async function searchOpenFoodFacts(query: string): Promise<FoodItem[]> {
  try {
    const url = `${OFF_BASE}/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=10&lc=pt&cc=br`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.products || [])
      .filter((p: Record<string, unknown>) => p.nutriments)
      .map((p: Record<string, unknown>) => offToFoodItem(p));
  } catch {
    return [];
  }
}

export async function getByBarcode(barcode: string): Promise<FoodItem | null> {
  try {
    const res = await fetch(`${OFF_BASE}/api/v0/product/${barcode}.json`, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== 1) return null;
    return offToFoodItem(data.product);
  } catch {
    return null;
  }
}

function offToFoodItem(p: Record<string, unknown>): FoodItem {
  const n = (p.nutriments as Record<string, unknown>) || {};
  const num = (k: string) => parseFloat(String(n[k] ?? "0")) || 0;
  return {
    id: `off-${p.id || p.code || Math.random()}`,
    name: String(p.product_name_pt || p.product_name || p.generic_name || "Produto"),
    barcode: String(p.code || p.id || ""),
    category: String((p.categories_tags as string[] | undefined)?.[0] || "industrializado"),
    portion_g: num("serving_size") || 100,
    calories: num("energy-kcal_100g") || num("energy_100g") / 4.18,
    carbs_g: num("carbohydrates_100g"),
    protein_g: num("proteins_100g"),
    fat_g: num("fat_100g"),
    fiber_g: num("fiber_100g"),
    water_pct: num("water_100g"),
    sodium_mg: num("sodium_100g") * 1000,
    source: "OpenFoodFacts",
    confidence: 3,
  };
}

// ── Unified search (TACO first, then OFF) ────────────────────
export async function searchFood(query: string): Promise<FoodItem[]> {
  const q = query.toLowerCase().trim();
  const tacoResults = TACO_FOODS.filter(f =>
    f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)
  );
  if (tacoResults.length >= 5) return tacoResults;
  const offResults = await searchOpenFoodFacts(query);
  return [...tacoResults, ...offResults].slice(0, 15);
}

// ── Nutrition helpers ─────────────────────────────────────────
export function scaledNutrition(food: FoodItem, portionG: number) {
  const factor = portionG / food.portion_g;
  return {
    calories: Math.round(food.calories * factor),
    carbs_g:  Math.round(food.carbs_g  * factor * 10) / 10,
    protein_g:Math.round(food.protein_g* factor * 10) / 10,
    fat_g:    Math.round(food.fat_g    * factor * 10) / 10,
    water_ml: Math.round((food.water_pct / 100) * portionG),
  };
}

export function calcBMI(weight_kg: number, height_cm: number) {
  const h = height_cm / 100;
  const bmi = weight_kg / (h * h);
  let category = "";
  if (bmi < 18.5) category = "Abaixo do peso";
  else if (bmi < 25) category = "Peso normal";
  else if (bmi < 30) category = "Sobrepeso";
  else category = "Obesidade";
  return { bmi: Math.round(bmi * 10) / 10, category };
}

export function calcWaterGoal(weight_kg: number, activity: string): number {
  const base = weight_kg * 35;
  const bonus = activity === "active" ? 500 : activity === "moderate" ? 300 : 0;
  return Math.round(base + bonus);
}
