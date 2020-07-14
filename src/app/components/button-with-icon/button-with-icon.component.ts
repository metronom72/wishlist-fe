import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-with-icon',
  templateUrl: './button-with-icon.component.html',
  styleUrls: ['./button-with-icon.component.scss'],
})
export class ButtonWithIconComponent implements OnInit {
  constructor() {}

  @Input() isLoading: boolean = false;
  @Input() iconWrapperColor: string = '#e8e8e8';
  @Input() iconBodyColor: string = '#2b2b2b';
  @Input() textColor: string = '#e8e8e8';
  @Input() buttonText: string = 'BUTTON';
  @Input() buttonIcon: string = '../../../assets/icons/Bag.svg';
  @Input() buttonProductCount: number = 0;
  @Output() onEventEmit = new EventEmitter();

  @Input() isInitState: boolean = false;

  emitEvent() {
    this.onEventEmit.emit();
  }
  ngOnInit(): void {}
}
