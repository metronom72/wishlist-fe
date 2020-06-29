import { IProduct } from './../common/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart: IProduct[] = [];
  
  public addProductToCart = (product: IProduct) => {
    this.cart.push(product);
  }

  public removProductFromCart = (id: number) => {
    this.cart = this.cart.filter((product) => product.id === id);
  }

  public getProductCount = (id: number) => {
    return this.cart.filter((product: IProduct) => product.id === id).length;
  }

  constructor() { }
}
