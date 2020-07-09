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
  // public cart: ICart;
  public loader: Subject<productLoader> = new Subject();

  public errors: Subject<any> = new Subject();

  public addProductToCart = (id: number, count: number) => {
    this.loader.next({
      isLoading: true,
      productId: id,
    });
    setTimeout(() => {
      this.loader.next({
        isLoading: false,
        productId: null,
      });
    }, 1000);
    if (this.cart.getValue().id === '0') {
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
        .patch(
          `http://localhost:3000//api/v1/cards/${this.cart.getValue().id}`,
          sendObj
        )
        .subscribe(
          (values: any) => {
            this.cart.next({ ...values.data });
            this.setLocalStorageCart(values.data);
            console.log(
              'CART AFTER',
              this.cart.value.attributes.cardProducts.data
            );
          },
          (errors: { errors: object[] }) => {
            this.errors.next(errors.errors);
          }
        );
    } else {
      // create new cart on server
      this.fetchCart();
      this.http
        .patch(
          `http://localhost:3000//api/v1/cards/${this.cart.getValue().id}`,
          {
            card: {
              card_products_attributes: [
                {
                  product_id: id,
                  count: count,
                },
              ],
            },
          }
        )
        .subscribe(
          (values: any) => {
            this.cart.next({ ...values.data });
            this.setLocalStorageCart(values.data);
            console.log(
              'CART AFTER',
              this.cart.value.attributes.cardProducts.data
            );
          },
          (errors: { errors: object[] }) => {
            this.errors.next(errors.errors);
          }
        );
    }
  };

  public removProductFromCart = (id: number) => {
    this.loader.next({
      isLoading: true,
      productId: id,
    });
    setTimeout(() => {
      this.loader.next({
        isLoading: false,
        productId: null,
      });
    }, 1000);
    if (this.cart.getValue().id !== '0') {
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
        .patch(
          `http://localhost:3000//api/v1/cards/${this.cart.getValue().id}`,
          sendObj
        )
        .subscribe(
          (values: any) => {
            this.cart.next({ ...values.data });
            this.setLocalStorageCart(values.data);
          },
          (errors: { errors: object[] }) => {
            this.errors.next(errors.errors);
          }
        );
    }
  };

  public getLocalStorageCart() {
    const localCart = JSON.parse(this._storageService.get('cart'));

    if (localCart) {
      this.cart.next({ ...localCart });
    }
  }

  public setLocalStorageCart(cart) {
    this._storageService.set('cart', JSON.stringify(cart));
  }

  public fetchCart() {
    this.getLocalStorageCart();
    if (this.cart.getValue().id === '0') {
      this.http
        .post('http://localhost:3000//api/v1/cards/', {
          card: {
            card_products_attributes: [],
          },
        })
        .subscribe(
          (values: any) => {
            this.cart = values.data;
            this.setLocalStorageCart(this.cart);
          },
          (errors: { errors: object[] }) => {
            this.errors.next(errors.errors);
          }
        );
    } else {
    }
  }
}

export interface productLoader {
  isLoading: boolean;
  productId: number;
}
