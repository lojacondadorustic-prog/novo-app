"use client";

import { useState } from "react";
import { Calendar, Download, Plus, Loader2 } from "lucide-react";

interface Meal {
  name: string;
  calories?: number;
}

interface DayPlan {
  breakfast: Meal | null;
  lunch: Meal | null;
  dinner: Meal | null;
}

type WeekPlan = {
  [key: string]: DayPlan;
};

export default function WeeklyPlanPage() {
  const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
  
  const [weekPlan, setWeekPlan] = useState<WeekPlan>({
    Segunda: {
      breakfast: { name: "Frango com arroz integral", calories: 350 },
      lunch: { name: "Carne moída com batata doce", calories: 420 },
      dinner: null,
    },
    Terça: {
      breakfast: null,
      lunch: { name: "Peixe com legumes", calories: 380 },
      dinner: { name: "Frango com cenoura", calories: 340 },
    },
    Quarta: {
      breakfast: { name: "Ovo com arroz", calories: 300 },
      lunch: null,
      dinner: { name: "Carne com abóbora", calories: 400 },
    },
    Quinta: {
      breakfast: null,
      lunch: { name: "Frango com batata", calories: 390 },
      dinner: null,
    },
    Sexta: {
      breakfast: { name: "Sardinha com arroz", calories: 360 },
      lunch: { name: "Carne com cenoura", calories: 410 },
      dinner: { name: "Frango com legumes", calories: 370 },
    },
    Sábado: {
      breakfast: null,
      lunch: { name: "Peixe com batata doce", calories: 380 },
      dinner: null,
    },
    Domingo: {
      breakfast: { name: "Frango com arroz", calories: 350 },
      lunch: null,
      dinner: { name: "Carne com legumes", calories: 420 },
    },
  });

  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const handleExportWeek = async () => {
    setExporting(true);
    setExportError(null);

    try {
      // Preparar dados do resumo semanal
      const weekSummary = {
        title: "Plano Semanal de Alimentação",
        week: weekPlan,
        totalMeals: Object.values(weekPlan).reduce((total, day) => {
          return total + 
            (day.breakfast ? 1 : 0) + 
            (day.lunch ? 1 : 0) + 
            (day.dinner ? 1 : 0);
        }, 0),
        totalCalories: Object.values(weekPlan).reduce((total, day) => {
          return total + 
            (day.breakfast?.calories || 0) + 
            (day.lunch?.calories || 0) + 
            (day.dinner?.calories || 0);
        }, 0),
      };

      // Enviar para o endpoint de PDF
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "weekly",
          data: weekSummary,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao gerar PDF");
      }

      // Baixar o PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `plano-semanal-${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      console.log("✅ PDF exportado com sucesso!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido ao exportar PDF";
      setExportError(errorMessage);
      console.error("❌ Erro ao exportar semana:", err);
    } finally {
      setExporting(false);
    }
  };

  const addMeal = (day: string, mealType: "breakfast" | "lunch" | "dinner") => {
    const mealName = prompt(`Digite o nome da refeição para ${mealType === "breakfast" ? "Café da Manhã" : mealType === "lunch" ? "Almoço" : "Jantar"}:`);
    if (mealName) {
      const calories = parseInt(prompt("Digite as calorias (opcional):") || "0") || undefined;
      setWeekPlan(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          [mealType]: { name: mealName, calories },
        },
      }));
    }
  };

  const removeMeal = (day: string, mealType: "breakfast" | "lunch" | "dinner") => {
    setWeekPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: null,
      },
    }));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Plano Semanal
          </h1>
          <p className="text-gray-600">Organize as refeições da semana</p>
        </div>
        <button 
          onClick={handleExportWeek}
          disabled={exporting}
          className="inline-flex items-center gap-2 bg-[#0F5A8A] hover:bg-[#0F5A8A]/90 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {exporting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Exportando...
            </>
          ) : (
            <>
              <Download className="h-5 w-5" />
              Exportar Semana
            </>
          )}
        </button>
      </div>

      {exportError && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">
            <strong>Erro:</strong> {exportError}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {days.map((day) => (
          <div key={day} className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b">
              <Calendar className="h-4 w-4 text-[#0F5A8A]" />
              <h3 className="font-semibold text-gray-900">{day}</h3>
            </div>

            <div className="space-y-3">
              {/* Breakfast */}
              <div className="bg-orange-50 rounded-lg p-3">
                <p className="text-xs font-medium text-orange-900 mb-1">
                  Café da Manhã
                </p>
                {weekPlan[day]?.breakfast ? (
                  <div>
                    <p className="text-xs text-gray-800 font-medium">
                      {weekPlan[day].breakfast!.name}
                    </p>
                    {weekPlan[day].breakfast!.calories && (
                      <p className="text-xs text-gray-600">
                        {weekPlan[day].breakfast!.calories} kcal
                      </p>
                    )}
                    <button
                      onClick={() => removeMeal(day, "breakfast")}
                      className="text-xs text-red-600 hover:text-red-800 mt-1"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addMeal(day, "breakfast")}
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800"
                  >
                    <Plus className="h-3 w-3" />
                    Adicionar
                  </button>
                )}
              </div>

              {/* Lunch */}
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs font-medium text-blue-900 mb-1">Almoço</p>
                {weekPlan[day]?.lunch ? (
                  <div>
                    <p className="text-xs text-gray-800 font-medium">
                      {weekPlan[day].lunch!.name}
                    </p>
                    {weekPlan[day].lunch!.calories && (
                      <p className="text-xs text-gray-600">
                        {weekPlan[day].lunch!.calories} kcal
                      </p>
                    )}
                    <button
                      onClick={() => removeMeal(day, "lunch")}
                      className="text-xs text-red-600 hover:text-red-800 mt-1"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addMeal(day, "lunch")}
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800"
                  >
                    <Plus className="h-3 w-3" />
                    Adicionar
                  </button>
                )}
              </div>

              {/* Dinner */}
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-xs font-medium text-purple-900 mb-1">Jantar</p>
                {weekPlan[day]?.dinner ? (
                  <div>
                    <p className="text-xs text-gray-800 font-medium">
                      {weekPlan[day].dinner!.name}
                    </p>
                    {weekPlan[day].dinner!.calories && (
                      <p className="text-xs text-gray-600">
                        {weekPlan[day].dinner!.calories} kcal
                      </p>
                    )}
                    <button
                      onClick={() => removeMeal(day, "dinner")}
                      className="text-xs text-red-600 hover:text-red-800 mt-1"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addMeal(day, "dinner")}
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800"
                  >
                    <Plus className="h-3 w-3" />
                    Adicionar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          💡 <strong>Dica:</strong> Clique em "Adicionar" para incluir refeições personalizadas. 
          Use "Exportar Semana" para gerar um PDF completo do plano!
        </p>
      </div>
    </div>
  );
}
