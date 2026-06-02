"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { ProgressRing, ProgressBar, Alert } from "@/components/ui";
import { Droplets, Plus, Trash2, Award } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const QUICK_ML = [150, 200, 250, 300, 500];

export default function HidrataPage() {
  const {
    hydrationEntries, addHydration, removeHydration,
    todayHydration, waterGoal, checkStreak, streakDays, badges,
    todayWaterFromFood,
  } = useStore();

  const [custom, setCustom] = useState("");

  const today = format(new Date(), "yyyy-MM-dd");
  const todayEntries = hydrationEntries.filter(e => e.date === today).reverse();
  const totalML  = todayHydration();
  const goalML   = waterGoal();
  const foodML   = todayWaterFromFood();
  const effectiveTotal = totalML + foodML;
  const pct      = Math.min(Math.round((effectiveTotal / goalML) * 100), 100);

  function handleAdd(ml: number) {
    addHydration(ml);
    checkStreak();
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="font-syne font-extrabold text-3xl text-blue-800">💧 Hidrata+</h1>
        <p className="text-gray-500 mt-1">Acompanhe sua hidratação diária.</p>
      </div>

      {/* Progress */}
      <div className="card flex flex-col md:flex-row items-center gap-8">
        <ProgressRing pct={pct} size={140} stroke={12} color="#185fa5" label="do objetivo" />
        <div className="flex-1 space-y-3 w-full">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Ingerido: <strong className="text-blue-700">{effectiveTotal}ml</strong></span>
            <span>Meta: <strong>{goalML}ml</strong></span>
          </div>
          <ProgressBar value={effectiveTotal} max={goalML} color="bg-blue-500"/>
          {foodML > 0 && (
            <p className="text-xs text-blue-500">
              Inclui <strong>{foodML}ml</strong> de água dos alimentos registrados
            </p>
          )}
          {pct >= 100 && (
            <Alert message="🎉 Meta atingida! Parabéns pela hidratação de hoje." type="success"/>
          )}
          {pct >= 80 && pct < 100 && (
            <Alert message={`Faltam apenas ${goalML - effectiveTotal}ml para atingir a meta!`} type="info"/>
          )}
        </div>
      </div>

      {/* Quick add */}
      <div className="card">
        <h2 className="font-syne font-bold text-lg text-blue-800 mb-4">Registrar consumo</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {QUICK_ML.map(ml => (
            <button key={ml} onClick={() => handleAdd(ml)} className="btn-ghost text-blue-700 border-blue-200 hover:bg-blue-50">
              +{ml}ml
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="number" placeholder="Outro valor (ml)"
            className="input" value={custom}
            onChange={e => setCustom(e.target.value)}
          />
          <button
            className="btn-primary bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
            onClick={() => { if (Number(custom) > 0) { handleAdd(Number(custom)); setCustom(""); } }}
          >
            <Plus size={16}/> Adicionar
          </button>
        </div>
      </div>

      {/* History */}
      {todayEntries.length > 0 && (
        <div className="card">
          <h2 className="font-syne font-bold text-lg text-blue-800 mb-4">Registros de hoje</h2>
          <div className="space-y-2">
            {todayEntries.map(e => (
              <div key={e.id} className="flex items-center justify-between bg-blue-50 rounded-xl px-4 py-2">
                <div className="flex items-center gap-2">
                  <Droplets size={16} className="text-blue-500"/>
                  <span className="text-sm font-medium text-blue-800">{e.amount_ml}ml</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">
                    {format(new Date(e.time), "HH:mm", { locale: ptBR })}
                  </span>
                  <button onClick={() => removeHydration(e.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={14}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Streak */}
      {streakDays > 0 && (
        <div className="card flex items-center gap-4">
          <Award size={32} className="text-amber-500"/>
          <div>
            <p className="font-syne font-bold text-amber-700">{streakDays} dias seguidos!</p>
            <p className="text-sm text-gray-500">Continue assim para ganhar medalhas.</p>
          </div>
          <div className="ml-auto flex gap-2">
            {badges.includes("7dias")  && <span className="text-2xl" title="7 dias">🏅</span>}
            {badges.includes("30dias") && <span className="text-2xl" title="30 dias">🏆</span>}
          </div>
        </div>
      )}
    </div>
  );
}
