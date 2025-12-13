"use client";

import { useState } from "react";
import { Zap, Loader2 } from "lucide-react";
import DietResult from "@/components/custom/diet-result";

export default function QuickGeneratePage() {
  const [loading, setLoading] = useState(false);
  const [calorieAdjust, setCalorieAdjust] = useState(0);
  const [generatedDiet, setGeneratedDiet] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Dados fictícios do pet para teste
  const mockPet = {
    name: "Rex",
    breed: "Golden Retriever",
    weight: 30,
    age: 5,
    activityLevel: "moderado",
    allergies: []
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setGeneratedDiet(null);

    try {
      // Calcular calorias base (fórmula simplificada: 30 * peso + 70)
      const baseCalories = 30 * mockPet.weight + 70;
      const adjustedCalories = Math.round(baseCalories * (1 + calorieAdjust / 100));

      const response = await fetch("/api/generate-diet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petName: mockPet.name,
          breed: mockPet.breed,
          weight: mockPet.weight,
          age: mockPet.age,
          activityLevel: mockPet.activityLevel,
          allergies: mockPet.allergies,
          availableIngredients: [
            "frango",
            "arroz integral",
            "cenoura",
            "batata doce",
            "óleo de coco"
          ],
          objectives: "manutenção de peso",
          mealsPerDay: 2,
          budget: "médio"
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao gerar receita");
      }

      const result = await response.json();
      
      // Ajustar calorias no resultado
      if (result.data) {
        result.data.metadata.calorias_diarias_kcal = adjustedCalories;
        result.data.recipe.calories = adjustedCalories;
        setGeneratedDiet(result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      console.error("Erro ao gerar receita:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calcular calorias estimadas para exibição
  const baseCalories = 30 * mockPet.weight + 70;
  const displayCalories = Math.round(baseCalories * (1 + calorieAdjust / 100));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!generatedDiet ? (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#D9A441] to-orange-500 rounded-full mb-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Quick Generate
            </h1>
            <p className="text-gray-600">
              Gere uma receita instantânea com base nos dados salvos
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
            {/* Pet Info Preview */}
            <div className="bg-gradient-to-br from-[#0F5A8A]/10 to-[#D9A441]/10 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Usando dados de:</h3>
              <p className="text-sm text-gray-700">
                <strong>{mockPet.name}</strong> • {mockPet.breed} • {mockPet.weight}kg • Atividade Moderada
              </p>
            </div>

            {/* Calorie Adjustment */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Ajuste de Calorias: {calorieAdjust > 0 ? "+" : ""}
                  {calorieAdjust}%
                </label>
                <span className="text-lg font-bold text-[#0F5A8A]">
                  {displayCalories} kcal
                </span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                step="10"
                value={calorieAdjust}
                onChange={(e) => setCalorieAdjust(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0F5A8A]"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>-20% ({Math.round(baseCalories * 0.8)} kcal)</span>
                <span>Normal ({baseCalories} kcal)</span>
                <span>+20% ({Math.round(baseCalories * 1.2)} kcal)</span>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#D9A441] to-orange-500 hover:opacity-90 text-white py-4 rounded-lg font-semibold text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Gerando receita...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  Gerar Receita Agora
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-500">
              A receita será gerada com base nos ingredientes disponíveis no seu
              Pantry
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">
                <strong>Erro:</strong> {error}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setGeneratedDiet(null)}
            className="mb-6 inline-flex items-center gap-2 text-[#0F5A8A] hover:text-[#0F5A8A]/80 font-medium transition-colors"
          >
            ← Gerar Nova Receita
          </button>
          <DietResult
            metadata={generatedDiet.metadata}
            recipe={generatedDiet.recipe}
            shopping_list={generatedDiet.shopping_list}
            alerts={generatedDiet.alerts || []}
          />
        </div>
      )}
    </div>
  );
}
