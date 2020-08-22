import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { IProduct } from '../common/product';

const defaultPerPage = 21;

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  constructor(private http: HttpClient) {}

  public products: BehaviorSubject<IProduct[]> = new BehaviorSubject<
    IProduct[]
  >([]);
  public errors: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public page: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public perPage: BehaviorSubject<number> = new BehaviorSubject<number>(
    defaultPerPage
  );
  public total: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  fetchProduct() {
    this.http
      .get(
        `http://localhost:3000//api/v1/products?page=${this.page.getValue()}&per_page=${this.perPage.getValue()}`
      )
      .subscribe(
        (values: any) => {
          const { page, perPage, total, products } = values.data.attributes;
          this.page.next(parseInt(page, 10));
          this.perPage.next(parseInt(perPage, 10));
          this.total.next(parseInt(total, 10));
          this.products.next(
            products.data.map(
              ({ id, attributes: { images, ...attributes } }) => ({
                id: id,
                images: images.map((img) => `http://localhost:3000${img}`),
                ...attributes,
              })
            )
          );
        },

        (errors: { errors: object[] }) => {
          this.errors.next(errors.errors);
        }
      );
  }
}
