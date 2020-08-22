import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}

  currentOrder = [];

  putCurrentOrder(order) {
    this.currentOrder = order;
  }
}
