import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bike-pickup',
  templateUrl: './bike-pickup.component.html',
  styleUrls: ['./bike-pickup.component.scss']
})
export class BikePickupComponent implements OnInit {
  private isQrCode: boolean;

  constructor() { }

  ngOnInit() {
    this.isQrCode = true;
  }

  releaseBike() {
    this.isQrCode = false;
  }
}
