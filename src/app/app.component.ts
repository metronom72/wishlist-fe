import { Component } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wishlist-fe';

  isMobile: boolean = false

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {}


  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 560px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
  }
}
