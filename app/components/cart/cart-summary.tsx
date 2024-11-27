'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/app/hooks/use-cart';

export function CartSummary() {
  const { items } = useCart();
  
  const subtotal = items.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);
  
  const shipping = 100; // Fixed shipping cost
  const total = subtotal + shipping;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹{shipping.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{total.toLocaleString('en-IN')}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Proceed to Checkout</Button>
      </CardFooter>
    </Card>
  );
}