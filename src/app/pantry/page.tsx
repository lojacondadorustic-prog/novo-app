"use client";

import { useState } from "react";
import { Plus, AlertTriangle, CheckCircle, XCircle, Camera, Trash2 } from "lucide-react";
import { TOXIC_FOODS } from "@/lib/constants";
import type { Ingredient } from "@/lib/types";

export default function PantryPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: "1",
      name: "Frango",
      quantity: 500,
      unit: "g",
      status: "available",
    },
    {
      id: "2",
      name: "Arroz integral",
      quantity: 1,
      unit: "kg",
      status: "available",
    },
    {
      id: "3",
      name: "Chocolate",
      quantity: 100,
      unit: "g",
      status: "toxic",
      toxicInfo: {
        reason: "Contém teobromina, tóxica para cães",
        alternative: "Alfarroba",
      },
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    quantity: "",
    unit: "g",
  });

  const checkIfToxic = (name: string) => {
    const lowerName = name.toLowerCase();
    return TOXIC_FOODS.find((toxic) =>
      lowerName.includes(toxic.name.toLowerCase())
    );
  };

  const handleAddIngredient = () => {
    if (!newIngredient.name || !newIngredient.quantity) return;

    const toxicInfo = checkIfToxic(newIngredient.name);
    const ingredient: Ingredient = {
      id: Date.now().toString(),
      name: newIngredient.name,
      quantity: parseFloat(newIngredient.quantity),
      unit: newIngredient.unit,
      status: toxicInfo ? "toxic" : "available",
      toxicInfo: toxicInfo
        ? {
            reason: toxicInfo.reason,
            alternative: toxicInfo.alternative,
          }
        : undefined,
    };

    setIngredients([...ingredients, ingredient]);
    setNewIngredient({ name: "", quantity: "", unit: "g" });
    setShowAddForm(false);
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const applySubstitutions = () => {
    const updated = ingredients.map((ing) => {
      if (ing.status === "toxic" && ing.toxicInfo) {
        return {
          ...ing,
          name: ing.toxicInfo.alternative,
          status: "available" as const,
          toxicInfo: undefined,
        };
      }
      return ing;
    });
    setIngredients(updated);
  };

  const toxicCount = ingredients.filter((i) => i.status === "toxic").length;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Pantry Inteligente
        </h1>
        <p className="text-gray-600">
          Gerencie seus ingredientes com detecção automática de alimentos tóxicos
        </p>
      </div>

      {/* Toxic Alert */}
      {toxicCount > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">
                  {toxicCount} ingrediente{toxicCount > 1 ? "s" : ""} tóxico
                  {toxicCount > 1 ? "s" : ""} detectado{toxicCount > 1 ? "s" : ""}!
                </h3>
                <p className="text-sm text-red-800">
                  Estes alimentos são perigosos para cães. Recomendamos substituí-los
                  imediatamente.
                </p>
              </div>
            </div>
            <button
              onClick={applySubstitutions}
              className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Aplicar Substituições
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center justify-center gap-2 bg-[#0F5A8A] hover:bg-[#0F5A8A]/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Plus className="h-5 w-5" />
          Adicionar Ingrediente
        </button>
        <button className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 transition-colors">
          <Camera className="h-5 w-5" />
          Scan Rótulo (em breve)
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Novo Ingrediente</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nome do ingrediente"
              value={newIngredient.name}
              onChange={(e) =>
                setNewIngredient({ ...newIngredient, name: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5A8A]"
            />
            <input
              type="number"
              placeholder="Quantidade"
              value={newIngredient.quantity}
              onChange={(e) =>
                setNewIngredient({ ...newIngredient, quantity: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5A8A]"
            />
            <select
              value={newIngredient.unit}
              onChange={(e) =>
                setNewIngredient({ ...newIngredient, unit: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5A8A]"
            >
              <option value="g">gramas (g)</option>
              <option value="kg">quilos (kg)</option>
              <option value="ml">mililitros (ml)</option>
              <option value="l">litros (l)</option>
              <option value="un">unidades</option>
            </select>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddIngredient}
              className="bg-[#0F5A8A] hover:bg-[#0F5A8A]/90 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Adicionar
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Ingredients List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ingredients.map((ingredient) => {
          const StatusIcon =
            ingredient.status === "toxic"
              ? XCircle
              : ingredient.status === "available"
              ? CheckCircle
              : AlertTriangle;

          const statusColor =
            ingredient.status === "toxic"
              ? "text-red-500"
              : ingredient.status === "available"
              ? "text-green-500"
              : "text-yellow-500";

          const bgColor =
            ingredient.status === "toxic"
              ? "bg-red-50 border-red-200"
              : ingredient.status === "available"
              ? "bg-white border-gray-200"
              : "bg-yellow-50 border-yellow-200";

          return (
            <div
              key={ingredient.id}
              className={`${bgColor} rounded-xl p-4 border-2 transition-all hover:shadow-md`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <StatusIcon className={`h-5 w-5 ${statusColor}`} />
                  <h3 className="font-semibold text-gray-900">
                    {ingredient.name}
                  </h3>
                </div>
                <button
                  onClick={() => handleRemoveIngredient(ingredient.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                {ingredient.quantity} {ingredient.unit}
              </p>

              {ingredient.toxicInfo && (
                <div className="bg-white rounded-lg p-3 space-y-2">
                  <div>
                    <p className="text-xs font-medium text-red-900 mb-1">
                      ⚠️ Por que é perigoso:
                    </p>
                    <p className="text-xs text-red-800">
                      {ingredient.toxicInfo.reason}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-green-900 mb-1">
                      ✅ Alternativa sugerida:
                    </p>
                    <p className="text-xs text-green-800 font-semibold">
                      {ingredient.toxicInfo.alternative}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {ingredients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Nenhum ingrediente adicionado ainda. Comece adicionando seus
            ingredientes!
          </p>
        </div>
      )}
    </div>
  );
}
