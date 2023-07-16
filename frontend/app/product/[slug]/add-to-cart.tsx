'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { cartActions } from '@/store/slices/cart.slice';

interface AddToCartProps {
  id: number;
}

const AddToCart: React.FC<AddToCartProps> = ({ id }) => {
  const dispatch = useDispatch();

  const onAddToCart = () => {
    dispatch(
      cartActions.addToCart({
        id,
        size: 'M',
        quantity: 1
      })
    );
  };

  return (
    <Button className="mt-6" onClick={onAddToCart}>
      Add to cart
    </Button>
  );
};

export default AddToCart;
