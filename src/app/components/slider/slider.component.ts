import { Component, Input, OnInit } from '@angular/core';
import { PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  images = [
    'https://d.radikal.ru/d31/1909/b0/7d66ac650f9b.jpg',
    'https://a.radikal.ru/a19/1909/ac/67bddd0eb156.jpg',
  ];

  @Input() photos: string[] = [];

  photosWithUrl = [];

  @Input() initialCurrent = 0;

  current = this.initialCurrent;

  selectCurrent = (id: number) => {
    this.current = id;
  };

  changeCurrent = (sliderToggle: boolean) => {
    if (this.current < this.images.length - 1 && this.current > 0) {
      this.current = sliderToggle ? ++this.current : --this.current;
    } else if (this.current === this.images.length - 1) {
      this.current = sliderToggle ? 0 : --this.current;
    } else if (this.current === 0) {
      this.current = sliderToggle ? ++this.current : this.images.length - 1;
    }
  };

  constructor() {}

  ngOnInit() {
    this.photosWithUrl = this.photos;
    console.log('photos', this.photos, this.photosWithUrl);
  }
}
