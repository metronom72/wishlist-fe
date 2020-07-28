import { ICart } from './../common/cart';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './../common/product';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private http: HttpClient,
    private _storageService: LocalStorageService
  ) {}

  inittalCart = {
    id: '0',
    type: 'card',
    attributes: {
      totalPrice: 0,
      discount: 0,
      cardProducts: { data: [] },
      products: { data: [] },
    },
  };

  public cart: BehaviorSubject<ICart> = new BehaviorSubject(this.inittalCart);
  public loader: Subject<productLoader> = new Subject();
  public cartId: number | string = null;

  public errors: Subject<any> = new Subject();

  public addProductToCart = (id: number, count: number) => {
    this.loader.next({
      isLoading: true,
      productId: id,
    });

    if (!this.cartId) {
      this.getLocalStorageCart();
    }

    if (this.cart.getValue().id !== '0') {
      let arrayForSendObj = this.cart
        .getValue()
        .attributes.cardProducts.data.map((product) => {
          if (product.attributes.productId !== id) {
            return {
              product_id: product.attributes.productId,
              count: product.attributes.count,
            };
          } else {
            return {
              product_id: product.attributes.productId,
              count: product.attributes.count + count,
            };
          }
        });
      let sendObj = {
        card: {
          card_products_attributes: arrayForSendObj,
        },
      };
      let productIdArray = sendObj.card.card_products_attributes.map(
        (product) => product.product_id
      );
      if (productIdArray.indexOf(id) === -1) {
        sendObj.card.card_products_attributes.push({
          product_id: id,
          count: count,
        });
      }
      this.http
        .patch(`http://localhost:3000//api/v1/cards/${this.cartId}`, sendObj)
        .subscribe(
          (values: any) => {
            this.cart.next({ ...values.data });
            this.setLocalStorageCart(values.data.id);
            this.loader.next({
              isLoading: false,
              productId: null,
            });
          },
          (errors: { errors: object[] }) => {
            this.errors.next(errors.errors);
            this.loader.next({
              isLoading: false,
              productId: null,
            });
          }
        );
    } else {
      // create new cart on server
      this.fetchCart();
      this.http
        .patch(`http://localhost:3000//api/v1/cards/${this.cartId}`, {
          card: {
            card_products_attributes: [
              {
                product_id: id,
                count: count,
              },
            ],
          },
        })
        .subscribe(
          (values: any) => {
            this.cart.next({ ...values.data });
            this.loader.next({
              isLoading: false,
              productId: null,
            });
          },
          (errors: { errors: object[] }) => {
            this.errors.next(errors.errors);
            this.loader.next({
              isLoading: false,
              productId: null,
            });
          }
        );
    }
  };

  public removProductFromCart = (id: number) => {
    this.loader.next({
      isLoading: true,
      productId: id,
    });
    if (this.cartId) {
      let arrayForSendObj = this.cart
        .getValue()
        .attributes.cardProducts.data.map((product) => {
          if (product.attributes.productId !== id) {
            return {
              product_id: product.attributes.productId,
              count: product.attributes.count,
            };
          } else if (
            product.attributes.productId === id &&
            product.attributes.count > 1
          ) {
            return {
              product_id: product.attributes.productId,
              count: product.attributes.count - 1,
            };
          } else if (
            product.attributes.productId === id &&
            product.attributes.count === 1
          ) {
            return {
              product_id: product.attributes.productId,
              count: product.attributes.count,
            };
          }
        });
      let sendObj = {
        card: {
          card_products_attributes: arrayForSendObj,
        },
      };
      this.http
        .patch(`http://localhost:3000//api/v1/cards/${this.cartId}`, sendObj)
        .subscribe(
          (values: any) => {
            this.cart.next({ ...values.data });
            this.loader.next({
              isLoading: false,
              productId: null,
            });
          },
          (errors: { errors: object[] }) => {
            this.errors.next(errors.errors);
            this.loader.next({
              isLoading: false,
              productId: null,
            });
          }
        );
    }
  };

  public removProductItemFromCart(id: number) {
    if (this.cartId) {
      let arrayForSendObj = this.cart
        .getValue()
        .attributes.cardProducts.data.map((product) => {
          if (product.attributes.productId !== id) {
            return {
              product_id: product.attributes.productId,
              count: product.attributes.count,
            };
          } else if (product.attributes.productId === id) {
            return;
          }
        });
      let sendObj = {
        card: {
          card_products_attributes: arrayForSendObj,
        },
      };
      this.http
        .patch(`http://localhost:3000//api/v1/cards/${this.cartId}`, sendObj)
        .subscribe(
          (values: any) => {
            this.cart.next({ ...values.data });
            this.loader.next({
              isLoading: false,
              productId: null,
            });
          },
          (errors: { errors: object[] }) => {
            this.errors.next(errors.errors);
            this.loader.next({
              isLoading: false,
              productId: null,
            });
          }
        );
    }
  }

  public getLocalStorageCart() {
    const localCartId = JSON.parse(this._storageService.get('cartId'));

    if (localCartId) {
      this.cartId = localCartId;
    }
  }

  public setLocalStorageCart(cartId) {
    this._storageService.set('cartId', JSON.stringify(cartId));
  }

  public fetchCart() {
    this.getLocalStorageCart();
    if (!this.cartId) {
      this.http
        .post('http://localhost:3000//api/v1/cards/', {
          card: {
            card_products_attributes: [],
          },
        })
        .subscribe(
          (values: any) => {
            this.cart = values.data;
            this.cartId = values.data.id;
            this.setLocalStorageCart(this.cartId);
            this.loader.next({
              isLoading: false,
              productId: null,
            });
          },
          (errors: { errors: object[] }) => {
            this.errors.next(errors.errors);
            this.loader.next({
              isLoading: false,
              productId: null,
            });
          }
        );
    } else {
      this.http
        .get(`http://localhost:3000//api/v1/cards/${this.cartId}`)
        .subscribe(
          (values: any) => {
            this.cart.next({ ...values.data });
            this.loader.next({
              isLoading: false,
              productId: null,
            });
          },
          (errors: { errors: object[] }) => {
            this.errors.next(errors.errors);
            this.loader.next({
              isLoading: false,
              productId: null,
            });
          }
        );
    }
  }
}

export interface productLoader {
  isLoading: boolean;
  productId: number;
}
