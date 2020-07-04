import { Injectable } from '@angular/core';
import ExampleWishlist from './wishlist.json';
import { IWishlist } from '../common/wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  public wishlist: IWishlist = ExampleWishlist;

  constructor() {}
}
