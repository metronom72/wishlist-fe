import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-authreg',
  templateUrl: './authreg.component.html',
  styleUrls: ['./authreg.component.scss'],
})
export class AuthregComponent implements OnInit {
  constructor() {}

  isMobile: boolean = false;

  form: FormGroup;
  submit() {
    console.log('form submit', this.form);
  }

  ngOnInit(): void {
    this.form = new FormGroup({});
  }
}
