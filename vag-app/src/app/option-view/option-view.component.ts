import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-option-view',
  templateUrl: './option-view.component.html',
  styleUrls: ['./option-view.component.scss']
})
export class OptionViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chooseBike() {
    // TODO router link to BikePickup
  }
}
