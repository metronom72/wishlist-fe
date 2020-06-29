import { IProduct } from './../common/product';

import { Injectable } from '@angular/core';
import products from './products.json';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  public productList: IProduct[] = products;

  public getProduct = (id: number | null): IProduct | null =>
    id
      ? this.productList.filter((product: IProduct) => product.id === id)[0]
      : null;

  constructor() {}
}
