'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/layout/header';
import { Navigation } from '@/app/components/layout/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Package, Heart } from 'lucide-react';
import { useUser } from "@clerk/nextjs";

export default function AccountPage() {
  const { user } = useUser();
  const router = useRouter();

  const menuItems = [
    { icon: Package, label: 'My Orders', href: '/account/orders' },
    { icon: Heart, label: 'Wishlist', href: '/account/wishlist' },
    { icon: User, label: 'Profile Settings', href: '/account/settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 container py-8">
        <Card>
          <CardHeader>
            <CardTitle>My Account</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{user?.fullName || user?.username}</p>
                <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => router.push(item.href)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </main>

      <Navigation />
    </div>
  );
}