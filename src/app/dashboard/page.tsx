"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  ChefHat, 
  Calendar, 
  TrendingUp, 
  ShoppingBag, 
  Zap, 
  Package,
  Stethoscope,
  AlertCircle,
  Sparkles,
  LogOut,
  User,
  Settings
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticação
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    // Listener para mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        router.push('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#0F5A8A] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Mock data - em produção viria de API/database
  const pet = {
    name: "Rex",
    breed: "Golden Retriever",
    age: 3,
    weight: 30,
    photo: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=400&fit=crop",
  };

  const quickActions = [
    {
      title: "Gerar Dieta",
      description: "Crie uma dieta personalizada com IA",
      icon: ChefHat,
      href: "/generate",
      color: "from-[#0F5A8A] to-[#0F5A8A]/80",
    },
    {
      title: "Quick Generate",
      description: "Gere uma receita em 1 clique",
      icon: Zap,
      href: "/quick",
      color: "from-[#D9A441] to-[#D9A441]/80",
    },
    {
      title: "Pantry",
      description: "Gerencie seus ingredientes",
      icon: Package,
      href: "/pantry",
      color: "from-[#4DAF7C] to-[#4DAF7C]/80",
    },
    {
      title: "Plano Semanal",
      description: "Organize a semana toda",
      icon: Calendar,
      href: "/weekly",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Modo Cozinha",
      description: "Cozinhe com assistência",
      icon: ChefHat,
      href: "/kitchen",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Evolução",
      description: "Acompanhe o progresso",
      icon: TrendingUp,
      href: "/history",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Vet Connect",
      description: "Compartilhe com veterinário",
      icon: Stethoscope,
      href: "/vet",
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Marketplace",
      description: "Produtos e suplementos",
      icon: ShoppingBag,
      href: "/market",
      color: "from-pink-500 to-pink-600",
    },
  ];

  const recentActivities = [
    { action: "Dieta gerada", detail: "Receita de frango com batata doce", time: "2h atrás" },
    { action: "Ingrediente adicionado", detail: "Cenoura orgânica", time: "5h atrás" },
    { action: "Peso atualizado", detail: "30kg registrado", time: "1 dia atrás" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header com User Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard NutriDog Pro</h1>
            <p className="text-gray-600">Bem-vindo de volta, <span className="font-semibold">{user.email}</span></p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/profile')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all shadow-sm hover:shadow"
            >
              <User className="h-4 w-4" />
              Perfil
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-sm hover:shadow"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>

        {/* Hero Section - Pet Profile Card */}
        <div className="bg-gradient-to-br from-[#0F5A8A] to-[#0F5A8A]/90 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={pet.photo}
                alt={pet.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white/30 shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-[#D9A441] rounded-full p-2.5 shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-4xl sm:text-5xl font-bold mb-3">{pet.name}</h2>
              <p className="text-white/90 text-lg mb-5">
                {pet.breed} • {pet.age} anos • {pet.weight}kg
              </p>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <Link
                  href="/generate"
                  className="inline-flex items-center gap-2 bg-[#D9A441] hover:bg-[#D9A441]/90 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  <Sparkles className="h-5 w-5" />
                  Gerar Dieta com IA
                </Link>
                <Link
                  href="/subscription"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all backdrop-blur-sm border border-white/30"
                >
                  Ver Planos Premium
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Alert - Ingredientes Perigosos */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-lg p-5 mb-8 shadow-md">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-orange-900 mb-1 text-lg">
                ⚠️ Atenção: Ingrediente Perigoso Detectado
              </h3>
              <p className="text-sm text-orange-800">
                Detectamos <strong>chocolate</strong> no seu pantry. Este alimento é tóxico para cães.
                <Link href="/pantry" className="ml-2 underline font-semibold hover:text-orange-900">
                  Ver detalhes e remover →
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Dietas Geradas</span>
              <div className="p-2 bg-blue-50 rounded-lg">
                <ChefHat className="h-6 w-6 text-[#0F5A8A]" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">12</p>
            <p className="text-sm text-green-600 font-medium">↑ +3 esta semana</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Ingredientes</span>
              <div className="p-2 bg-green-50 rounded-lg">
                <Package className="h-6 w-6 text-[#4DAF7C]" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">24</p>
            <p className="text-sm text-blue-600 font-medium">8 disponíveis agora</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Peso Atual</span>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-[#D9A441]" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">{pet.weight}kg</p>
            <p className="text-sm text-green-600 font-medium">↑ +0.5kg este mês</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6 text-[#D9A441]" />
              Acesso Rápido
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="group relative bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`} />
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${action.color} mb-4 shadow-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#0F5A8A] transition-colors text-lg">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-[#0F5A8A]" />
              Atividades Recentes
            </h2>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-[#0F5A8A]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{activity.action}</p>
                      <p className="text-sm text-gray-600 truncate">{activity.detail}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/history"
                className="mt-4 block text-center text-sm font-semibold text-[#0F5A8A] hover:text-[#0F5A8A]/80 transition-colors"
              >
                Ver todas as atividades →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
