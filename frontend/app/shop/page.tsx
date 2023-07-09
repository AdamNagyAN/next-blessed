import React from 'react';
import Image from 'next/image';
import { axiosBase } from '@/lib/axiosBase';
import { StrapiAllWrapper } from '@/types/strapi';
import GalleryProductDto from '@/types/GalleryProduct.dto';
import { Metadata } from 'next';
import { siteConfig } from '@/config/siteConfig';
import Link from 'next/link';
import FilterContainer from '@/app/shop/filter/FilterContainer';

async function getProducts(): Promise<StrapiAllWrapper<GalleryProductDto>> {
  const products = await axiosBase('/products?populate[0]=coverImage');
  return products.data;
}

export const metadata: Metadata = {
  title: 'Shop'
};

export default async function Shop() {
  const products = await getProducts();
  return (
    <section>
      <div className="container">
        <h1 className="font-bold text-3xl text-center pb-8 mb-8 uppercase">Shop</h1>
        <div className="flex w-full justify-between gap-8 mb-8 border-1 border p-8 rounded-lg">
          <FilterContainer />
        </div>
        <div>
          <div className="grid grid-cols-1 grid-rows-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.data.map((product) => (
              <Card key={product.id} product={product.attributes} id={product.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type CardProps = { product: GalleryProductDto } & { id: number };
function Card({ product, id }: CardProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className="group">
        <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
          <Image
            src={new URL(
              product.coverImage.data.attributes.formats.small.url,
              process.env.NEXT_PUBLIC_STRAPI_URL
            ).toString()}
            alt="Product"
            layout="fill"
            objectFit="cover"
            className="absolute top-0 left-0 group-hover:scale-110 transition-transform"
          />
        </div>
        <div className="text-center">
          <p className="mt-2 font-bold">{product.title}</p>
          <p>{`${product.price} ${siteConfig.currency}`} </p>
        </div>
      </div>
    </Link>
  );
}
