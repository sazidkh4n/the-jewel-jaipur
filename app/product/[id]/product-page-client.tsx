'use client';

import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/app/lib/wordpress';
import { ProductDetail } from '@/app/components/products/product-detail';
import { Loader2 } from 'lucide-react';

interface ProductPageClientProps {
  initialProduct: any;
  productId: string;
}

export function ProductPageClient({ initialProduct, productId }: ProductPageClientProps) {
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(parseInt(productId)),
    initialData: initialProduct,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <ProductDetail product={product} />;
}