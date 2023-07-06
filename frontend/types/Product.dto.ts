import { StrapiImageFormat } from '@/types/strapi';

export default interface ProductDto {
  title: string;
  description: string;
  price: number;
  newPrice: number;
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
