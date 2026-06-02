"use client";
import { useState, useCallback } from "react";
import { useStore } from "@/lib/store";
import { searchFood, scaledNutrition } from "@/lib/nutrition";
import { ProgressBar, Alert, Spinner, Badge } from "@/components/ui";
import { Activity, Search, Plus, Trash2, Barcode } from "lucide-react";
import type { FoodItem, MealEntry } from "@/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const MEAL_LABELS: Record<MealEntry["meal"], string> = {
  breakfast: "Café da manhã",
  lunch:     "Almoço",
  snack:     "Lanche",
  dinner:    "Jantar",
};

const SOURCE_COLORS: Record<FoodItem["source"], string> = {
  TACO:          "bg-green-100 text-green-700",
  OpenFoodFacts: "bg-blue-100 text-blue-700",
  USDA:          "bg-amber-100 text-amber-700",
  manual:        "bg-gray-100 text-gray-600",
};

export default function CarboPage() {
  const { mealEntries, addMealEntry, removeMealEntry, todayCarbs, profile } = useStore();
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [portion, setPortion]   = useState("100");
  const [meal, setMeal]         = useState<MealEntry["meal"]>("lunch");

  const today     = format(new Date(), "yyyy-MM-dd");
  const todayList = mealEntries.filter(e => e.date === today);
  const totalCarbs  = Math.round(todayCarbs());
  const limitCarbs  = profile.carb_limit_g;
  const pct         = Math.round((totalCarbs / limitCarbs) * 100);
  const overLimit   = totalCarbs > limitCarbs;

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    const res = await searchFood(query);
    setResults(res);
    setLoading(false);
  }, [query]);

  function handleAdd() {
    if (!selected) return;
    const g = parseFloat(portion) || 100;
    const n = scaledNutrition(selected, g);
    addMealEntry({
      foodId: selected.id,
      foodName: selected.name,
      portionG: g,
      carbs_g: n.carbs_g,
      calories: n.calories,
      water_ml: n.water_ml,
      meal,
      date: today,
    });
    setSelected(null);
    setResults([]);
    setQuery("");
    setPortion("100");
  }

  const groupedByMeal = (Object.keys(MEAL_LABELS) as MealEntry["meal"][]).map(m => ({
    meal: m,
    label: MEAL_LABELS[m],
    entries: todayList.filter(e => e.meal === m),
  })).filter(g => g.entries.length > 0);

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="font-syne font-extrabold text-3xl text-red-800">🩺 CarboControl</h1>
        <p className="text-gray-500 mt-1">Controle sua ingestão de carboidratos.</p>
      </div>

      {/* Daily summary */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-syne font-bold text-lg text-red-800">Carboidratos hoje</h2>
          <span className={`font-syne font-bold text-2xl ${overLimit ? "text-red-600" : "text-red-700"}`}>
            {totalCarbs}g <span className="text-sm font-normal text-gray-400">/ {limitCarbs}g</span>
          </span>
        </div>
        <ProgressBar value={totalCarbs} max={limitCarbs} color={overLimit ? "bg-red-500" : "bg-red-400"}/>
        {overLimit && (
          <Alert message={`Atenção: você ultrapassou o limite diário de carboidratos em ${totalCarbs - limitCarbs}g.`} type="warning"/>
        )}
        {pct >= 80 && !overLimit && (
          <Alert message={`Você já consumiu ${pct}% do limite diário. Atenção nas próximas refeições.`} type="info"/>
        )}
      </div>

      {/* Search */}
      <div className="card space-y-4">
        <h2 className="font-syne font-bold text-lg text-red-800">Adicionar alimento</h2>

        {/* Meal selector */}
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(MEAL_LABELS) as MealEntry["meal"][]).map(m => (
            <button key={m}
              onClick={() => setMeal(m)}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${meal === m ? "bg-red-100 text-red-700 border border-red-200" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
              {MEAL_LABELS[m]}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="flex gap-2">
          <input
            className="input flex-1"
            placeholder="Buscar alimento (ex: arroz, banana, pão...)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
          />
          <button className="btn-primary bg-red-700 hover:bg-red-800 flex items-center gap-1" onClick={handleSearch}>
            {loading ? <Spinner size={16}/> : <Search size={16}/>}
            Buscar
          </button>
        </div>
        <p className="text-xs text-gray-400">Busca na TACO (alimentos brasileiros) e Open Food Facts (industrializados)</p>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {results.map(food => (
              <button key={food.id}
                onClick={() => setSelected(food)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${selected?.id === food.id ? "border-red-400 bg-red-50" : "border-gray-100 hover:border-red-200 hover:bg-red-50/40"}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800">{food.name}</span>
                  <Badge label={food.source} color={SOURCE_COLORS[food.source]}/>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {food.carbs_g}g carb · {food.calories} kcal · porção {food.portion_g}g
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Portion & add */}
        {selected && (
          <div className="bg-red-50 rounded-xl p-4 space-y-3">
            <p className="text-sm font-semibold text-red-800">{selected.name}</p>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Porção (g)</label>
                <input className="input" type="number" value={portion} onChange={e => setPortion(e.target.value)}/>
              </div>
              <div className="text-sm text-gray-600">
                <div>Carb: <strong className="text-red-700">{scaledNutrition(selected, parseFloat(portion)||100).carbs_g}g</strong></div>
                <div>Kcal: <strong>{scaledNutrition(selected, parseFloat(portion)||100).calories}</strong></div>
              </div>
              <button className="btn-primary bg-red-700 hover:bg-red-800 flex items-center gap-1" onClick={handleAdd}>
                <Plus size={16}/> Adicionar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Today's log */}
      {groupedByMeal.length > 0 && (
        <div className="card">
          <h2 className="font-syne font-bold text-lg text-red-800 mb-4">Refeições de hoje</h2>
          <div className="space-y-4">
            {groupedByMeal.map(({ meal: m, label, entries }) => (
              <div key={m}>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{label}</h3>
                <div className="space-y-2">
                  {entries.map(e => (
                    <div key={e.id} className="flex items-center justify-between bg-red-50 rounded-xl px-4 py-2">
                      <div>
                        <p className="text-sm font-medium text-red-800">{e.foodName}</p>
                        <p className="text-xs text-gray-400">{e.portionG}g · {e.calories} kcal</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-red-700">{e.carbs_g}g</span>
                        <button onClick={() => removeMealEntry(e.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 size={14}/>
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="text-right text-xs text-gray-400">
                    Total {label}: <strong>{Math.round(entries.reduce((s,e)=>s+e.carbs_g,0))}g</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
