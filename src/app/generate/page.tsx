"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { ACTIVITY_LEVELS, MEAL_OBJECTIVES } from "@/lib/constants";

export default function GeneratePage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    petName: "Rex",
    breed: "Golden Retriever",
    age: "3",
    weight: "30",
    activityLevel: "moderate",
    allergies: "",
    objectives: [] as string[],
    mealsPerDay: "2",
    budget: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular chamada API
    setTimeout(() => {
      setLoading(false);
      alert("Dieta gerada! (Em produção, chamaria /api/generate-diet)");
    }, 2000);
  };

  const toggleObjective = (objective: string) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.includes(objective)
        ? prev.objectives.filter((o) => o !== objective)
        : [...prev.objectives, objective],
    }));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0F5A8A] to-[#D9A441] rounded-full mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Gerar Dieta com IA
          </h1>
          <p className="text-gray-600">
            Preencha as informações para criar uma dieta personalizada
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
          {/* Pet Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Informações do Pet
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Pet
                </label>
                <input
                  type="text"
                  value={formData.petName}
                  onChange={(e) =>
                    setFormData({ ...formData, petName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5A8A]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Raça
                </label>
                <input
                  type="text"
                  value={formData.breed}
                  onChange={(e) =>
                    setFormData({ ...formData, breed: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5A8A]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idade (anos)
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5A8A]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5A8A]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nível de Atividade
              </label>
              <select
                value={formData.activityLevel}
                onChange={(e) =>
                  setFormData({ ...formData, activityLevel: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5A8A]"
              >
                {ACTIVITY_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alergias ou Restrições
              </label>
              <input
                type="text"
                value={formData.allergies}
                onChange={(e) =>
                  setFormData({ ...formData, allergies: e.target.value })
                }
                placeholder="Ex: frango, trigo, soja"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5A8A]"
              />
            </div>
          </div>

          {/* Objectives */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Objetivos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {MEAL_OBJECTIVES.map((objective) => (
                <button
                  key={objective}
                  type="button"
                  onClick={() => toggleObjective(objective)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    formData.objectives.includes(objective)
                      ? "bg-[#0F5A8A] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {objective}
                </button>
              ))}
            </div>
          </div>

          {/* Meal Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refeições por Dia
              </label>
              <select
                value={formData.mealsPerDay}
                onChange={(e) =>
                  setFormData({ ...formData, mealsPerDay: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5A8A]"
              >
                <option value="1">1 refeição</option>
                <option value="2">2 refeições</option>
                <option value="3">3 refeições</option>
                <option value="4">4 refeições</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orçamento Mensal (R$) - Opcional
              </label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                placeholder="Ex: 500"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5A8A]"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#0F5A8A] to-[#D9A441] hover:opacity-90 text-white py-4 rounded-lg font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Gerando Dieta...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Gerar Dieta Personalizada
              </>
            )}
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            💡 <strong>Dica:</strong> A IA analisará todas as informações e
            criará uma dieta balanceada, detectando automaticamente ingredientes
            tóxicos e sugerindo substituições seguras.
          </p>
        </div>
      </div>
    </div>
  );
}
