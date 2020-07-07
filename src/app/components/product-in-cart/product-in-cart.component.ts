import { IProductShort } from './../../common/productShort';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CartService } from './../../services/cart.service';
import { IProduct } from 'src/app/common/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-in-cart',
  templateUrl: './product-in-cart.component.html',
  styleUrls: ['./product-in-cart.component.scss'],
})
export class ProductInCartComponent implements OnInit {
  @Input() product;
  @Input() productsArray;
  @Input() userCart: boolean = false;

  public isMobile: boolean = false;
  public isItemChosen: boolean = true;
  productInfo;

  constructor(
    public cartService: CartService,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 860px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
    this.productInfo = this.productsArray.filter(
      (p) => p.attributes.productId === +this.product.id
    )[0];
    console.log(this.product, this.productInfo, 'ИНФА ОПРОДУКТЕ');
  }
}
//filter(p => +p.attributes.cardId === +product.id)
