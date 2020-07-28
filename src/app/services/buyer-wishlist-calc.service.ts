import { WishlistService } from './wishlist.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BuyerWishlistCalcService {
  constructor(public wishlistService: WishlistService) {}

  public currentState = this.wishlistService.wishlist;

  public showBuyerState() {
    console.log('CURRENT_WHISHLIST_STATE', this.currentState);
  }
}
