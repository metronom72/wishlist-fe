import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-authreg',
  templateUrl: './authreg.component.html',
  styleUrls: ['./authreg.component.scss'],
})
export class AuthregComponent implements OnInit {
  constructor(
    public breakpointObserver: BreakpointObserver,
    public userService: UserService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  isMobile: boolean = false;
  isAuthForm: boolean = true;
  isRegistrForm: boolean = true;
  isAuthSuccess: boolean = false;
  isAuthError: boolean = false;
  isRegistrSuccess: boolean = false;
  isRegistrError: boolean = false;
  formAuth: FormGroup;
  formRegistr: FormGroup;

  public async submitAuth() {
    if (this.formAuth.valid) {
      const formData = { user: { ...this.formAuth.value } };

      try {
        const result = await this.userService.signIn(formData);
        this.isAuthSuccess = true;
      } catch {}
    }
  }

  public async submitRegistr() {
    if (this.formRegistr.valid) {
      const formData = { user: { ...this.formRegistr.value } };

      console.log('Form Data:', formData);
      try {
        const result = await this.userService.signUp(formData);
        this.isRegistrSuccess = true;
      } catch {}
    }
  }

  changeActiveForm(auth: boolean, registr: boolean) {
    this.isAuthForm = auth;
    this.isRegistrForm = registr;
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 760px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
          this.isRegistrForm = false;
          this.isAuthForm = true;
        } else {
          this.isMobile = false;
          this.isRegistrForm = true;
          this.isAuthForm = true;
        }
      });
    this.formAuth = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.formRegistr = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.userService.errorsAuth.subscribe({
      next: () => (this.isAuthError = true),
    });

    this.userService.errorsRegistr.subscribe({
      next: () => (this.isRegistrError = true),
    });

    this.userService.successAuth.subscribe({
      next: () =>
        //@ts-ignore
        this.route.queryParams.value.order
          ? this.router.navigate(['/shipping'])
          : (this.isAuthSuccess = true),
    });

    this.userService.successRegistr.subscribe({
      next: () => (this.isRegistrSuccess = true),
    });
  }
}
