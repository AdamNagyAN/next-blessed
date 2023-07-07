import { StrapiAllWrapper, StrapiImageFormat } from '@/types/strapi';

type Category = Omit<
  StrapiAllWrapper<{
    name: string;
  }>,
  'meta'
>;

export interface ProductDto {
  title: string;
  description: string;
  price: number;
  newPrice: number | null;
  images: {
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
    }[];
  };
  categories: Category;
  sub_categories: Category;
}
