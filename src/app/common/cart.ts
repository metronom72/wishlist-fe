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

// cardProducts: {data: Array(0)}
// discount: 0
// products: {data: Array(0)}
// totalPrice: 0
