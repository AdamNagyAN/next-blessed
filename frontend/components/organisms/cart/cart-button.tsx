'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCartIcon } from 'lucide-react';
import { getCart } from '@/store/selectors/cart.selector';
import { useSelector } from 'react-redux';
import { Badge } from '@/components/ui/badge';

const CartButton = () => {
  const cart = useSelector(getCart);
  return (
    <Button variant="outline" size="icon" className="relative">
      <ShoppingCartIcon className="h-[1.2rem] w-[1.2rem]" />
      <Badge className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 px-2">
        {cart.cart.length}
      </Badge>
    </Button>
  );
};

export default CartButton;
