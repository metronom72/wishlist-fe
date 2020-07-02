import { Component, OnInit } from '@angular/core';
import { ISocial } from 'src/app/common/social';
import { ILink } from 'src/app/common/link';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public socials: ISocial[] = [
    {
      link: '',
      icon: '/assets/twitter.svg',
    },
    {
      link: '',
      icon: '/assets/facebook.svg',
    },
    {
      link: '',
      icon: '/assets/instagram.svg',
    },
    {
      link: '',
      icon: '/assets/youtube.svg',
    },
  ];

  public links: ILink[] = [
    { link: '', label: 'STYLE & FIT ADVICE' },
    { link: '', label: 'FAQS' },
    { link: '', label: 'DELIVERY' },
    { link: '', label: 'EXCHANGES & RETURNS' },
    { link: '', label: 'TERMS & CONDITIONS' },
    { link: '', label: 'PRIVACY & COOKIES' },
    { link: '', label: 'ABOUT US' },
    { link: '', label: 'CAREERS' },
    { link: '', label: 'AFFILIATES' },
    { link: '', label: 'ADVERTISING' },
  ];

  public isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
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
