"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { StatCard, ProgressBar, Alert } from "@/components/ui";
import { Scale, TrendingDown, TrendingUp, Minus, Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function bmiColor(bmi: number) {
  if (bmi < 18.5) return "text-blue-600";
  if (bmi < 25)   return "text-green-600";
  if (bmi < 30)   return "text-amber-600";
  return "text-red-600";
}

export default function NutriMetaPage() {
  const { bodyMetrics, addBodyMetric, profile, setProfile } = useStore();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState(String(profile.height_cm));
  const [waist, setWaist]   = useState("");
  const [goalW, setGoalW]   = useState("");

  const latest = bodyMetrics[bodyMetrics.length - 1];
  const prev   = bodyMetrics[bodyMetrics.length - 2];
  const diff   = latest && prev ? +(latest.weight_kg - prev.weight_kg).toFixed(1) : null;

  const chartData = bodyMetrics.slice(-12).map(m => ({
    date: m.date.slice(5),
    peso: m.weight_kg,
    imc:  m.bmi,
  }));

  function handleSave() {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h) return;
    addBodyMetric(w, h, waist ? parseFloat(waist) : undefined);
    setWeight(""); setWaist("");
    if (goalW) setProfile({ weight_kg: parseFloat(goalW) });
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="font-syne font-extrabold text-3xl text-amber-800">📊 NutriMeta</h1>
        <p className="text-gray-500 mt-1">Monitore sua composição corporal.</p>
      </div>

      {/* Current stats */}
      {latest && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Peso atual" value={latest.weight_kg} unit="kg"
            sub={diff !== null ? `${diff > 0 ? "+" : ""}${diff}kg desde último` : "Primeiro registro"}
            color="bg-amber-50" textColor="text-amber-700"
            icon={diff !== null ? (diff < 0 ? <TrendingDown size={14}/> : diff > 0 ? <TrendingUp size={14}/> : <Minus size={14}/>) : <Scale size={14}/>}
          />
          <StatCard label="IMC" value={latest.bmi}
            sub={latest.bmi_category}
            color="bg-green-50" textColor={bmiColor(latest.bmi)}
            icon={<Scale size={14}/>}
          />
          <StatCard label="Altura" value={latest.height_cm} unit="cm"
            color="bg-gray-50" textColor="text-gray-700" icon={<Minus size={14}/>}/>
          {latest.waist_cm && (
            <StatCard label="Cintura" value={latest.waist_cm} unit="cm"
              color="bg-amber-50" textColor="text-amber-600" icon={<Scale size={14}/>}/>
          )}
        </div>
      )}

      {/* BMI gauge */}
      {latest && (
        <div className="card">
          <h2 className="font-syne font-bold text-lg text-amber-800 mb-3">Classificação do IMC</h2>
          <div className="space-y-2">
            {[
              { label:"Abaixo do peso", range:"< 18,5", color:"bg-blue-400",  active: latest.bmi < 18.5 },
              { label:"Peso normal",    range:"18,5–24,9",color:"bg-green-400",active: latest.bmi >= 18.5 && latest.bmi < 25 },
              { label:"Sobrepeso",      range:"25–29,9", color:"bg-amber-400", active: latest.bmi >= 25   && latest.bmi < 30 },
              { label:"Obesidade",      range:"≥ 30",    color:"bg-red-400",   active: latest.bmi >= 30 },
            ].map(({ label, range, color, active }) => (
              <div key={label} className={`flex items-center gap-3 px-3 py-2 rounded-xl ${active ? "bg-gray-100 font-semibold" : ""}`}>
                <div className={`w-3 h-3 rounded-full ${color}`}/>
                <span className="text-sm flex-1">{label}</span>
                <span className="text-xs text-gray-400">{range}</span>
                {active && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Você</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chart */}
      {chartData.length > 1 && (
        <div className="card">
          <h2 className="font-syne font-bold text-lg text-amber-800 mb-4">Evolução do peso</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="date" tick={{ fontSize: 11 }}/>
              <YAxis domain={["auto","auto"]} tick={{ fontSize: 11 }}/>
              <Tooltip formatter={(v: number) => [`${v} kg`, "Peso"]}/>
              <Line type="monotone" dataKey="peso" stroke="#ba7517" strokeWidth={2} dot={{ r:4 }}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Register new measurement */}
      <div className="card">
        <h2 className="font-syne font-bold text-lg text-amber-800 mb-4">Registrar medidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Peso (kg) *</label>
            <input className="input" type="number" step="0.1" placeholder="Ex: 72.5" value={weight} onChange={e=>setWeight(e.target.value)}/>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Altura (cm) *</label>
            <input className="input" type="number" placeholder="Ex: 170" value={height} onChange={e=>setHeight(e.target.value)}/>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Cintura (cm)</label>
            <input className="input" type="number" placeholder="Opcional" value={waist} onChange={e=>setWaist(e.target.value)}/>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Meta de peso (kg)</label>
            <input className="input" type="number" step="0.1" placeholder="Ex: 68" value={goalW} onChange={e=>setGoalW(e.target.value)}/>
          </div>
        </div>
        <button className="btn-primary bg-amber-600 hover:bg-amber-700" onClick={handleSave}>
          Salvar registro
        </button>
      </div>

      {/* Goal progress */}
      {latest && profile.weight_kg && (
        <div className="card">
          <h2 className="font-syne font-bold text-lg text-amber-800 mb-3">Progresso até a meta</h2>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Peso inicial: <strong>{bodyMetrics[0]?.weight_kg}kg</strong></span>
            <span>Meta: <strong>{profile.weight_kg}kg</strong></span>
            <span>Atual: <strong>{latest.weight_kg}kg</strong></span>
          </div>
          <ProgressBar
            value={Math.abs((bodyMetrics[0]?.weight_kg || latest.weight_kg) - latest.weight_kg)}
            max={Math.abs((bodyMetrics[0]?.weight_kg || latest.weight_kg) - profile.weight_kg) || 1}
            color="bg-amber-500"
          />
          <p className="text-xs text-gray-400 mt-2">
            Exportar relatório em PDF — disponível em versão futura.
          </p>
        </div>
      )}
    </div>
  );
}
