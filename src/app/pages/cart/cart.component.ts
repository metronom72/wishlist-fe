import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(public cartService: CartService) {}

  public cart = this.cartService.cart;

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
  }
}
