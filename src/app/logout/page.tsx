'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LogoutPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleLogout = async () => {
      // Chama a função de logout do Supabase
      await supabase.auth.signOut();
      
      // Redireciona o usuário para a página de login
      router.push('/login');
    };

    handleLogout();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Saindo...</p>
    </div>
  );
}
