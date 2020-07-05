import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CartService } from './../../services/cart.service';
import { IProduct } from 'src/app/common/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-in-wishlist',
  templateUrl: './product-in-wishlist.component.html',
  styleUrls: ['./product-in-wishlist.component.scss'],
})
export class ProductInWishlistComponent implements OnInit {
  @Input() product: IProduct;

  public isMobile: boolean = false;

  public isItemChosen: boolean = true;

  constructor(
    public cartService: CartService,
    public breakpointObserver: BreakpointObserver
  ) {}

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
  }
}
