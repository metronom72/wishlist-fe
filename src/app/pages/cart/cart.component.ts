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
    public breakpointObserver: BreakpointObserver
  ) {}

  public cart = this.cartService.cart;
  isMobile: boolean = false;

  public sortCart = this.cartService.cart
    .sort(function (a, b) {
      return a.id < b.id ? -1 : 1;
    })
    .reduce(function (arr, el) {
      if (!arr.length || arr[arr.length - 1].id != el.id) {
        arr.push(el);
      }
      return arr;
    }, []);

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 560px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
  }
}
