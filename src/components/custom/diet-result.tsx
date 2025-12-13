"use client";

import { useState } from "react";
import {
  Download,
  Share2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Flame,
  Scale,
  Clock,
  ShoppingCart,
  ChefHat,
  Mail,
  Loader2,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface Ingredient {
  item: string;
  gramas: number;
}

interface Recipe {
  title: string;
  ingredients: Ingredient[];
  instructions: string;
  calories: number;
  macros: {
    proteinas: number;
    gorduras: number;
    carboidratos: number;
  };
}

interface DietResultProps {
  metadata: {
    pet_nome: string;
    raca: string;
    peso_kg: number;
    calorias_diarias_kcal: number;
  };
  recipe: Recipe;
  shopping_list: string[];
  alerts: string[];
}

const COLORS = {
  proteinas: "#0F5A8A",
  gorduras: "#D9A441",
  carboidratos: "#4DAF7C",
};

export default function DietResult({
  metadata,
  recipe,
  shopping_list,
  alerts,
}: DietResultProps) {
  const [downloading, setDownloading] = useState(false);
  const [sendingToVet, setSendingToVet] = useState(false);
  const [vetEmailSent, setVetEmailSent] = useState(false);
  const [vetEmailError, setVetEmailError] = useState<string | null>(null);

  // Preparar dados para o gráfico de macros
  const macroData = [
    { name: "Proteínas", value: recipe.macros.proteinas, color: COLORS.proteinas },
    { name: "Gorduras", value: recipe.macros.gorduras, color: COLORS.gorduras },
    { name: "Carboidratos", value: recipe.macros.carboidratos, color: COLORS.carboidratos },
  ];

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metadata,
          recipe,
          shopping_list,
          alerts,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dieta-${metadata.pet_nome.toLowerCase()}-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Erro ao baixar PDF:", error);
      alert("Erro ao gerar PDF. Tente novamente.");
    } finally {
      setDownloading(false);
    }
  };

  const handleSendToVet = async () => {
    // Solicitar e-mail do veterinário
    const vetEmail = prompt("Digite o e-mail do veterinário:");
    
    if (!vetEmail) {
      return; // Usuário cancelou
    }

    // Validação básica de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(vetEmail)) {
      alert("Por favor, digite um e-mail válido.");
      return;
    }

    setSendingToVet(true);
    setVetEmailError(null);
    setVetEmailSent(false);

    try {
      const response = await fetch("/api/send-to-vet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vetEmail,
          dietData: {
            metadata,
            recipe,
            shopping_list,
            alerts,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao enviar e-mail");
      }

      const result = await response.json();
      console.log("✅ E-mail enviado com sucesso:", result);
      
      setVetEmailSent(true);
      alert(`✅ Dieta enviada com sucesso para ${vetEmail}!\n\nO veterinário receberá todos os detalhes da receita.`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      setVetEmailError(errorMessage);
      console.error("❌ Erro ao enviar para veterinário:", error);
      alert(`❌ Erro ao enviar e-mail: ${errorMessage}`);
    } finally {
      setSendingToVet(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header com Título */}
        <div className="bg-gradient-to-r from-[#0F5A8A] to-[#D9A441] rounded-2xl p-6 sm:p-8 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {recipe.title}
              </h1>
              <p className="text-white/90 text-sm sm:text-base">
                Dieta personalizada para {metadata.pet_nome} • {metadata.raca} • {metadata.peso_kg}kg
              </p>
            </div>
            <div className="flex-shrink-0">
              <ChefHat className="h-12 w-12 sm:h-16 sm:w-16 opacity-80" />
            </div>
          </div>
        </div>

        {/* Confirmação de envio ao veterinário */}
        {vetEmailSent && (
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-900 mb-1">
                  ✅ E-mail enviado com sucesso!
                </h3>
                <p className="text-sm text-green-800">
                  O veterinário receberá todos os detalhes da dieta personalizada.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Alertas (se houver) */}
        {alerts && alerts.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 mb-2">
                  ⚠️ Alertas Importantes
                </h3>
                <ul className="space-y-1">
                  {alerts.map((alert, index) => (
                    <li key={index} className="text-sm text-red-800">
                      • {alert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Calorias e Macros */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calorias */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Calorias
                </h3>
                <p className="text-sm text-gray-600">Por refeição</p>
              </div>
            </div>
            <div className="text-center py-4">
              <p className="text-5xl font-bold text-[#0F5A8A]">
                {recipe.calories}
              </p>
              <p className="text-gray-600 mt-2">kcal</p>
              <p className="text-sm text-gray-500 mt-4">
                Meta diária: {metadata.calorias_diarias_kcal} kcal
              </p>
            </div>
          </div>

          {/* Macronutrientes */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Scale className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Macronutrientes
                </h3>
                <p className="text-sm text-gray-600">Distribuição</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}g`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center">
                <div className="w-3 h-3 bg-[#0F5A8A] rounded-full mx-auto mb-1"></div>
                <p className="text-xs text-gray-600">Proteínas</p>
                <p className="font-semibold text-sm">{recipe.macros.proteinas}g</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-[#D9A441] rounded-full mx-auto mb-1"></div>
                <p className="text-xs text-gray-600">Gorduras</p>
                <p className="font-semibold text-sm">{recipe.macros.gorduras}g</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-[#4DAF7C] rounded-full mx-auto mb-1"></div>
                <p className="text-xs text-gray-600">Carboidratos</p>
                <p className="font-semibold text-sm">{recipe.macros.carboidratos}g</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredientes */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Ingredientes
              </h3>
              <p className="text-sm text-gray-600">Com quantidades precisas</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recipe.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-700">{ingredient.item}</span>
                <span className="font-semibold text-[#0F5A8A]">
                  {ingredient.gramas}g
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Instruções de Preparo */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Modo de Preparo
              </h3>
              <p className="text-sm text-gray-600">Passo a passo</p>
            </div>
          </div>
          <div className="prose prose-sm max-w-none">
            <div className="text-gray-700 whitespace-pre-line leading-relaxed">
              {recipe.instructions}
            </div>
          </div>
        </div>

        {/* Lista de Compras */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Lista de Compras
              </h3>
              <p className="text-sm text-gray-600">
                Itens necessários para esta receita
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {shopping_list.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-green-50 rounded-lg p-3"
              >
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0F5A8A] to-[#D9A441] hover:opacity-90 text-white py-4 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Gerando PDF...
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                Baixar PDF
              </>
            )}
          </button>

          <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 py-4 rounded-lg font-semibold border-2 border-gray-200 transition-all">
            <Calendar className="h-5 w-5" />
            Salvar no Plano Semanal
          </button>

          <button
            onClick={handleSendToVet}
            disabled={sendingToVet}
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 py-4 rounded-lg font-semibold border-2 border-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sendingToVet ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Mail className="h-5 w-5" />
                Enviar ao Veterinário
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
