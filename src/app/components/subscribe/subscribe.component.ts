import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnInit {
  public subscribtionForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  public onChange(email: string) {
    this.subscribtionForm.setValue({
      email,
    });
    this.subscribtionForm.controls.email.markAsTouched();
  }

  public isValid() {
    return this.subscribtionForm.controls.email.touched
      ? this.subscribtionForm.controls.email.valid ||
          !this.subscribtionForm.controls.email.errors.email
      : true;
  }

  public onSubmit() {}

  constructor() {}

  ngOnInit(): void {}
}
