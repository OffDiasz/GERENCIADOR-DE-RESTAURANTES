/* Estava com dificuldades para fazer a página do login carregar, então 
foi feita uma api para realizar o processo da transcição do login para o 
dashbboard */


import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  const hardcodedUser = 'admin';
  const hardcodedPass = 'password';

  if (username === hardcodedUser && password === hardcodedPass) {
    const token = 'your-simple-token';
    const response = NextResponse.json({ success: true });

    // Define o cookie diretamente no cabeçalho da resposta
    
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return response;
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
