import { IProduct } from './product';
import { IAddress } from './address';
import { IPayment } from './payment';

export interface IWishlist {
  title: string;
  description: string;
  origin: string;
  preview: string;
  address: IAddress;
  showAddress: boolean;
  products: IProduct[];
  payments: IPayment[];
  contacts: string[];
}
