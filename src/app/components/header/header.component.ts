import { Component, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isMobile: boolean = false;

  public isOpened: boolean = false;

  public isSearchOpened: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private renderer: Renderer2
  ) {}

  onOpenMenu = () => {
    this.isOpened = true;
    this.isSearchOpened = false;
    this.renderer.addClass(document.body, 'modal-opened');
  };

  onOpenSearch = () => {
    this.isOpened = false;
    this.isSearchOpened = true;
    this.renderer.addClass(document.body, 'modal-opened');
  };

  onClose = () => {
    this.isOpened = false;
    this.isSearchOpened = false;
    this.renderer.removeClass(document.body, 'modal-opened');
  };

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 960px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
          this.onClose();
        } else {
          this.isMobile = false;
          this.onClose();
        }
      });
  }
}
