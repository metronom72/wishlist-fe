import { CartService } from './../../services/cart.service';
import { IProduct } from 'src/app/common/product';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-product-in-cart',
  templateUrl: './product-in-cart.component.html',
  styleUrls: ['./product-in-cart.component.scss']
})
export class ProductInCartComponent implements OnInit {

  @Input() product: IProduct

  constructor( 
    public cartService: CartService,
   ) { }

  ngOnInit(): void {
    
  }

}
