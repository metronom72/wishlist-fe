interface IAttributes {
  title: string | null;
  description: string | null;
  country: string | null;
  city: string | null;
  house: string | null;
  apartment: string | null;
  zipCode: string | null;
  rawAddress: string | null;
  addressComment: string | null;
  showAddress: boolean;
  status: string;
  contacts: any;
  wishlistProducts: any;
  products: any;
}

export interface IWishlist {
  id: string;
  type: string;
  attributes: IAttributes;
}
