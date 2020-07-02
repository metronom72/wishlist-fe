import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-authreg',
  templateUrl: './authreg.component.html',
  styleUrls: ['./authreg.component.scss']
})
export class AuthregComponent implements OnInit {

  constructor(

  ) { }

  isMobile: boolean = false
  
  formAuth: FormGroup
  formRegistr: FormGroup

  submitAuth() {
    if (this.formAuth.valid) {
      console.log('Form: ', this.formAuth)
      const formData = {...this.formAuth.value}

      console.log('Form Data:', formData)
    }
  }

  submitRegistr() {
    if (this.formRegistr.valid) {
      console.log('Form: ', this.formRegistr)
      const formData = {...this.formRegistr.value}

      console.log('Form Data:', formData)
    }
  }


  ngOnInit(): void {
    this.formAuth = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })

    this.formRegistr = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

}
