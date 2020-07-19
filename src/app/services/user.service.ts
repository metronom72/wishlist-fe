import { productLoader } from './cart.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'ngx-localstorage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private _storageService: LocalStorageService
  ) {}

  initialUser = {
    authKey: '',
    refreshToken: '',
  };

  public errorsRegistr: Subject<any> = new Subject();
  public errorsAuth: Subject<any> = new Subject();
  public successAuth: Subject<any> = new Subject();
  public successRegistr: Subject<any> = new Subject();
  public user: BehaviorSubject<any> = new BehaviorSubject(this.initialUser);
  public loader: Subject<any> = new Subject();
  public authToken: string;
  public refreshToken: string;

  public signUp(payload) {
    this.http.post(`localhost:3000/api/v1/auth/signup`, payload).subscribe(
      (values: any) => {
        this.user.next({ ...values });
        this.loader.next({
          isLoading: false,
          productId: null,
        });
        this.successRegistr.next(true);
      },
      (errors: { errors: object[] }) => {
        this.errorsRegistr.next(errors.errors);
        this.loader.next({
          isLoading: false,
        });
      }
    );
  }

  public signIn(payload) {
    this.http
      .post(`http://localhost:3000/api/v1/auth/signin`, payload)
      .subscribe(
        (values: any) => {
          this.user = values;
          this.loader.next({
            isLoading: false,
          });
          this.successAuth.next(true);
          this.setLocalStorageUser(this.user);
        },
        (errors: { errors: object[] }) => {
          this.errorsAuth.next(errors.errors);
          this.loader.next({
            isLoading: false,
            productId: null,
          });
        }
      );
  }

  public getLocalStorageUser() {
    const localUser = JSON.parse(this._storageService.get('User'));

    if (localUser) {
      this.user = localUser;
    }
  }

  public setLocalStorageUser(user) {
    this._storageService.set('User', JSON.stringify(user));
  }
}
