import React from 'react';
import { axiosBase } from '@/lib/axiosBase';
import { StrapiOneWrapper } from '@/types/strapi';
import { ProductDto } from '@/types/Product.dto';
import { cn } from '@/lib/utils';
import ImageCarousel from '@/app/product/[slug]/image-carousel';
import { siteConfig } from '@/config/siteConfig';
import formatPrice from '@/lib/formatPrice';
import AddToCart from '@/app/product/[slug]/add-to-cart';
import StoreProvider from '@/store/store-provider';

export async function getProduct(
  slug: string
): Promise<StrapiOneWrapper<ProductDto>> {
  const response = await axiosBase.get(
    `/products/${slug}?populate=*`
  );
  return response.data;
}

type PageProps = { params: { slug: string } };
export async function Page({ params }: PageProps) {
  const { slug } = params;
  const { data } = await getProduct(slug);
  const {
    attributes: { newPrice, price }
  } = data;
  const discountPercentage: number = newPrice
    ? 100 - (newPrice / price) * 100
    : 0;

  console.log(data);
  return (
    <main>
      <div className="container">
        <div className="grid grid-cols-2 justify-items-center">
          <div className="w-full h-full max-w-md">
            <ImageCarousel images={data.attributes.images} />
          </div>
          <div className="w-full">
            <h1 className="font-bold text-xl mb-2">
              {data.attributes.title}
            </h1>
            <span>
              <span
                className={cn({
                  'line-through mr-2':
                    !!newPrice && discountPercentage > 0
                })}>{`${price} ${siteConfig.currency}`}</span>
              {newPrice && discountPercentage > 0 && (
                <span className="text-destructive font-semibold">
                  {formatPrice(newPrice)}
                </span>
              )}
            </span>
            <div className="mt-6">
              <h2 className={cn('text-lg border-0')}>Description:</h2>
              <p className="text-sm">
                {data.attributes.description.split('\n')}
              </p>
            </div>
            <StoreProvider>
              <AddToCart />
            </StoreProvider>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
