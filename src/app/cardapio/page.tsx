"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { TACO_FOODS } from "@/lib/nutrition";
import { Alert, StatCard } from "@/components/ui";
import { Utensils, ShoppingCart, CheckCircle, Download, Trash2 } from "lucide-react";
import type { MealPlan, PlannedMeal } from "@/types";
import { format, addDays } from "date-fns";

// Simple meal plan templates based on budget
const MEAL_TEMPLATES: Record<string, PlannedMeal[]> = {
  low: [
    { meal:"breakfast", items:[
      { name:"Tapioca (beiju)", portion:"50g", cost_brl:1.5, carbs_g:19.8, calories:80 },
      { name:"Ovo inteiro cozido", portion:"1 un (50g)", cost_brl:0.9, carbs_g:0.6, calories:77 },
      { name:"Banana prata", portion:"1 un (100g)", cost_brl:0.8, carbs_g:26.0, calories:98 },
    ]},
    { meal:"lunch", items:[
      { name:"Arroz branco cozido", portion:"200g", cost_brl:1.2, carbs_g:56.2, calories:256 },
      { name:"Feijão carioca cozido", portion:"150g", cost_brl:1.0, carbs_g:20.4, calories:114 },
      { name:"Frango grelhado (peito)", portion:"100g", cost_brl:4.0, carbs_g:0.0, calories:163 },
      { name:"Alface", portion:"50g", cost_brl:0.5, carbs_g:1.6, calories:9 },
    ]},
    { meal:"snack", items:[
      { name:"Maçã com casca", portion:"1 un (130g)", cost_brl:1.5, carbs_g:19.8, calories:73 },
    ]},
    { meal:"dinner", items:[
      { name:"Cuscuz de milho", portion:"100g", cost_brl:1.0, carbs_g:41.0, calories:188 },
      { name:"Ovo inteiro cozido", portion:"2 un (100g)", cost_brl:1.8, carbs_g:1.2, calories:154 },
      { name:"Tomate", portion:"100g", cost_brl:0.8, carbs_g:3.8, calories:17 },
    ]},
  ],
  low_alt: [
    { meal:"breakfast", items:[
      { name:"Pão francês", portion:"50g", cost_brl:0.75, carbs_g:27.0, calories:134 },
      { name:"Leite integral", portion:"200ml", cost_brl:2.0, carbs_g:9.6, calories:121 },
    ]},
    { meal:"lunch", items:[
      { name:"Arroz branco cozido", portion:"200g", cost_brl:1.2, carbs_g:56.2, calories:256 },
      { name:"Feijão carioca cozido", portion:"150g", cost_brl:1.0, carbs_g:20.4, calories:114 },
      { name:"Ovo inteiro cozido", portion:"2 un (100g)", cost_brl:1.8, carbs_g:1.2, calories:154 },
      { name:"Alface", portion:"50g", cost_brl:0.5, carbs_g:1.6, calories:9 },
    ]},
    { meal:"snack", items:[
      { name:"Banana prata", portion:"1 un (100g)", cost_brl:0.8, carbs_g:26.0, calories:98 },
    ]},
    { meal:"dinner", items:[
      { name:"Sopa de legumes caseira", portion:"250g", cost_brl:3.5, carbs_g:10.5, calories:75 },
      { name:"Queijo minas frescal", portion:"30g", cost_brl:2.0, carbs_g:0.5, calories:64 },
    ]},
  ],
  medium: [
    { meal:"breakfast", items:[
      { name:"Pão francês", portion:"2 un (100g)", cost_brl:1.5, carbs_g:54.0, calories:268 },
      { name:"Ovo inteiro cozido", portion:"2 un (100g)", cost_brl:1.8, carbs_g:1.2, calories:154 },
      { name:"Leite integral", portion:"200ml", cost_brl:2.0, carbs_g:9.6, calories:121 },
    ]},
    { meal:"lunch", items:[
      { name:"Arroz branco cozido", portion:"200g", cost_brl:1.2, carbs_g:56.2, calories:256 },
      { name:"Feijão carioca cozido", portion:"150g", cost_brl:1.0, carbs_g:20.4, calories:114 },
      { name:"Carne bovina (patinho)", portion:"100g", cost_brl:7.0, carbs_g:0.0, calories:219 },
      { name:"Cenoura crua", portion:"50g", cost_brl:0.5, carbs_g:3.9, calories:17 },
      { name:"Tomate", portion:"100g", cost_brl:0.8, carbs_g:3.8, calories:17 },
    ]},
    { meal:"snack", items:[
      { name:"Iogurte natural integral", portion:"170g", cost_brl:3.0, carbs_g:6.6, calories:97 },
      { name:"Banana prata", portion:"1 un (100g)", cost_brl:0.8, carbs_g:26.0, calories:98 },
    ]},
    { meal:"dinner", items:[
      { name:"Macarrão cozido", portion:"150g", cost_brl:1.5, carbs_g:49.4, calories:234 },
      { name:"Frango grelhado (peito)", portion:"100g", cost_brl:4.0, carbs_g:0.0, calories:163 },
      { name:"Tomate", portion:"100g", cost_brl:0.8, carbs_g:3.8, calories:17 },
    ]},
  ],
  medium_alt: [
    { meal:"breakfast", items:[
      { name:"Tapioca (beiju)", portion:"50g", cost_brl:1.5, carbs_g:19.8, calories:80 },
      { name:"Ovo inteiro cozido", portion:"1 un (50g)", cost_brl:0.9, carbs_g:0.6, calories:77 },
      { name:"Leite integral", portion:"200ml", cost_brl:2.0, carbs_g:9.6, calories:121 },
    ]},
    { meal:"lunch", items:[
      { name:"Macarrão cozido", portion:"150g", cost_brl:1.5, carbs_g:49.4, calories:234 },
      { name:"Frango grelhado (peito)", portion:"100g", cost_brl:4.0, carbs_g:0.0, calories:163 },
      { name:"Tomate", portion:"100g", cost_brl:0.8, carbs_g:3.8, calories:17 },
      { name:"Alface", portion:"50g", cost_brl:0.5, carbs_g:1.6, calories:9 },
    ]},
    { meal:"snack", items:[
      { name:"Iogurte natural integral", portion:"170g", cost_brl:3.0, carbs_g:6.6, calories:97 },
      { name:"Banana prata", portion:"1 un (100g)", cost_brl:0.8, carbs_g:26.0, calories:98 },
    ]},
    { meal:"dinner", items:[
      { name:"Cuscuz de milho", portion:"100g", cost_brl:1.0, carbs_g:41.0, calories:188 },
      { name:"Carne bovina (patinho)", portion:"100g", cost_brl:7.0, carbs_g:0.0, calories:219 },
    ]},
  ],
};

const MEAL_LABELS: Record<string, string> = {
  breakfast: "Café da manhã",
  lunch:     "Almoço",
  snack:     "Lanche",
  dinner:    "Jantar",
};

export default function CardapioPage() {
  const { profile } = useStore();
  const [budget, setBudget]   = useState(String(profile.daily_budget_brl));
  const [daysCount, setDaysCount] = useState(1);
  const [generated, setGenerated] = useState<MealPlan[] | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const displayPlans = generated;
  const activePlan = displayPlans ? displayPlans[activeTab] || displayPlans[0] : null;

  function generatePlan() {
    const b = parseFloat(budget) || 20;
    const count = Math.min(Math.max(daysCount, 1), 7);
    
    // Find all templates that fit the budget
    const options: { name: string; template: PlannedMeal[]; cost: number }[] = [];
    if (b >= 25.90) options.push({ name: "medium", template: MEAL_TEMPLATES.medium, cost: 25.90 });
    if (b >= 23.00) options.push({ name: "medium_alt", template: MEAL_TEMPLATES.medium_alt, cost: 23.00 });
    if (b >= 15.00) options.push({ name: "low", template: MEAL_TEMPLATES.low, cost: 15.00 });
    if (b >= 13.55) options.push({ name: "low_alt", template: MEAL_TEMPLATES.low_alt, cost: 13.55 });

    // Fallback if nothing fits
    if (options.length === 0) {
      options.push({ name: "low_alt", template: MEAL_TEMPLATES.low_alt, cost: 13.55 });
    }

    const generatedPlans: MealPlan[] = [];
    
    for (let i = 0; i < count; i++) {
      const targetDate = format(addDays(new Date(), i), "yyyy-MM-dd");
      
      // Cycle through options to generate variations
      const chosenOption = options[i % options.length];
      const template = chosenOption.template;

      const totalCost  = template.flatMap(m => m.items).reduce((s,item)=>s+item.cost_brl,0);
      const totalCarbs = template.flatMap(m => m.items).reduce((s,item)=>s+item.carbs_g,0);
      const totalCals  = template.flatMap(m => m.items).reduce((s,item)=>s+item.calories,0);

      generatedPlans.push({
        id: crypto.randomUUID(),
        date: targetDate,
        budget_brl: b,
        meals: template,
        total_cost: Math.round(totalCost * 100) / 100,
        total_calories: Math.round(totalCals),
        total_carbs_g: Math.round(totalCarbs * 10) / 10,
      });
    }

    setGenerated(generatedPlans);
    setActiveTab(0);
  }

  function handleClearPlan() {
    setGenerated(null);
    setActiveTab(0);
  }

  async function exportPDF(plans: MealPlan[]) {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    
    plans.forEach((plan, index) => {
      if (index > 0) {
        doc.addPage();
      }
      
      // Header background
      doc.setFillColor(34, 139, 34); // Forest green
      doc.rect(0, 0, 210, 40, "F");

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.text(`NutriWay - Cardapio: Dia ${index + 1}`, 20, 26);

      // Metadata section
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Data do Plano: ${plan.date}`, 20, 52);
      doc.text(`Orcamento Diário Limite: R$ ${plan.budget_brl.toFixed(2)}`, 20, 58);

      // Summary box
      doc.setFillColor(240, 248, 240);
      doc.roundedRect(20, 64, 170, 28, 4, 4, "F");
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(34, 139, 34);
      doc.text("Resumo Nutricional e Financeiro do Dia", 26, 72);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);
      doc.text(`Custo Estimado: R$ ${plan.total_cost.toFixed(2)}`, 26, 80);
      doc.text(`Calorias Totais: ${plan.total_calories} kcal`, 90, 80);
      doc.text(`Carboidratos: ${plan.total_carbs_g}g`, 150, 80);

      let y = 104;

      // Meals list
      plan.meals.forEach(m => {
        if (y > 250) {
          doc.addPage();
          y = 20;
        }
        
        // Meal Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(34, 139, 34);
        doc.text(MEAL_LABELS[m.meal] || m.meal, 20, y);
        y += 6;
        
        // Divider
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.5);
        doc.line(20, y, 190, y);
        y += 6;

        m.items.forEach(item => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(60, 60, 60);
          doc.text(item.name, 25, y);
          
          doc.setFont("helvetica", "normal");
          doc.setTextColor(120, 120, 120);
          doc.text(`Porcao: ${item.portion}`, 25, y + 5);

          // Nutrition & Cost right-aligned
          doc.setTextColor(80, 80, 80);
          const detailStr = `${item.calories} kcal | ${item.carbs_g}g carb | R$ ${item.cost_brl.toFixed(2)}`;
          doc.text(detailStr, 130, y + 2);
          
          y += 12;
        });

        y += 4;
      });
    });

    // Consolidated Shopping List at the end
    doc.addPage();
    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(34, 139, 34);
    doc.text("Lista de Compras Consolidada", 20, y);
    y += 4;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, 190, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);

    const shoppingMap: Record<string, number> = {};
    plans.forEach(plan => {
      plan.meals.forEach(m => {
        m.items.forEach(item => {
          shoppingMap[item.name] = (shoppingMap[item.name] || 0) + item.cost_brl;
        });
      });
    });

    let totalCostAllDays = 0;
    Object.entries(shoppingMap).forEach(([name, cost]) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      
      doc.text(`[ ]  ${name}`, 25, y);
      doc.text(`R$ ${cost.toFixed(2)}`, 150, y);
      totalCostAllDays += cost;
      y += 7;
    });

    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(34, 139, 34);
    doc.text(`Custo Total Estimado (${plans.length} dias): R$ ${totalCostAllDays.toFixed(2)}`, 20, y);

    const pdfName = plans.length === 1 ? `cardapio-${plans[0].date}.pdf` : `cardapio-semanal.pdf`;
    doc.save(pdfName);
  }

  const hasBudgetOverflow = activePlan && activePlan.total_cost > activePlan.budget_brl;
  const isBelowCheapest = parseFloat(budget) < 13.55;

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-syne font-extrabold text-3xl text-green-800">🥗 Cardápio Econômico</h1>
          <p className="text-gray-500 mt-1">Planejamento alimentar baseado no seu orçamento.</p>
        </div>
        {displayPlans && displayPlans.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => exportPDF(displayPlans)}
              className="btn-ghost flex items-center gap-1 text-sm border-green-200 text-green-700 hover:bg-green-50"
              title="Salvar tudo como PDF"
            >
              <Download size={16}/> PDF Completo
            </button>
            <button
              onClick={handleClearPlan}
              className="btn-ghost flex items-center gap-1 text-sm border-red-200 text-red-600 hover:bg-red-50"
              title="Limpar cardápios gerados"
            >
              <Trash2 size={16}/> Limpar Tudo
            </button>
          </div>
        )}
      </div>

      {/* Budget & Days input */}
      {!displayPlans && (
        <div className="card space-y-4">
          <h2 className="font-syne font-bold text-lg text-green-800">Gerar plano de cardápio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Orçamento diário disponível (R$)</label>
              <input 
                className="input" 
                type="number" 
                step="0.5" 
                value={budget} 
                onChange={e=>setBudget(e.target.value)} 
                placeholder="Ex: 25"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Período do planejamento (dias)</label>
              <select 
                className="input" 
                value={daysCount} 
                onChange={e=>setDaysCount(Number(e.target.value))}
              >
                <option value={1}>1 Dia (Diário)</option>
                <option value={2}>2 Dias</option>
                <option value={3}>3 Dias</option>
                <option value={4}>4 Dias</option>
                <option value={5}>5 Dias</option>
                <option value={6}>6 Dias</option>
                <option value={7}>7 Dias (Semanal)</option>
              </select>
            </div>
          </div>
          
          <button className="btn-primary w-full" onClick={generatePlan}>
            <Utensils size={16} className="inline mr-1"/> Gerar cardápio
          </button>
          
          <p className="text-xs text-gray-400">
            Cardápios gerados com base em alimentos da TACO (UNICAMP) de forma alternada para diversificar as suas refeições. Estimativas de preços baseadas no banco de dados do DIEESE (Pesquisa da Cesta Básica Nacional) e índices do IBGE (IPCA), complementados por levantamento de redes de supermercados locais.
          </p>
        </div>
      )}

      {/* Budget warnings */}
      {!displayPlans && isBelowCheapest && budget !== "" && (
        <Alert 
          message="Atenção: O orçamento informado é menor que o custo do nosso cardápio econômico alternativo (R$ 13,55). O sistema irá fornecer o cardápio mais barato possível."
          type="info"
        />
      )}

      {/* Plan display */}
      {displayPlans && displayPlans.length > 0 && activePlan && (
        <>
          {/* Day Tabs Navigation */}
          {displayPlans.length > 1 && (
            <div className="flex gap-2 border-b border-gray-100 pb-2 overflow-x-auto">
              {displayPlans.map((plan, index) => (
                <button
                  key={plan.id || index}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
                    activeTab === index
                      ? "bg-green-500 text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  Dia {index + 1} ({format(new Date(plan.date + "T00:00:00"), "dd/MM")})
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Custo do Dia" value={`R$ ${activePlan.total_cost.toFixed(2)}`}
              color="bg-green-50" textColor="text-green-700" icon={<ShoppingCart size={14}/>}/>
            <StatCard label="Calorias" value={activePlan.total_calories} unit="kcal"
              color="bg-amber-50" textColor="text-amber-700"/>
            <StatCard label="Carboidratos" value={`${activePlan.total_carbs_g}g`}
              color="bg-red-50" textColor="text-red-700"/>
          </div>

          {activePlan.total_carbs_g > profile.carb_limit_g && (
            <Alert
              message={`Atenção: este cardápio contém ${activePlan.total_carbs_g}g de carb, acima do seu limite de ${profile.carb_limit_g}g. Considere ajustar as porções.`}
              type="warning"
            />
          )}

          {hasBudgetOverflow && (
            <Alert
              message={`O orçamento limite diário configurado de R$ ${activePlan.budget_brl.toFixed(2)} foi excedido por R$ ${(activePlan.total_cost - activePlan.budget_brl).toFixed(2)}.`}
              type="warning"
            />
          )}

          {/* Meals */}
          <div className="space-y-4">
            {activePlan.meals.map(m => (
              <div key={m.meal} className="card">
                <h3 className="font-syne font-bold text-base text-green-700 mb-3">{MEAL_LABELS[m.meal]}</h3>
                <div className="space-y-2">
                  {m.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.portion} · {item.calories} kcal</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-red-600">{item.carbs_g}g carb</p>
                        <p className="text-xs text-green-600">R$ {item.cost_brl.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Shopping list of selected day */}
          <div className="card">
            <h2 className="font-syne font-bold text-lg text-green-800 mb-3 flex items-center gap-2">
              <ShoppingCart size={18}/> Lista de compras (Dia {activeTab + 1})
            </h2>
            <div className="space-y-2">
              {Array.from(new Set(activePlan.meals.flatMap(m => m.items.map(i => i.name)))).map(name => {
                const allItems = activePlan.meals.flatMap(m => m.items.filter(i => i.name === name));
                const totalCost = allItems.reduce((s,i)=>s+i.cost_brl,0);
                return (
                  <div key={name} className="flex justify-between items-center text-sm py-1.5 border-b border-gray-50">
                    <span className="text-gray-700">{name}</span>
                    <span className="text-green-600 font-medium">R$ {totalCost.toFixed(2)}</span>
                  </div>
                );
              })}
              <div className="flex justify-between items-center pt-2 font-semibold">
                <span>Total estimado para o Dia</span>
                <span className="text-green-700">R$ {activePlan.total_cost.toFixed(2)}</span>
              </div>
            </div>
          </div>


        </>
      )}

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-400 space-y-2">
        <p className="font-semibold text-gray-500">
          Site desenvolvido para a disciplina Gestão de Negócios e Empreendedorismo
        </p>
        <p className="max-w-2xl mx-auto leading-relaxed">
          <strong>Grupo:</strong> Ana Julia Cordeiro Alvarenga, Bruna Letícia Oliveira Silva, Fernanda Lauane Marques Gomes, Gabriela de Lima, Gustavo Oliveira Resende, Laura Aparecida Araújo Dutra, Lérida de Oliveira, Lucas Gomes Sousa Mota, Maria Olívia Sousa Vilela, Rosana Rodrigues Teixeira Andrade, Valentina Maria Silva Villas Bôas
        </p>
      </footer>
    </div>
  );
}
