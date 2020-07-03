import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss'],
})
export class TextfieldComponent implements OnInit {
  @Input()
  public type: string = 'text';

  @Input()
  public placeholder: string = '';

  @Input()
  public value: string = '';

  @Input()
  public isValid: boolean = true;

  @Input()
  public error: string | null = null;

  @Input()
  public helper: string | null = null;

  @Output()
  public onChange: EventEmitter<string> = new EventEmitter();

  public change(value: string) {
    this.onChange.emit(value);
  }

  constructor() {}

  ngOnInit(): void {}
}
