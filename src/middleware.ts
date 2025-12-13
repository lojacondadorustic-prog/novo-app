import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Pegar token do cookie
  const token = request.cookies.get('sb-access-token')?.value;

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/login'];
  const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  // Se é rota pública, deixa passar
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Verificar se tem sessão válida
  if (token) {
    const { data: { user } } = await supabase.auth.getUser(token);
    
    if (user) {
      return NextResponse.next();
    }
  }

  // Se não está autenticado, redireciona para login
  const loginUrl = new URL('/login', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
