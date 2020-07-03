import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-authreg',
  templateUrl: './authreg.component.html',
  styleUrls: ['./authreg.component.scss'],
})
export class AuthregComponent implements OnInit {
  constructor(public breakpointObserver: BreakpointObserver) {}

  isMobile: boolean = false;
  isAuthForm: boolean = true;
  isRegistrForm: boolean = true;
  isAuthSuccess: boolean = false;
  isAuthError: boolean = false;
  isRegistrSuccess: boolean = false;
  isRegistrError: boolean = false;
  formAuth: FormGroup;
  formRegistr: FormGroup;

  submitAuth() {
    if (this.formAuth.valid) {
      console.log('Form: ', this.formAuth);
      const formData = { ...this.formAuth.value };

      console.log('Form Data:', formData);
      this.isAuthSuccess = true;
      // this.formAuth = '';
    }
  }

  submitRegistr() {
    if (this.formRegistr.valid) {
      console.log('Form: ', this.formRegistr);
      const formData = { ...this.formRegistr.value };

      console.log('Form Data:', formData);
      this.isRegistrError = true;
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
  }
}
