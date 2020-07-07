import { CartService } from './../../services/cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  @Input() id: number;
  @Input() count: number;

  constructor(public cartService: CartService) {}

  isLoading: boolean = false;

  ngOnInit(): void {
    this.cartService.loader.subscribe({
      next: (loader) => {
        this.isLoading = loader;
      },
    });
  }
}
