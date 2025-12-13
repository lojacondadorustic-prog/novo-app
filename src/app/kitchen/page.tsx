"use client";

import { useState } from "react";
import { ChefHat, Timer, CheckCircle } from "lucide-react";

export default function KitchenModePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);

  const recipe = {
    title: "Frango com Arroz Integral e Cenoura",
    steps: [
      { text: "Cozinhe 200g de peito de frango em água por 20 minutos", time: 20 },
      { text: "Cozinhe 100g de arroz integral por 30 minutos", time: 30 },
      { text: "Cozinhe 50g de cenoura picada por 10 minutos", time: 10 },
      { text: "Desfie o frango e misture todos os ingredientes", time: 5 },
      { text: "Deixe esfriar antes de servir", time: 15 },
    ],
  };

  const toggleComplete = (index: number) => {
    if (completed.includes(index)) {
      setCompleted(completed.filter((i) => i !== index));
    } else {
      setCompleted([...completed, index]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-4">
            <ChefHat className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{recipe.title}</h1>
          <p className="text-gray-400">Modo Cozinha - Passo a Passo</p>
        </div>

        {/* Progress */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progresso</span>
            <span className="text-sm text-gray-400">
              {completed.length}/{recipe.steps.length} passos
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${(completed.length / recipe.steps.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-3xl mx-auto space-y-4">
          {recipe.steps.map((step, index) => {
            const isCompleted = completed.includes(index);
            const isCurrent = index === currentStep;

            return (
              <div
                key={index}
                className={`bg-gray-800 rounded-2xl p-6 border-2 transition-all ${
                  isCurrent
                    ? "border-orange-500 shadow-lg shadow-orange-500/20"
                    : isCompleted
                    ? "border-green-500 opacity-60"
                    : "border-gray-700"
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(index)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCompleted
                        ? "bg-green-500 border-green-500"
                        : "border-gray-600 hover:border-orange-500"
                    }`}
                  >
                    {isCompleted && <CheckCircle className="h-5 w-5 text-white" />}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-lg font-semibold">Passo {index + 1}</h3>
                      <div className="flex items-center gap-2 text-orange-500">
                        <Timer className="h-4 w-4" />
                        <span className="text-sm font-medium">{step.time} min</span>
                      </div>
                    </div>
                    <p className="text-gray-300">{step.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Complete Button */}
        {completed.length === recipe.steps.length && (
          <div className="max-w-3xl mx-auto mt-8">
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white py-4 rounded-lg font-semibold text-lg transition-all">
              ✅ Receita Concluída!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
