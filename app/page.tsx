'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, getCategories } from './lib/wordpress';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Header } from './components/layout/header';
import { Navigation } from './components/layout/navigation';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const { data: products, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => getProducts(selectedCategory ? { category: selectedCategory } : undefined),
  });

  const isLoading = categoriesLoading || productsLoading;
  const error = categoriesError || productsError;

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container py-8">
          <div className="text-center text-red-500">
            Error loading data. Please try again later.
          </div>
        </main>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 container py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {isLoading ? (
              <div className="flex items-center justify-center w-full py-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              categories?.map((category: any) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id.toString())}
                  variant={selectedCategory === category.id.toString() ? 'default' : 'outline'}
                  className="flex-shrink-0"
                >
                  {category.name}
                </Button>
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : products?.length === 0 ? (
            <p className="text-center text-muted-foreground">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products?.map((product: any) => (
                <Link
                  href={`/product/${product.id}`}
                  key={product.id}
                  className="group relative"
                >
                  <div className="aspect-square relative overflow-hidden rounded-lg">
                    <Image
                      src={product.images[0]?.src || '/placeholder.svg'}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="font-semibold text-sm">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ₹{parseFloat(product.price).toLocaleString('en-IN')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Navigation />
    </div>
  );
}