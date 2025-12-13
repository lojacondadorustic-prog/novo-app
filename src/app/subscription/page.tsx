"use client";

import { useState } from "react";
import { Check, Sparkles, Crown, Zap, X } from "lucide-react";
import Link from "next/link";

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  icon: any;
  color: string;
  popular?: boolean;
}

export default function SubscriptionPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const plans: Plan[] = [
    {
      id: "essencial",
      name: "Plano Essencial",
      price: "19,90",
      description: "Ideal para começar com o básico",
      icon: Sparkles,
      color: "from-gray-500 to-gray-600",
      features: [
        "10 gerações de dieta/mês",
        "Acesso ao Pantry Inteligente",
        "Quick Generate",
        "Exportação simples em PDF",
        "Suporte via e-mail",
      ],
    },
    {
      id: "plus",
      name: "Plano Plus",
      price: "39,90",
      description: "Recomendado para donos dedicados",
      icon: Crown,
      color: "from-[#D9A441] to-[#D9A441]/80",
      popular: true,
      features: [
        "Gerações ilimitadas",
        "Plano Semanal destravado",
        "Dietas otimizadas por IA avançada",
        "Vet Connect",
        "Exportação premium em PDF",
        "Substituição automática de ingredientes tóxicos",
      ],
    },
    {
      id: "pro-master",
      name: "Plano Pro Master",
      price: "79,90",
      description: "Máximo cuidado e tecnologia",
      icon: Zap,
      color: "from-[#0F5A8A] to-[#0F5A8A]/80",
      features: [
        "Tudo dos planos anteriores",
        "Ajustes nutricionais personalizados",
        "Relatórios semanais automáticos",
        "PDFs profissionais",
        "Suporte prioritário",
        "Acesso antecipado a novos recursos",
      ],
    },
  ];

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
    setShowSuccess(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setName("");
    setEmail("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan || !name || !email) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    setIsProcessing(true);

    // Simula processamento
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Salva no localStorage
    const subscription = {
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      price: selectedPlan.price,
      userName: name,
      userEmail: email,
      timestamp: new Date().toISOString(),
    };

    const existingSubscriptions = JSON.parse(
      localStorage.getItem("subscriptions") || "[]"
    );
    existingSubscriptions.push(subscription);
    localStorage.setItem("subscriptions", JSON.stringify(existingSubscriptions));

    console.log("✅ Assinatura registrada:", subscription);

    setIsProcessing(false);
    setShowModal(false);
    setShowSuccess(true);
    setName("");
    setEmail("");
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Escolha o plano ideal para seu pet
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Planos criados para oferecer saúde, praticidade e tecnologia no cuidado alimentar do seu cão.
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="max-w-2xl mx-auto mb-8 bg-green-50 border-2 border-green-500 rounded-xl p-6 shadow-lg animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-start gap-4">
              <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
                <Check className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-green-900 mb-2">
                  Assinatura registrada com sucesso!
                </h3>
                <p className="text-green-800 mb-4">
                  Parabéns! Sua assinatura do <strong>{selectedPlan?.name}</strong> foi
                  confirmada. Em breve você receberá um email de confirmação.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="text-green-700 hover:text-green-900 font-medium underline"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  plan.popular ? "border-4 border-[#D9A441] md:scale-110" : "border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D9A441] to-[#D9A441]/80 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ RECOMENDADO
                  </div>
                )}

                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${plan.color} mb-4`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    R$ {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">/ mês</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#4DAF7C] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-[#D9A441] to-[#D9A441]/80 text-white hover:from-[#D9A441]/90 hover:to-[#D9A441]/70 shadow-lg"
                      : "bg-[#0F5A8A] text-white hover:bg-[#0F5A8A]/90"
                  }`}
                >
                  Assinar {plan.name.split(" ")[1]}
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {showModal && selectedPlan && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Finalizar Assinatura
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-[#0F5A8A]/10 to-[#0F5A8A]/5 rounded-xl p-4 mb-6 border border-[#0F5A8A]/20">
                <p className="text-sm text-gray-600 mb-1">Plano selecionado:</p>
                <p className="text-lg font-bold text-gray-900">{selectedPlan.name}</p>
                <p className="text-2xl font-bold text-[#0F5A8A] mt-2">
                  R$ {selectedPlan.price}/mês
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F5A8A] focus:border-transparent transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F5A8A] focus:border-transparent transition-all"
                    placeholder="seu@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-[#0F5A8A] to-[#0F5A8A]/80 hover:from-[#0F5A8A]/90 hover:to-[#0F5A8A]/70 text-white py-3 px-6 rounded-lg font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processando...
                    </span>
                  ) : (
                    "Confirmar Assinatura"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-[#0F5A8A] hover:text-[#0F5A8A]/80 font-medium transition-colors"
          >
            ← Voltar ao Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
