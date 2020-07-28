import { OrderService } from './../../services/order.service';
import { BuyerWishlistCalcService } from './../../services/buyer-wishlist-calc.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
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
    public orderService: OrderService,
    public cartService: CartService,
    public breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    public buyerWishlistCalcService: BuyerWishlistCalcService,
    public router: Router
  ) {}

  userCard: IUserCard;

  isMobile: boolean = false;
  isShortTitleRow: boolean = false;

  public wishlist: IWishlist | null = null;
  cart: ICart | null = null;
  isItemChosen: boolean = false;

  mastercardStatus: boolean = false;
  payPalStatus: boolean = false;
  isWishlist: boolean = true;
  buyer: boolean = false;
  adress = null;
  isShowFooterPaymentOptions: boolean = false;

  showAdress: boolean = false;
  buyerCountedData;
  buyerTotalPrice: number = 0;

  fakeAdress = {
    apartment: 'Lenina, 29',
    city: 'Saint-Petersburg',
    country: 'Russian Federation',
  };

  goPayment() {
    console.log('payment');
    const currentOrder = this.buyerCountedData.filter(
      (product) => product.selected
    );
    this.orderService.putCurrentOrder(currentOrder);
    this.router.navigate(['/orders']);
  }

  changeAdresst() {
    console.log('changeAdresst');
  }

  goPublish() {
    console.log('GO PUBLISH');
    this.buyer = !this.buyer;
  }

  changeIsItemSelected(event) {
    event.status
      ? (this.buyerCountedData = this.buyerCountedData.map((product) =>
          +product.id === +event.id ? { ...product, selected: true } : product
        ))
      : (this.buyerCountedData = this.buyerCountedData.map((product) =>
          +product.id === +event.id ? { ...product, selected: false } : product
        ));

    this.buyerTotalPrice =
      this.buyerCountedData !== []
        ? this.buyerCountedData.reduce(
            (accum, product) =>
              product.selected
                ? accum +
                  product.attributes.prices[0] * product.attributes.count
                : accum,
            0
          )
        : 0;
  }

  ngOnInit(): void {
    this.buyerWishlistCalcService.showBuyerState();

    this.breakpointObserver
      .observe(['(max-width: 920px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
    this.breakpointObserver
      .observe(['(max-width: 720px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isShortTitleRow = true;
        } else {
          this.isShortTitleRow = false;
        }
      });
    this.buyer = !!this.route.snapshot.params['id'];
    console.log(this.buyer, 'BYYER');
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
    this.cartService.fetchCart();
    this.wishlistService.wishlist.subscribe({
      next: (wishlist) => {
        console.log('WISHLIST', wishlist);
        this.wishlist = wishlist;
        this.buyerCountedData = wishlist.attributes.products.data
          .filter((product) => product.attributes.inStock)
          .map((product) => {
            product.attributes.count = wishlist.attributes.wishlistProducts.data.find(
              (e) => e.attributes.productId === +product.id
            ).attributes.count;
            product.selected = true;
            return product;
          });
        console.log(
          'buyerCountedData',
          this.buyerCountedData,
          this.buyerCountedData.length
        );

        this.buyerTotalPrice =
          this.buyerCountedData !== []
            ? this.buyerCountedData.reduce(
                (accum, product) =>
                  product.selected
                    ? accum +
                      product.attributes.prices[0] * product.attributes.count
                    : accum,
                0
              )
            : 0;
        console.log(this.buyerTotalPrice);

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
    this.cartService.cart.subscribe({
      next: (cart) => (this.cart = cart),
    });
  }
}
