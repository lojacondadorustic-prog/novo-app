"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Sparkles } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Verificar se usuário está autenticado
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Se autenticado, redireciona para dashboard
        router.push('/dashboard');
      } else {
        // Se não autenticado, redireciona para login
        router.push('/login');
      }
    });
  }, [router]);

  // Loading state enquanto verifica autenticação
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="text-center">
        <div className="inline-flex p-4 bg-gradient-to-br from-[#0F5A8A] to-[#0F5A8A]/80 rounded-full mb-6 shadow-xl">
          <Sparkles className="h-12 w-12 text-white animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">NutriDog Pro</h1>
        <p className="text-gray-600 mb-6">Nutrição Inteligente para seu Pet</p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#0F5A8A] mx-auto"></div>
        <p className="text-sm text-gray-500 mt-4">Carregando...</p>
      </div>
    </div>
  );
}
