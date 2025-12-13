"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dog } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se já está autenticado
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/');
      } else {
        setLoading(false);
      }
    });

    // Listener para mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F5A8A] to-[#0F5A8A]/80">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F5A8A] to-[#0F5A8A]/80 px-4">
      <div className="max-w-md w-full">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
            <Dog className="h-8 w-8 text-[#0F5A8A]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">NutriDog Pro</h1>
          <p className="text-white/80">Nutrição Inteligente para seu Pet</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Entrar na sua conta
          </h2>
          
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#0F5A8A',
                    brandAccent: '#0F5A8A',
                  },
                },
              },
              className: {
                container: 'auth-container',
                button: 'auth-button',
                input: 'auth-input',
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  email_input_placeholder: 'seu@email.com',
                  password_input_placeholder: 'Sua senha',
                  button_label: 'Entrar',
                  loading_button_label: 'Entrando...',
                  social_provider_text: 'Entrar com {{provider}}',
                  link_text: 'Já tem uma conta? Entre',
                },
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  email_input_placeholder: 'seu@email.com',
                  password_input_placeholder: 'Sua senha',
                  button_label: 'Criar conta',
                  loading_button_label: 'Criando conta...',
                  social_provider_text: 'Criar conta com {{provider}}',
                  link_text: 'Não tem uma conta? Cadastre-se',
                },
                forgotten_password: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  email_input_placeholder: 'seu@email.com',
                  button_label: 'Enviar instruções',
                  loading_button_label: 'Enviando...',
                  link_text: 'Esqueceu sua senha?',
                },
              },
            }}
            providers={['google', 'github']}
            redirectTo={`${window.location.origin}/`}
          />
        </div>

        {/* Footer */}
        <p className="text-center text-white/60 text-sm mt-6">
          Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
        </p>
      </div>
    </div>
  );
}
