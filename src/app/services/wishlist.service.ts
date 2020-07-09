import { productLoader } from './cart.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-localstorage';
import { Injectable } from '@angular/core';
import ExampleWishlist from './wishlist.json';
import { IWishlist } from '../common/wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  // public wishlist: IWishlist = ExampleWishlist;

  constructor(
    private http: HttpClient,
    private _storageService: LocalStorageService
  ) {}

  inittalWishlist = {
    id: '0',
    type: 'card',
    attributes: {
      title: null,
      description: null,
      country: null,
      city: null,
      house: null,
      apartment: null,
      zipCode: null,
      rawAddress: null,
      addressComment: null,
      showAddress: false,
      status: '',
      contacts: [],
      wishlistProducts: { data: [] },
      products: { data: [] },
    },
  };

  public wishlist: BehaviorSubject<IWishlist> = new BehaviorSubject(
    this.inittalWishlist
  );
  public loader: Subject<productLoader> = new Subject();

  public errors: Subject<any> = new Subject();

  public addProductToWishlist = (id: number, count: number) => {
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
    if (this.wishlist.getValue().id === '0') {
      this.getLocalStorageWishlist();
    }

    if (this.wishlist.getValue().id !== '0') {
      let arrayForSendObj = this.wishlist
        .getValue()
        .attributes.wishlistProducts.data.map((product) => {
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
        wishlist: {
          wishlist_products_attributes: arrayForSendObj,
        },
      };
      let productIdArray = sendObj.wishlist.wishlist_products_attributes.map(
        (product) => product.product_id
      );
      if (productIdArray.indexOf(id) === -1) {
        sendObj.wishlist.wishlist_products_attributes.push({
          product_id: id,
          count: count,
        });
      }
      this.http
        .patch(
          `http://localhost:3000//api/v1/wishlists/${
            this.wishlist.getValue().id
          }`,
          sendObj
        )
        .subscribe(
          (values: any) => {
            this.wishlist.next({ ...values.data });
            this.setLocalStorageWishlist(values.data);
          },
          (errors: { errors: object[] }) => {
            this.errors.next(errors.errors);
          }
        );
    } else {
      // create new wishlist on server
      this.fetchWishlist();
      this.http
        .patch(
          `http://localhost:3000//api/v1/wishlists/${
            this.wishlist.getValue().id
          }`,
          {
            wishlist: {
              wishlist_products_attributes: [
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
            this.wishlist.next({ ...values.data });
            this.setLocalStorageWishlist(values.data);
          },
          (errors: { errors: object[] }) => {
            this.errors.next(errors.errors);
          }
        );
    }
  };

  public removProductFromWishlist = (id: number) => {
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
    if (this.wishlist.getValue().id !== '0') {
      let arrayForSendObj = this.wishlist
        .getValue()
        .attributes.wishlistProducts.data.map((product) => {
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
      //Check
      let sendObj = {
        wishlist: {
          wishlist_products_attributes: arrayForSendObj,
        },
      };
      this.http
        .patch(
          `http://localhost:3000//api/v1/wishlists/${
            this.wishlist.getValue().id
          }`,
          sendObj
        )
        .subscribe(
          (values: any) => {
            this.wishlist.next({ ...values.data });
            this.setLocalStorageWishlist(values.data);
          },
          (errors: { errors: object[] }) => {
            this.errors.next(errors.errors);
          }
        );
    }
  };

  public getLocalStorageWishlist() {
    const localWishlist = JSON.parse(this._storageService.get('wishlist'));

    if (localWishlist) {
      this.wishlist.next({ ...localWishlist });
    }
  }

  public setLocalStorageWishlist(wishlist) {
    this._storageService.set('wishlist', JSON.stringify(wishlist));
  }

  public fetchWishlist() {
    this.getLocalStorageWishlist();
    if (this.wishlist.getValue().id === '0') {
      this.http
        .post('http://localhost:3000/api/v1/wishlists', {
          card: {
            card_products_attributes: [],
          },
        })
        .subscribe(
          (values: any) => {
            this.wishlist = values.data;
            this.setLocalStorageWishlist(this.wishlist);
          },
          (errors: { errors: object[] }) => {
            this.errors.next(errors.errors);
          }
        );
    } else {
    }
  }
}
