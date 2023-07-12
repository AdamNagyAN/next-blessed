import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { AxiosResponse } from 'axios';
import Link from 'next/link';
import { axiosBase } from '@/lib/axiosBase';
import { StrapiAllWrapper } from '@/types/strapi';
import GalleryProductDto from '@/types/GalleryProduct.dto';
import { siteConfig } from '@/config/siteConfig';
import FilterContainer from '@/app/shop/filter/filter-container';
import { CategoryDto } from '@/types/Category.dto';
import productClient from '@/service/productClient';
import formatPrice from '@/lib/formatPrice';
import { cn } from '@/lib/utils';
import { SearchParams } from '@/app/shop/types/SearchParams';
import { ImageOff } from 'lucide-react';

async function getProducts(searchParams: SearchParams) {
  console.log(searchParams);
  const products: AxiosResponse<StrapiAllWrapper<GalleryProductDto>> =
    await productClient.getAllProducts({
      subCategories: searchParams['sub-categories']
        ? JSON.parse(searchParams['sub-categories'])
        : [],
      price: searchParams.price ? JSON.parse(searchParams.price) : []
    });
  const categories: AxiosResponse<StrapiAllWrapper<CategoryDto>> =
    await axiosBase('/sub-categories');
  return { products: products.data, categories: categories.data };
}

export const metadata: Metadata = {
  title: 'Shop'
};

interface ShopProps {
  searchParams: SearchParams;
}

export default async function Shop({ searchParams }: ShopProps) {
  const { products, categories } = await getProducts(searchParams);
  return (
    <section>
      <div className="container">
        <h1 className="font-bold text-3xl text-center pb-8 mb-8 uppercase">
          Shop
        </h1>
        <FilterContainer
          key={JSON.stringify(searchParams)}
          categories={categories}
          searchParams={searchParams}
        />
        <div>
          <div className="grid grid-cols-1 grid-rows-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.data.length === 0 && (
              <div className="mx-auto text-center col-span-4">
                <h2>No products found</h2>
                <p>
                  Try changing your filters, or check back later for
                  new products
                </p>
              </div>
            )}
            {products.data.map((product) => (
              <Card
                key={product.id}
                product={product.attributes}
                id={product.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type CardProps = { product: GalleryProductDto } & { id: number };
function Card({ product, id }: CardProps) {
  const discountPercentage: number = product.newPrice
    ? 100 - (product.newPrice / product.price) * 100
    : 0;

  return (
    <Link href={`/product/${id}`}>
      <div className="group">
        <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
          {discountPercentage > 0 && (
            <div className="absolute top-2 right-0 bg-destructive text-destructive-foreground z-10 font-bold p-2">
              {Math.round(discountPercentage)}%
            </div>
          )}
          {product?.coverImage?.data?.attributes?.formats?.small
            ?.url ? (
            <Image
              src={new URL(
                product.coverImage.data.attributes.formats.small.url,
                process.env.NEXT_PUBLIC_STRAPI_URL
              ).toString()}
              sizes="500px"
              alt="Product"
              fill
              priority
              className="absolute top-0 left-0 group-hover:scale-110 transition-transform object-cover"
            />
          ) : (
            <div className="bg-accent w-full h-full flex items-center justify-center">
              <ImageOff className="w-1/5 h-1/5 stroke-accent-foreground" />
            </div>
          )}
        </div>
        <div className="text-center">
          <p className="mt-2 font-bold">{product.title}</p>
          <p>
            <span
              className={cn({
                'line-through mr-2':
                  !!product.newPrice && discountPercentage > 0
              })}>{`${product.price} ${siteConfig.currency}`}</span>
            {product.newPrice && discountPercentage > 0 && (
              <span className="text-destructive font-semibold">
                {formatPrice(product.newPrice)}
              </span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}
