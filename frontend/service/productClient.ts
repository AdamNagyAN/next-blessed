import { AxiosPromise } from 'axios';
import * as qs from 'qs';
import { StrapiAllWrapper } from '@/types/strapi';
import GalleryProductDto from '@/types/GalleryProduct.dto';
import { axiosBase } from '@/lib/axiosBase';
import CartProductDto from '@/service/dto/CartProduct.dto';

type getAllProductsParams = {
  page: number;
  subCategories?: string[];
  price?: number[];
};
const getAllProducts = ({
  page,
  subCategories = [],
  price = []
}: getAllProductsParams): AxiosPromise<
  StrapiAllWrapper<GalleryProductDto>
> => {
  const query = qs.stringify({
    pagination: {
      page: page,
      pageSize: 12
    },
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

  return axiosBase(`/products?populate[0]=coverImage&${query}`);
};

const getForCart = (
  idList: number[]
): AxiosPromise<StrapiAllWrapper<CartProductDto>> => {
  const query = qs.stringify({
    filters: {
      id: {
        $eq: idList
      }
    },
    populate: ['coverImage', 'category', 'sub_category']
  });
  return axiosBase(`/products?${query}`);
};

const productClient = {
  getAllProducts,
  getForCart
};

export default productClient;
