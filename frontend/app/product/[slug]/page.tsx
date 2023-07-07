import React from 'react';
import { axiosBase } from '@/lib/axiosBase';
import { StrapiOneWrapper } from '@/types/strapi';
import { ProductDto } from '@/types/Product.dto';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ImageCarousel from '@/app/product/[slug]/image-carousel';

export async function getProduct(slug: string): Promise<StrapiOneWrapper<ProductDto>> {
  const response = await axiosBase.get(`/products/${slug}?populate=*`);
  return response.data;
}

type PageProps = { params: { slug: string } };
export async function Page({ params }: PageProps) {
  const { slug } = params;
  const { data } = await getProduct(slug);
  console.log(data);
  return (
    <main>
      <div className="container">
        <div className="grid grid-cols-2 justify-items-center">
          <div className="w-full h-full max-w-md">
            <ImageCarousel images={data.attributes.images} />
          </div>
          <div className="w-full">
            <h1 className="font-bold text-xl mb-2">{data.attributes.title}</h1>
            <span>{data.attributes.price} Ft</span>
            <div className="mt-6">
              <h2 className={cn('text-lg border-0')}>Description:</h2>
              <p className="text-sm">{data.attributes.description.split('\n')}</p>
            </div>
            <div className="flex gap-3 mt-6 items-center">
              <h2 className={cn('text-lg border-0 pb-0')}>Tags: </h2>
              {data.attributes.categories.data.map((category) => (
                <Badge key={category.id}>{category.attributes.name}</Badge>
              ))}
              {data.attributes.sub_categories.data.map((category) => (
                <Badge key={category.id}>{category.attributes.name}</Badge>
              ))}
            </div>
            <Button className="mt-6">Add to cart</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
