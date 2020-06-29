export interface IProduct {
  category: number;
  id: number;
  title: string;
  subTitle?: string;
  price: number;
  priceOld?: number;
  description: string;
  photos: string[];
}
