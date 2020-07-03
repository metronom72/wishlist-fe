import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-stage-indicator',
  templateUrl: './stage-indicator.component.html',
  styleUrls: ['./stage-indicator.component.scss'],
})
export class StageIndicatorComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {}

  isActive = (id: number) => {
    return true;
  };

  indicatorsState: Array<IIndicator> = [
    { id: 1, state: 'auth', name: 'SIGN IN' },
    { id: 2, state: 'adress', name: 'SHIPPING' },
    { id: 3, state: 'orders', name: 'BILLING' },
    { id: 4, state: 'false', name: 'SUCCESSFUL' },
  ];

  currentRoute: string = '';

  isMobile: boolean = false;

  ngOnInit(): void {
    this.currentRoute = this.route.snapshot.routeConfig.path;
    this.breakpointObserver
      .observe(['(max-width: 960px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
  }
}

interface IIndicator {
  id: number;
  state: string;
  name: string;
}
