import { AxiosPromise } from 'axios';
import * as qs from 'qs';
import { StrapiAllWrapper } from '@/types/strapi';
import GalleryProductDto from '@/types/GalleryProduct.dto';
import { axiosBase } from '@/lib/axiosBase';

type getAllProductsParams = {
  subCategories?: string[];
  price?: number[];
};
const getAllProducts = ({
  subCategories = [],
  price = []
}: getAllProductsParams): AxiosPromise<StrapiAllWrapper<GalleryProductDto>> => {
  const query = qs.stringify({
    filters: {
      sub_category: {
        name: {
          $eqi: [subCategories]
        }
      },
      price: {
        $between: price
      }
    }
  });
  console.log(query);
  console.log(`/products?populate[0]=coverImage&${query}`);

  return axiosBase(`/products?populate[0]=coverImage&${query}`);
};

const productClient = {
  getAllProducts
};

export default productClient;
