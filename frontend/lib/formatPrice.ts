import { siteConfig } from '@/config/siteConfig';

const formatPrice = (price: number) => {
  return `${price} ${siteConfig.currency}`;
};

export default formatPrice;
