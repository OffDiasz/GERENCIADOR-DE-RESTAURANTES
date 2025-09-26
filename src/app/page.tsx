'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error('Erro ao fazer login: ' + error.message);
    } else {
      toast.success('Login bem-sucedido!');
      router.push('/dashboard');
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error('Erro ao cadastrar: ' + error.message);
    } else {
      toast.success('Registro bem-sucedido! Verifique seu e-mail para confirmar.');
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Entrar ou Cadastrar</CardTitle>
          <CardDescription>Use seu e-mail e senha para acessar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="grid gap-4">
            <Input
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSignUp}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
