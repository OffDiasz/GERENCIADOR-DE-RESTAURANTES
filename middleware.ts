import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Pega o token de autenticação do cookie
  const authToken = request.cookies.get('auth_token')?.value;

  // Se não houver token, redireciona para a página de login
  if (!authToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se houver token, permite o acesso
  return NextResponse.next();
}

// O middleware será aplicado a todas as rotas que começam com /dashboard
export const config = {
  matcher: ['/dashboard/:path*'],
};