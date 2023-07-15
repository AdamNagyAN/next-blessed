'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { cartActions } from '@/store/slices/cart.slice';

const AddToCart = () => {
  const dispatch = useDispatch();

  const onAddToCart = () => {
    dispatch(
      cartActions.addToCart({
        id: 1,
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
