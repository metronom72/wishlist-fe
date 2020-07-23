import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { IUserCard } from './../../common/userCard';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  constructor(public breakpointObserver: BreakpointObserver) {}

  @Input() userCard: IUserCard;
  @Input() buyer: boolean = false;

  isEditing: boolean = false;
  isMobile: boolean = false;
  userName: string = '';
  userDescription: string = '';
  shortDexcription: boolean = false;
  showAdress: boolean = false;

  manageText(status) {
    this.userDescription = status
      ? this.userCard.description.split(' ').splice(0, 30).join(' ')
      : this.userCard.description;
    this.shortDexcription = status;
  }

  changeFields() {
    this.isEditing = false;
    this.userName = this.userCard.name;
    this.userDescription = this.userCard.description;
    if (this.userDescription.length > 10) {
      this.shortDexcription = true;
      this.userDescription = this.userCard.description
        .split(' ')
        .splice(0, 30)
        .join(' ');
    }
  }

  changePhoto() {
    console.log('CHANGE_PHOTO');
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 920px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
    this.userName = this.userCard.name;
    this.userDescription = this.userCard.description;
    if (this.userDescription.length > 10) {
      this.shortDexcription = true;
      this.userDescription = this.userCard.description
        .split(' ')
        .splice(0, 30)
        .join(' ');
    }
  }
}
