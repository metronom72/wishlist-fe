import { IProduct } from './product';
import { IAddress } from './address';

export interface IWishlist {
  title: string;
  description: string;
  origin: string;
  preview: string;
  address: IAddress;
  products: IProduct[];
}
