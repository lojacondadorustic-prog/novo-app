"use client";

import { useState } from "react";
import { TrendingUp, Plus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function HistoryPage() {
  const [showAddForm, setShowAddForm] = useState(false);

  const weightData = [
    { date: "01/01", weight: 29.5 },
    { date: "08/01", weight: 29.7 },
    { date: "15/01", weight: 29.9 },
    { date: "22/01", weight: 30.2 },
    { date: "29/01", weight: 30.5 },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Histórico & Evolução
          </h1>
          <p className="text-gray-600">Acompanhe o progresso do seu pet</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 bg-[#0F5A8A] hover:bg-[#0F5A8A]/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Plus className="h-5 w-5" />
          Registrar Hoje
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Novo Registro</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Peso (kg)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5A8A]"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5A8A]">
              <option>Energia: Alta</option>
              <option>Energia: Média</option>
              <option>Energia: Baixa</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5A8A]">
              <option>Apetite: Excelente</option>
              <option>Apetite: Bom</option>
              <option>Apetite: Regular</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5A8A]">
              <option>Fezes: Normal</option>
              <option>Fezes: Mole</option>
              <option>Fezes: Dura</option>
            </select>
          </div>
          <textarea
            placeholder="Observações (opcional)"
            className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5A8A]"
            rows={3}
          />
          <div className="flex gap-3 mt-4">
            <button className="bg-[#0F5A8A] hover:bg-[#0F5A8A]/90 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Salvar
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

      {/* Weight Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-[#0F5A8A]" />
          <h2 className="text-xl font-semibold text-gray-900">Evolução do Peso</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weightData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[29, 31]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#0F5A8A"
              strokeWidth={3}
              dot={{ fill: "#0F5A8A", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Peso Atual</h3>
          <p className="text-3xl font-bold text-gray-900">30.5kg</p>
          <p className="text-xs text-green-600 mt-1">↑ 1kg este mês</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Energia Média</h3>
          <p className="text-3xl font-bold text-gray-900">Alta</p>
          <p className="text-xs text-gray-500 mt-1">Últimos 7 dias</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Apetite</h3>
          <p className="text-3xl font-bold text-gray-900">Excelente</p>
          <p className="text-xs text-gray-500 mt-1">Consistente</p>
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="mt-6 bg-gradient-to-br from-[#0F5A8A]/10 to-[#D9A441]/10 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-2">💡 Sugestão da IA</h3>
        <p className="text-sm text-gray-700">
          Rex está ganhando peso de forma saudável! Continue com a dieta atual.
          Considere aumentar ligeiramente a atividade física para manter o peso
          ideal.
        </p>
      </div>
    </div>
  );
}
