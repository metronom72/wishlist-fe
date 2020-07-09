import { IWishlist } from './../../common/wishlist';
import { ICart } from './../../common/cart';
import { WishlistService } from './../../services/wishlist.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { IUserCard } from './../../common/userCard';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist-client',
  templateUrl: './wishlist-client.component.html',
  styleUrls: ['./wishlist-client.component.scss'],
})
export class WishlistClientComponent implements OnInit {
  constructor(
    public wishlistService: WishlistService,
    public breakpointObserver: BreakpointObserver
  ) {}

  userCard: IUserCard;

  isMobile: boolean = false;

  public wishlist: IWishlist | null = null;

  buyer: boolean = true;

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
    this.userCard = {
      name: 'Dystopian novel 1984 is a winner with Riae',
      profilePhoto: 'https://d.radikal.ru/d07/2007/e9/95824395a037.png',
      description: `Curvy Riae is a 5’2 model with a large number of colourful tattoos – which she shows off in many of her barely-there outfits.
      In one cheeky shot, she leans forward on her hands and knees in front of the washing machine
      She captioned the snap: “Things you can do at home: find the lost socks in the washing machine.”
      The model, who tells fans to be “proud of your weirdness” has a massive 3.1 million followers.
      And many were blown away by the saucy shot.
      One said: “I really hate doing that s***... but have to say you make it look fun!”
      While another joked: “And this is the reason why I can't open my phone on public.” less...`,
    };

    this.wishlistService.fetchWishlist();
    this.wishlistService.wishlist.subscribe({
      next: (wishlist) => (this.wishlist = wishlist),
    });
  }
}
