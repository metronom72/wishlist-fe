export interface IProductShort {
  id: number;
  type: string;
  attributes: IProductShortAttr;
}

interface IProductShortAttr {
  currency: string;
  description: string;
  externalId: null | number;
  inStock: number;
  name: string;
  prices: number[];
  subheader: string;
  photos?: string[];
}
