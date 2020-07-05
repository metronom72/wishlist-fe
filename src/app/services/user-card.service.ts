import { IProduct } from 'src/app/common/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserCardService {
  constructor(private http: HttpClient) {}

  public user: Subject<IProduct> = new Subject();
  public errors: Subject<any> = new Subject<any>();

  // fetchUser(id) {
  //   this.http.get(`http://localhost:3000//api/v1/products/${id}`).subscribe(
  //     (values: any) => {
  //       const { attributes, ...data } = values.data;
  //       this.user.next({
  //         ...data,
  //         ...attributes,
  //       });
  //     },
  //     (errors: { errors: object[] }) => {
  //       this.errors.next(errors.errors);
  //     }
  //   );
  // }
}
