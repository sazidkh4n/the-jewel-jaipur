'use client';

import Link from 'next/link';
import { Home, Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut } from "@clerk/nextjs";

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="flex justify-around p-2">
        <Link href="/">
          <Button variant="ghost" size="sm" className="flex flex-col items-center">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
        </Link>
        <Link href="/search">
          <Button variant="ghost" size="sm" className="flex flex-col items-center">
            <Search className="h-5 w-5" />
            <span className="text-xs">Search</span>
          </Button>
        </Link>
        <Link href="/cart">
          <Button variant="ghost" size="sm" className="flex flex-col items-center">
            <ShoppingCart className="h-5 w-5" />
            <span className="text-xs">Cart</span>
          </Button>
        </Link>
        <SignedIn>
          <Link href="/account">
            <Button variant="ghost" size="sm" className="flex flex-col items-center">
              <User className="h-5 w-5" />
              <span className="text-xs">Account</span>
            </Button>
          </Link>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Button variant="ghost" size="sm" className="flex flex-col items-center">
              <User className="h-5 w-5" />
              <span className="text-xs">Sign In</span>
            </Button>
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
}