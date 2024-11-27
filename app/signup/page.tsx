'use client';

import { Header } from '@/app/components/layout/header';
import { Navigation } from '@/app/components/layout/navigation';
import SignUpForm from '@/app/components/auth/signup-form';

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container py-8">
        <SignUpForm />
      </main>
      <Navigation />
    </div>
  );
}