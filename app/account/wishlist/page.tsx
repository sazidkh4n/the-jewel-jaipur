'use client';

import { Header } from '@/app/components/layout/header';
import { Navigation } from '@/app/components/layout/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 container py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              My Wishlist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Your wishlist is empty.</p>
          </CardContent>
        </Card>
      </main>

      <Navigation />
    </div>
  );
}