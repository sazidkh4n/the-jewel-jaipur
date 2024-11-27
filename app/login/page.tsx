'use client';

import { Header } from '@/app/components/layout/header';
import { Navigation } from '@/app/components/layout/navigation';
import LoginForm from '@/app/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container py-8">
        <LoginForm />
      </main>
      <Navigation />
    </div>
  );
}