import { Injectable } from '@angular/core';
import { CapacityRed, CapacityYellow, CapacityGreen } from './capacity-state';

@Injectable({
  providedIn: 'root'
})
export class VagCapacityService {

  constructor() { }

  getState(line: string, direction: string, time: Date): number {
    if (direction === 'Nürnberg Hbf' && this.isCommutingTime(time)) {
      return CapacityRed;
    }
    if (line === 'U1' && this.isCommutingTime(time)) {
      return CapacityRed;
    }
    if (line === 'U3') {
      return CapacityYellow;
    }
    return CapacityGreen;
  }

  private isCommutingTime(time: Date): boolean {
    if (time.getHours() >= 7 && time.getHours() < 9) {
      return true;
    }

    if (time.getHours() >= 16 && time.getHours() < 18) {
      return true;
    }

    return false;
  }
}
