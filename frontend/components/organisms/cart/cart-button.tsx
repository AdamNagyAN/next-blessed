'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCartIcon } from 'lucide-react';
import { getCart } from '@/store/selectors/cart.selector';
import { useSelector } from 'react-redux';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger
} from '@/components/ui/sheet';
import CartProduct from '@/components/organisms/cart/cart-product';
import { useQuery } from 'react-query';
import productClient from '@/service/productClient';
import CartProductsSkeleton from '@/components/organisms/cart/cart-products-skeleton';
import { StrapiItem } from '@/types/strapi';
import CartProductDto from '@/service/dto/CartProduct.dto';
import { Separator } from '@/components/ui/separator';
import formatPrice from '@/lib/formatPrice';

const CartButton = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const { cart } = useSelector(getCart);

  const cartIds = cart.map((cartItem) => cartItem.id);
  const { data: cartForFetch, isLoading: isCartProductsLoading } =
    useQuery(
      ['product', JSON.stringify(cartIds)],
      async () => (await productClient.getForCart(cartIds)).data.data
    );

  const cartProducts = React.useMemo(() => {
    return cart
      .filter((cartItem) =>
        cartForFetch?.some(
          (fetchedItem) => fetchedItem.id === cartItem.id
        )
      )
      .map((cartItem) => {
        const relatedProduct = cartForFetch?.find(
          (fetchedItem) => fetchedItem.id === cartItem.id
        ) as StrapiItem<CartProductDto>;
        return {
          id: relatedProduct.id,
          attributes: {
            ...relatedProduct.attributes,
            quantity: cartItem.quantity,
            size: cartItem.size
          }
        };
      });
  }, [cartForFetch, cart]);

  React.useEffect(() => {
    setIsLoading(false);
  }, [cart]);

  const subTotal = React.useMemo(() => {
    return cartProducts.reduce(
      (acc, cartItem) =>
        acc +
        (cartItem.attributes.newPrice ?? cartItem.attributes.price) *
          cartItem.attributes.quantity,
      0
    );
  }, [cartProducts]);
  const shippingPrice = 0;

  if (isLoading) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCartIcon className="h-[1.2rem] w-[1.2rem]" />
          {cart.length > 0 && !isLoading && (
            <Badge
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 px-2"
              key={cart.length}>
              {cart.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[500px] sm:max-w-none">
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 mt-2 pb-2 border-b">
          <span className="text-lg font-bold">Cart</span>
          <span className="text-secondary-foreground text-sm">
            {cart.length} items
          </span>
        </SheetHeader>

        {cart.length === 0 ? (
          <SheetDescription className="flex flex-col items-center justify-center pt-10">
            <h3 className="text-lg font-bold text-center">
              Your cart is empty
            </h3>
            <p className="text-center">
              Add some products in the cart to checkout.
            </p>
          </SheetDescription>
        ) : (
          <SheetDescription>
            {!cartProducts && isCartProductsLoading ? (
              <CartProductsSkeleton />
            ) : (
              cartProducts.map((cartItem) => (
                <CartProduct key={cartItem.id} product={cartItem} />
              ))
            )}
          </SheetDescription>
        )}
        {cart.length !== 0 && (
          <SheetFooter className="w-full flex-col sm:flex-col sm:space-x-0">
            <div className="flex justify-between items-center">
              <h4>Subtotal:</h4>
              <span>{formatPrice(subTotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <h4>Shipping:</h4>
              <span>
                {shippingPrice === 0
                  ? 'Free'
                  : formatPrice(shippingPrice)}
              </span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Total:</h4>
              <span>{formatPrice(subTotal + shippingPrice)}</span>
            </div>
            <Button className="my-2">Check out</Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartButton;
