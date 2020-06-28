import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product = {
    description: 'Mr Max Bill was a true creative genius, carving out a career as a painter, architect, sculptor and designer. As well as leaving behind an expansive body of work, he was also an avid collector of watches, and this Junghans chronoscope timepiece is dedicated to his memory. Immaculately housed in a domed Plexiglass case and finished with a handsome leather strap, it’s a highly technical piece in a stylish package.',
    priceOld: 4000,
    priceActual: 3000,
  }
  constructor() { }

  ngOnInit(): void {
  }

}
