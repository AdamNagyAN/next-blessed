import { StrapiImageFormat, StrapiOneWrapper } from '@/types/strapi';

interface CartProductDto {
  title: string;
  description: string;
  price: number;
  newPrice: number | null;
  category: StrapiOneWrapper<{ name: string }>;
  sub_category: StrapiOneWrapper<{ name: string }>;
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

export default CartProductDto;
