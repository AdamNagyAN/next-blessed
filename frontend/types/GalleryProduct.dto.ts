import { StrapiImageFormat } from '@/types/strapi';

export default interface GalleryProductDto {
  title: string;
  description: string;
  price: number;
  newPrice: number | null;
  coverImage: {
    data: {
      id: number;
      attributes: StrapiImageFormat & {
        formats: {
          thumbnail: StrapiImageFormat;
          small: StrapiImageFormat;
          medium: StrapiImageFormat;
          large: StrapiImageFormat;
        };
      };
    };
  };
}
