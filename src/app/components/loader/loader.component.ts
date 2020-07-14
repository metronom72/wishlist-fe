import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  constructor() {}

  @Input() loaderSize: string = '20px';
  @Input() loaderBorder: string = '4px';

  ngOnInit(): void {}
}
