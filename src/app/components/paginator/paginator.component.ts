import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  constructor() {}

  activePage = 98;

  perPage = 21;

  total = 100;

  first = 1;

  leftDots = () => this.activePage > 2;

  rightDots = () => this.activePage <= this.total - 2;

  canLeft = true;

  canRight = true;

  ngOnInit(): void {}
}
