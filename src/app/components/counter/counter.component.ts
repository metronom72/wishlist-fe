import { WishlistService } from './../../services/wishlist.service';
import { CartService, productLoader } from './../../services/cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  @Input() id: number;
  @Input() count: number;
  @Input() isWishlist: boolean = false;

  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService
  ) {}

  isLoading: boolean = false;
  loadingProduct: number = null;

  ngOnInit(): void {
    this.cartService.loader.subscribe({
      next: (loader) => {
        this.isLoading = loader.isLoading;
        this.loadingProduct = loader.productId;
      },
    });
  }
}
