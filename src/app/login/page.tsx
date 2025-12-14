'use client';

import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={() =>
          supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/dashboard`,
            },
          })
        }
      >
        Entrar com Google
      </button>
    </div>
  );
}


        
