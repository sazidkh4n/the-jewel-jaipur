import { getProduct, getProducts } from '@/app/lib/wordpress';
import { Header } from '@/app/components/layout/header';
import { Navigation } from '@/app/components/layout/navigation';
import { ProductPageClient } from './product-page-client';

// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((product: { id: number }) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    const initialProduct = await getProduct(parseInt(params.id));

    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container py-8">
          <ProductPageClient initialProduct={initialProduct} productId={params.id} />
        </main>
        <Navigation />
      </div>
    );
  } catch (error) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container py-8">
          <div className="text-center text-red-500">
            Error loading product. Please try again later.
          </div>
        </main>
        <Navigation />
      </div>
    );
  }
}