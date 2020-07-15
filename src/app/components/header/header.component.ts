import { ICart } from './../../common/cart';
import { IWishlist } from './../../common/wishlist';
import { WishlistService } from './../../services/wishlist.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CategoriesService } from 'src/app/services/categories.service';
import { ICategory } from 'src/app/common/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isMobile: boolean = false;

  public isOpened: boolean = false;

  public isSearchOpened: boolean = false;

  public activeMenuItem: number | null = null;

  public subcategories: ICategory[] = [];

  public openedCategories = [];

  public wishlist: IWishlist;

  public wishlistCount: number | string;

  public cart: ICart;

  public cartCount: number | string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private renderer: Renderer2,
    public categoriesService: CategoriesService,
    public cartService: CartService,
    public wishlistService: WishlistService
  ) {}

  onOpenMenu = () => {
    this.isOpened = true;
    this.isSearchOpened = false;
    this.renderer.addClass(document.body, 'modal-opened');
  };

  onOpenSearch = () => {
    this.isOpened = false;
    this.isSearchOpened = true;
    this.renderer.addClass(document.body, 'modal-opened');
  };

  onClose = () => {
    this.isOpened = false;
    this.isSearchOpened = false;
    this.activeMenuItem = null;
    this.openedCategories = [];
    this.renderer.removeClass(document.body, 'modal-opened');
  };

  onHoverCategory = (id: number | null) => {
    this.activeMenuItem = id;
    this.subcategories = this.categoriesService.findSubcategories(id);
  };

  onActivateMenu = (id: number) => {
    this.activeMenuItem = id;
  };

  onClickSubcategoriesMobile = (id) => {
    if (this.openedCategories.includes(id)) {
      this.openedCategories = [
        ...this.openedCategories.filter((categoryId) => categoryId !== id),
      ];
    } else {
      this.openedCategories.push(id);
    }
  };

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 960px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
          this.openedCategories = [];
          this.onClose();
        } else {
          this.isMobile = false;
          this.openedCategories = [];
          this.onClose();
        }
      });

    //wishlist fetch
    this.wishlistService.fetchWishlist();
    this.wishlistService.wishlist.subscribe({
      next: (wishlist) => {
        this.wishlist = wishlist;
        const count = wishlist.attributes.wishlistProducts.data.reduce(
          (accum, product) => product.attributes.count + accum,
          0
        );
        if (count) {
          this.wishlistCount = count;
        }
      },
    });
    //cart fetch
    this.cartService.fetchCart();
    this.cartService.cart.subscribe({
      next: (cart) => {
        this.cart = cart;
        const count = cart.attributes.cardProducts.data.reduce(
          (accum, product) => {
            return product.attributes.count + accum;
          },
          0
        );
        if (count) {
          this.cartCount = count;
        }
        console.log(this.cartCount, 'CART_COUNT');
      },
    });
  }
}
