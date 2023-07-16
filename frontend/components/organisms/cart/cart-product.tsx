import React from 'react';
import CartCounter from '@/components/organisms/cart/cart-counter';
import formatPrice from '@/lib/formatPrice';
import Image from 'next/image';
import { StrapiItem } from '@/types/strapi';
import CartProductDto from '@/service/dto/CartProduct.dto';

interface CartProductProps {
  product: StrapiItem<
    CartProductDto & { size: string; quantity: number }
  >;
}

const CartProduct: React.FC<CartProductProps> = ({ product }) => {
  const {
    id,
    attributes: {
      newPrice,
      price: attributesPrice,
      coverImage,
      category,
      sub_category,
      quantity,
      size,
      title: attributesTitle
    }
  } = product;

  const title = `${attributesTitle} (${size})`;
  const subtitle = `${category?.data.attributes.name ?? 'All'} > 
  ${sub_category?.data.attributes.name ?? 'All'}`;
  const price = newPrice ?? attributesPrice;

  const imageUrl = coverImage?.data.attributes.formats.thumbnail.url
    ? new URL(
        coverImage.data.attributes.formats.thumbnail.url,
        process.env.NEXT_PUBLIC_STRAPI_URL
      ).toString()
    : undefined;

  return (
    <div className="flex py-2 border-b justify-between items-center">
      <div className="flex">
        <div className="w-[70px] relative aspect-[4/5]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              layout="fill"
              className="object-cover rounded-md"
            />
          ) : (
            <div className="w-full h-full bg-gray-200"></div>
          )}
        </div>
        <div className="flex flex-col justify-between py-1 ml-2">
          <div>
            <p className="text-primary font-semibold">{title}</p>
            <p className="text-xs">{subtitle}</p>
          </div>
          <p>
            {`${formatPrice(price)} x ${quantity} = ${formatPrice(
              price * quantity
            )}`}
          </p>
        </div>
      </div>
      <div>
        <CartCounter id={id} size={size} quantity={quantity} />
      </div>
    </div>
  );
};

export default CartProduct;
