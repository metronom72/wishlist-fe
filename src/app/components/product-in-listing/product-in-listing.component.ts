import { ProductListService } from './../../services/product-list.service';
import { WishlistService } from './../../services/wishlist.service';
import { IProductShort } from './../../common/productShort';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CartService } from './../../services/cart.service';
import { IProduct } from 'src/app/common/product';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-in-listing',
  templateUrl: './product-in-listing.component.html',
  styleUrls: ['./product-in-listing.component.scss'],
})
export class ProductInListingComponent implements OnInit {
  @Input() product;
  @Input() orderView: boolean = false;

  public isMobile: boolean = false;
  public isItemChosen: boolean = true;

  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 720px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
  }
}
