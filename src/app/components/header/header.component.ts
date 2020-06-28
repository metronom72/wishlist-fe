import { Component, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isMobile: boolean;

  public isOpened = false;

  public isSearchOpened = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private renderer: Renderer2
  ) { }
  
  onOpenMenu = () => {
    this.isOpened = true;
    this.isSearchOpened = false;
    this.renderer.addClass(document.body, 'modal-opened');
  }

  onCloseMenu = () => {
    this.isOpened = false;
    this.isSearchOpened = false;
    this.renderer.removeClass(document.body, 'modal-opened');
  }

  onOpenSearch = () => {
    this.isOpened = false;
    this.isSearchOpened = true;
    this.renderer.addClass(document.body, 'modal-opened');
  }

  onCloseSearch = () => {
    this.isOpened = false;
    this.isSearchOpened = false;
    this.renderer.removeClass(document.body, 'modal-opened');
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 920px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
          this.onCloseMenu();
          this.onCloseSearch();
        } else {
          this.isMobile = false;
          this.onCloseMenu();
          this.onCloseSearch();
        }
      });
  }
}
