import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(public orderService: OrderService) {}

  mastercardStatus: boolean = false;
  adress = null;

  fakeAdress = {
    apartment: 'Lenina, 29',
    city: 'Saint-Petersburg',
    country: 'Russian Federation',
  };

  public currentOrder = {};
  ngOnInit(): void {
    this.adress = this.fakeAdress;
    this.currentOrder = this.orderService.currentOrder;
    console.log('ORDER_COMPONENT', this.currentOrder);
  }
}
