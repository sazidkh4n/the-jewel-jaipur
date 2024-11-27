'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Minus, Plus, Heart } from 'lucide-react';
import useCart from '@/app/hooks/use-cart';

interface Product {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  description: string;
  images: Array<{ src: string }>;
  stock_status: string;
}

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(parseFloat(price));
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.src || '/placeholder.svg',
    });
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <Card className="overflow-hidden">
          <div className="aspect-square relative">
            <Image
              src={product.images[0]?.src || '/placeholder.svg'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </Card>
        <div className="grid grid-cols-4 gap-2">
          {product.images.slice(1).map((image, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={image.src}
                  alt={`${product.name} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">
              {formatPrice(product.price)}
            </span>
            {product.regular_price !== product.price && (
              <span className="text-lg line-through text-muted-foreground">
                {formatPrice(product.regular_price)}
              </span>
            )}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={product.stock_status === 'outofstock'}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={product.stock_status === 'outofstock'}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.stock_status === 'outofstock'}
                >
                  {product.stock_status === 'outofstock'
                    ? 'Out of Stock'
                    : 'Add to Cart'}
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="prose prose-sm max-w-none">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <div
            dangerouslySetInnerHTML={{ __html: product.description }}
            className="text-muted-foreground"
          />
        </div>
      </div>
    </div>
  );
}