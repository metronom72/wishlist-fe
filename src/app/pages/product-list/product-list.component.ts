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
      if (
        event instanceof NavigationEnd &&
        (/^\/catalog/.test(event.url) || /^\/category/.test(event.url))
      ) {
        this.fetchProducts();
      }
    });
  }

  public activePage = 1;

  public type = 'catalog';

  total = () => {
    return this.productsListService.total.getValue();
  };
  perPage = () => {
    return this.productsListService.perPage.getValue();
  };

  fetchProducts = () => {
    this.activePage = parseInt(this.route.snapshot.params['page'], 10);
    this.productsListService.page.next(this.activePage);
    const category = parseInt(this.route.snapshot.params['category'], 10);

    if (category) this.type = 'category';
    else this.type = 'catalog';

    this.productsListService.fetchProduct(category);
  };

  ngOnInit(): void {
    this.fetchProducts();
  }
}
