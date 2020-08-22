import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  constructor(public router: Router) {}

  @Input()
  public activePage: number;

  @Input()
  public perPage: number;

  @Input()
  public total: number;

  @Input()
  public type: string;

  public first = 1;

  public leftDots = () => this.activePage > 3;

  public rightDots = () => this.activePage <= this.total - 3;

  public showPrevious = () => this.activePage > 2;

  public showNext = () => this.activePage <= this.total - 2;

  public canLeft = () => this.activePage !== 1;

  public canRight = () => this.activePage !== this.total;

  onNext = () => {
    this.activePage = this.activePage + 1;
    this.redirect();
  };

  onPrevious = () => {
    this.activePage = this.activePage - 1;
    this.redirect();
  };

  setPage = (page: number) => {
    if (this.activePage !== page) {
      this.activePage = page;
      this.redirect();
    }
  };

  private redirect = () => {
    this.router.navigate([this.type, this.activePage]);
  };

  ngOnInit(): void {}
}
