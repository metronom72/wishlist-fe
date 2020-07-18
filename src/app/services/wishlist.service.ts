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
  constructor(
    private http: HttpClient,
    private _storageService: LocalStorageService
  ) {}

  inittalWishlist = {
    id: '0',
    type: 'wishlist',
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
  wishlistId: number | string = null;

  public addProductToWishlist = async (id: number, count: number) => {
    this.loader.next({
      isLoading: true,
      productId: id,
    });

    if (!this.wishlistId) {
      this.getLocalStorageWishlist();
      await this.fetchWishlist();
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
          `http://localhost:3000//api/v1/wishlists/${this.wishlistId}`,
          sendObj
        )
        .subscribe(
          (values: any) => {
            this.wishlist.next({ ...values.data });
            this.setLocalStorageWishlist(values.data.id);
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
      // create new wishlist on server
      this.fetchWishlist();
      this.http
        .patch(`http://localhost:3000//api/v1/wishlists/${this.wishlistId}`, {
          wishlist: {
            wishlist_products_attributes: [
              {
                product_id: id,
                count: count,
              },
            ],
          },
        })
        .subscribe(
          (values: any) => {
            this.wishlist.next({ ...values.data });
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

  public removProductFromWishlist = (id: number) => {
    this.loader.next({
      isLoading: true,
      productId: id,
    });
    if (this.wishlistId) {
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
      let sendObj = {
        wishlist: {
          wishlist_products_attributes: arrayForSendObj,
        },
      };
      this.http
        .patch(
          `http://localhost:3000//api/v1/wishlists/${this.wishlistId}`,
          sendObj
        )
        .subscribe(
          (values: any) => {
            this.wishlist.next({ ...values.data });
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

  public removProductItemFromWishlist(id: number) {
    if (this.wishlistId) {
      let arrayForSendObj = this.wishlist
        .getValue()
        .attributes.wishlistProducts.data.map((product) => {
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
        wishlist: {
          wishlist_products_attributes: arrayForSendObj,
        },
      };
      this.http
        .patch(
          `http://localhost:3000//api/v1/wishlists/${this.wishlistId}`,
          sendObj
        )
        .subscribe(
          (values: any) => {
            this.wishlist.next({ ...values.data });
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

  public getLocalStorageWishlist() {
    const localWishlistId = JSON.parse(this._storageService.get('wishlistId'));

    if (localWishlistId) {
      this.wishlistId = localWishlistId;
    }
  }

  public setLocalStorageWishlist(wishlistId) {
    this._storageService.set('wishlistId', JSON.stringify(wishlistId));
  }

  public fetchWishlist() {
    this.getLocalStorageWishlist();
    if (!this.wishlistId) {
      this.http
        .post('http://localhost:3000//api/v1/wishlists/', {
          wishlist: {
            wishlist_products_attributes: [],
          },
        })
        .subscribe(
          (values: any) => {
            this.wishlist = values.data;
            this.wishlistId = values.data.id;
            this.setLocalStorageWishlist(this.wishlistId);
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
        .get(`http://localhost:3000//api/v1/wishlists/${this.wishlistId}`)
        .subscribe(
          (values: any) => {
            this.wishlist.next({ ...values.data });
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
