import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { ProductListService } from 'src/app/services/product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(
    public productsListService: ProductListService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && /^\/catalog/.test(event.url)) {
        const page = parseInt(this.route.snapshot.params['page'], 10);
        this.activePage = page;
        this.productsListService.page.next(page);
        this.productsListService.fetchProduct();
      }
    });
  }
  public activePage = 1;

  total = () => {
    return this.productsListService.total.getValue();
  };
  perPage = () => {
    return this.productsListService.perPage.getValue();
  };

  ngOnInit(): void {
    this.activePage = parseInt(this.route.snapshot.params['page'], 10);
    this.productsListService.page.next(this.activePage);
    this.productsListService.fetchProduct();
  }
}
