import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  constructor() {}

  activePage = 97;

  perPage = 21;

  total = 100;

  first = 1;

  leftDots = () => this.activePage > 3;

  rightDots = () => this.activePage <= this.total - 3;

  showPrevious = () => this.activePage > 2;

  showNext = () => this.activePage <= this.total - 2;

  canLeft = () => this.activePage !== 1;

  canRight = () => this.activePage !== this.total;

  ngOnInit(): void {}
}
