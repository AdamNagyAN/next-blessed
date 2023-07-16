'use client';
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  images: any;
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const imagesToShow = images.data?.map((image: any) => ({
    thumbnail: new URL(
      image.attributes.formats.thumbnail.url,
      process.env.NEXT_PUBLIC_STRAPI_URL
    ).toString(),
    original: new URL(
      image.attributes.formats.large.url,
      process.env.NEXT_PUBLIC_STRAPI_URL
    ).toString()
  }));

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff'
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}>
        {imagesToShow?.map((image: any, index: number) => (
          <SwiperSlide key={index}>
            <Image
              className="top-0 left-0 aspect-[3/4] object-cover"
              width={500}
              height={700}
              alt="Product"
              src={image.original}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        className="mt-4"
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]}>
        {imagesToShow?.map((image: any, index: number) => (
          <SwiperSlide key={index}>
            <Image
              className={cn('top-0 left-0 aspect-[3/4] object-cover')}
              width={75}
              height={75}
              alt="Product"
              src={image.thumbnail}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageCarousel;
