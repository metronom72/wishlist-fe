import { IWishlist } from './../../common/wishlist';
import { ICart } from './../../common/cart';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ProductService } from './../../services/product.service';
import { CartService } from './../../services/cart.service';
import { IProduct } from './../../common/product';
import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/services/product-list.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    public productListService: ProductListService,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    public cartService: CartService,
    public productService: ProductService,
    public wishlistService: WishlistService
  ) {}

  public isMobile: boolean = false;

  public product;

  public productCode() {
    return (Array(10).join('0') + this.product.id).slice(-10);
  }

  cart: ICart;
  cartLoader: boolean = false;
  cartCount: number;
  cartLoadingProduct: number | null = null;
  cartIsInitState: boolean = true;
  countProductInCart: number = 0;

  wishlist: IWishlist;
  wishlistLoader: boolean = false;
  wishlistCount: number;
  wishlistLoadingProduct: number | null = null;
  wishlistIsInitState: boolean = true;
  wishlistProductInCart: number = 0;

  handleChange() {
    this.cartIsInitState = false;
    this.cartService.addProductToCart(+this.product.id, 1);
  }

  addToWishlist() {
    this.wishlistIsInitState = false;
    this.wishlistService.addProductToWishlist(+this.product.id, 1);
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 960px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });

    this.productService.fetchProduct(+this.route.snapshot.params['id']);

    this.productService.product.subscribe({
      next: (product) => {
        console.log('PRODUCT', product);
        return (this.product = product);
      },
    });

    //wishlist fetch
    this.wishlistService.fetchWishlist();
    this.wishlistService.loader.subscribe({
      next: (loader) => {
        if (this.wishlistCount > 0) {
          this.wishlistIsInitState = false;
        }
        this.wishlistLoader = loader.isLoading;
        this.wishlistLoadingProduct = loader.productId;
      },
    });
    this.wishlistService.wishlist.subscribe({
      next: (wishlist) => {
        this.wishlist = wishlist;
        const count = wishlist.attributes.wishlistProducts.data.find(
          (product) =>
            product.attributes.productId === +this.route.snapshot.params['id']
        );
        if (count) {
          this.wishlistCount = count.attributes.count;
        }
      },
    });
    //cart fetch
    this.cartService.fetchCart();
    this.cartService.loader.subscribe({
      next: (loader) => {
        if (this.cartCount > 0) {
          this.cartIsInitState = false;
        }
        this.cartLoader = loader.isLoading;
        this.cartLoadingProduct = loader.productId;
      },
    });
    this.cartService.cart.subscribe({
      next: (cart) => {
        this.cart = cart;
        const count = cart.attributes.cardProducts.data.find(
          (product) =>
            product.attributes.productId === +this.route.snapshot.params['id']
        );
        if (count) {
          this.cartCount = count.attributes.count;
        }
      },
    });
  }
}
