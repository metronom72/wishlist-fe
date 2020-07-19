import { UserService } from './../../services/user.service';
import { ICart } from './../../common/cart';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    public cartService: CartService,
    public breakpointObserver: BreakpointObserver,
    public userService: UserService
  ) {}

  public cart: ICart | null = null;
  isWishlist: boolean = false;
  isMobile: boolean = false;
  routerLink: object = this.userService.user ? { order: 'true' } : {};

  ngOnInit(): void {
    console.log('routerLink', this.routerLink);
    this.breakpointObserver
      .observe(['(max-width: 760px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });

    this.cartService.fetchCart();
    this.cartService.cart.subscribe({
      next: (cart) => (this.cart = cart),
    });
  }
}
