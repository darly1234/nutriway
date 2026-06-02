"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  UserProfile, HydrationEntry, MealEntry, BodyMetric, MealPlan,
} from "@/types";
import { calcBMI, calcWaterGoal } from "@/lib/nutrition";
import { format, addDays } from "date-fns";

const TODAY = () => format(new Date(), "yyyy-MM-dd");

interface NutriWayStore {
  // Profile
  profile: UserProfile;
  setProfile: (p: Partial<UserProfile>) => void;

  // Hydration
  hydrationEntries: HydrationEntry[];
  addHydration: (ml: number) => void;
  removeHydration: (id: string) => void;
  todayHydration: () => number;
  waterGoal: () => number;

  // Meals (CarboControl)
  mealEntries: MealEntry[];
  addMealEntry: (e: Omit<MealEntry, "id">) => void;
  removeMealEntry: (id: string) => void;
  todayCarbs: () => number;
  todayCalories: () => number;
  todayWaterFromFood: () => number;

  // Body Metrics
  bodyMetrics: BodyMetric[];
  addBodyMetric: (weight_kg: number, height_cm: number, waist_cm?: number) => void;
  latestMetric: () => BodyMetric | null;

  // Meal Plans (Cardápio)
  mealPlans: MealPlan[];
  addMealPlan: (plan: MealPlan) => void;
  todayPlan: () => MealPlan | null;
  clearTodayPlan: () => void;

  // Gamification
  streakDays: number;
  badges: string[];
  checkStreak: () => void;
}

export const useStore = create<NutriWayStore>()(
  persist(
    (set, get) => ({
      // ── Profile ──────────────────────────────────────
      profile: {
        name: "Usuário",
        weight_kg: 70,
        height_cm: 170,
        age: 25,
        sex: "M",
        activity: "light",
        goal: "maintain",
        daily_budget_brl: 25,
        carb_limit_g: 250,
        dietary_restrictions: [],
      },
      setProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),

      // ── Hydration ─────────────────────────────────────
      hydrationEntries: [],
      addHydration: (ml) =>
        set((s) => ({
          hydrationEntries: [
            ...s.hydrationEntries,
            { id: crypto.randomUUID(), amount_ml: ml, time: new Date().toISOString(), date: TODAY() },
          ],
        })),
      removeHydration: (id) =>
        set((s) => ({ hydrationEntries: s.hydrationEntries.filter((e) => e.id !== id) })),
      todayHydration: () =>
        get().hydrationEntries
          .filter((e) => e.date === TODAY())
          .reduce((sum, e) => sum + e.amount_ml, 0),
      waterGoal: () => calcWaterGoal(get().profile.weight_kg, get().profile.activity),

      // ── Meals ─────────────────────────────────────────
      mealEntries: [],
      addMealEntry: (e) =>
        set((s) => ({ mealEntries: [...s.mealEntries, { ...e, id: crypto.randomUUID() }] })),
      removeMealEntry: (id) =>
        set((s) => ({ mealEntries: s.mealEntries.filter((e) => e.id !== id) })),
      todayCarbs: () =>
        get().mealEntries
          .filter((e) => e.date === TODAY())
          .reduce((sum, e) => sum + e.carbs_g, 0),
      todayCalories: () =>
        get().mealEntries
          .filter((e) => e.date === TODAY())
          .reduce((sum, e) => sum + e.calories, 0),
      todayWaterFromFood: () =>
        get().mealEntries
          .filter((e) => e.date === TODAY())
          .reduce((sum, e) => sum + (e.water_ml || 0), 0),

      // ── Body Metrics ──────────────────────────────────
      bodyMetrics: [],
      addBodyMetric: (weight_kg, height_cm, waist_cm) => {
        const { bmi, category } = calcBMI(weight_kg, height_cm);
        set((s) => ({
          bodyMetrics: [
            ...s.bodyMetrics,
            { id: crypto.randomUUID(), date: TODAY(), weight_kg, height_cm, waist_cm, bmi, bmi_category: category },
          ],
          profile: { ...s.profile, weight_kg, height_cm },
        }));
      },
      latestMetric: () => {
        const m = get().bodyMetrics;
        return m.length ? m[m.length - 1] : null;
      },

      // ── Meal Plans ────────────────────────────────────
      mealPlans: [],
      addMealPlan: (plan) => set((s) => ({ mealPlans: [...s.mealPlans, plan] })),
      todayPlan: () => get().mealPlans.find((p) => p.date === TODAY()) || null,
      clearTodayPlan: () => {
        const dateRange = Array.from({ length: 7 }, (_, i) =>
          format(addDays(new Date(), i), "yyyy-MM-dd")
        );
        set((s) => ({
          mealPlans: s.mealPlans.filter((p) => !dateRange.includes(p.date)),
          mealEntries: s.mealEntries.filter((e) => !(dateRange.includes(e.date) && e.foodId.startsWith("plan-"))),
        }));
      },

      // ── Gamification ──────────────────────────────────
      streakDays: 0,
      badges: [],
      checkStreak: () => {
        const { todayHydration, waterGoal, streakDays } = get();
        if (todayHydration() >= waterGoal() * 0.9) {
          const newStreak = streakDays + 1;
          const newBadges = [...get().badges];
          if (newStreak === 7 && !newBadges.includes("7dias")) newBadges.push("7dias");
          if (newStreak === 30 && !newBadges.includes("30dias")) newBadges.push("30dias");
          set({ streakDays: newStreak, badges: newBadges });
        }
      },
    }),
    { name: "nutriway-store" }
  )
);
