import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-stage-indicator',
  templateUrl: './stage-indicator.component.html',
  styleUrls: ['./stage-indicator.component.scss']
})
export class StageIndicatorComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }

  isActive: boolean = false

  ngOnInit(): void {
    console.log('ROUTE-INDICATOR', this.route.url)
  }

}
