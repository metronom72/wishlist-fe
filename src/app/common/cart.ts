interface IAttributes {
  totalPrice: number;
  discount: number;
  cardProducts: any;
  products: any;
}

export interface ICart {
  id: string;
  type: string;
  attributes: IAttributes;
}
