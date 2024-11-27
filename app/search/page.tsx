'use client';

import { Header } from '@/app/components/layout/header';
import { Navigation } from '@/app/components/layout/navigation';
import ProductList from '@/app/components/products/product-list';

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <ProductList />
      </main>
      <Navigation />
    </div>
  );
}