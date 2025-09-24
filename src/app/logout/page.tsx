'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { destroyCookie } from 'nookies';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    destroyCookie(null, 'auth_token', { path: '/' });
    router.push('/login');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Saindo...</p>
    </div>
  );
}