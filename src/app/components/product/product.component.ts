import { ProductService } from './../../services/product.service';
import { CartService } from './../../services/cart.service';
import { IProduct } from './../../common/product';
import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/services/product-list.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    public productListService: ProductListService,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    public cartService: CartService,
    public productService: ProductService
  ) {}

  public isMobile: boolean = false;

  public product: IProduct;

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
    this.productService.fetchProduct(+this.route.snapshot.params['id']);
    this.productService.product.subscribe({
      next: (product) => (this.product = product),
    });
  }
}
