"use client";
import { useStore } from "@/lib/store";
import { useState } from "react";
import { Alert } from "@/components/ui";

export default function SettingsPage() {
  const { profile, setProfile } = useStore();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ ...profile });

  function handleSave() {
    setProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const field = (label: string, key: keyof typeof form, type = "text", placeholder = "") => (
    <div>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        value={String(form[key] ?? "")}
        onChange={e => setForm(f => ({ ...f, [key]: type === "number" ? parseFloat(e.target.value) || 0 : e.target.value }))}
      />
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-up max-w-lg">
      <div>
        <h1 className="font-syne font-extrabold text-3xl text-green-900">Configurações</h1>
        <p className="text-gray-500 mt-1">Personalize o NutriWay para o seu perfil.</p>
      </div>

      <div className="card space-y-4">
        <h2 className="font-syne font-bold text-lg text-green-800">Perfil pessoal</h2>
        {field("Nome", "name", "text", "Seu nome")}
        <div className="grid grid-cols-2 gap-3">
          {field("Peso atual (kg)", "weight_kg", "number")}
          {field("Altura (cm)", "height_cm", "number")}
          {field("Idade", "age", "number")}
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Sexo</label>
          <select className="input" value={form.sex} onChange={e=>setForm(f=>({...f,sex:e.target.value as "M"|"F"}))}>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Nível de atividade física</label>
          <select className="input" value={form.activity} onChange={e=>setForm(f=>({...f,activity:e.target.value as typeof form.activity}))}>
            <option value="sedentary">Sedentário</option>
            <option value="light">Levemente ativo</option>
            <option value="moderate">Moderadamente ativo</option>
            <option value="active">Muito ativo</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Objetivo</label>
          <select className="input" value={form.goal} onChange={e=>setForm(f=>({...f,goal:e.target.value as typeof form.goal}))}>
            <option value="lose">Emagrecer</option>
            <option value="maintain">Manter peso</option>
            <option value="gain">Ganhar massa</option>
          </select>
        </div>
      </div>

      <div className="card space-y-4">
        <h2 className="font-syne font-bold text-lg text-green-800">Metas e limites</h2>
        <div className="grid grid-cols-2 gap-3">
          {field("Orçamento diário (R$)", "daily_budget_brl", "number")}
          {field("Limite de carboidratos (g/dia)", "carb_limit_g", "number")}
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Tipo de diabetes (opcional)</label>
          <select className="input" value={form.diabetes_type || ""} onChange={e=>setForm(f=>({...f,diabetes_type:(e.target.value||undefined) as typeof form.diabetes_type}))}>
            <option value="">Não se aplica</option>
            <option value="type1">Tipo 1</option>
            <option value="type2">Tipo 2</option>
            <option value="pre">Pré-diabetes</option>
          </select>
        </div>
      </div>

      {saved && <Alert message="✅ Configurações salvas com sucesso!" type="success"/>}

      <button className="btn-primary w-full py-3" onClick={handleSave}>
        Salvar configurações
      </button>
    </div>
  );
}
