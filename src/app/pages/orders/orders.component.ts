import { WishlistService } from './../../services/wishlist.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(
    public orderService: OrderService,
    public breakpointObserver: BreakpointObserver,
    public wishlistService: WishlistService
  ) {}

  mastercardStatus: boolean = false;
  adress = null;
  isMobile: boolean = false;
  isLoading: boolean = true;
  orderView: boolean = true;
  buyer: boolean = true;
  isWishlist: boolean = true;
  wishlist;

  nextStep() {}

  fakeAdress = {
    apartment: 'Lenina, 29',
    city: 'Saint-Petersburg',
    country: 'Russian Federation',
  };

  public currentOrder = [];
  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 920px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
    this.adress = this.fakeAdress;
    this.currentOrder = this.orderService.currentOrder;

    this.wishlistService.fetchWishlist();

    this.wishlistService.wishlist.subscribe({
      next: (wishlist) => {
        this.wishlist = wishlist;
        this.isLoading = false;
        if (
          wishlist.attributes.apartment &&
          wishlist.attributes.city &&
          wishlist.attributes.country
        ) {
          this.adress = {
            apartment: wishlist.attributes.apartment,
            city: wishlist.attributes.city,
            country: wishlist.attributes.country,
          };
        } else {
          this.adress = this.fakeAdress;
        }
      },
    });
  }
}
