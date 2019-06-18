import { Injectable } from '@angular/core';
import { CapacityRed, CapacityYellow, CapacityGreen } from './capacity-state';

@Injectable({
  providedIn: 'root'
})
export class VagCapacityService {

  constructor() { }

  getState(line: string, direction: string, time: Date): number {

    var r = Math.random();
    if (r >= 0.5) {
      return CapacityRed;
    }
    if (this.isCommutingTime(time)) {
      return CapacityRed;
    }
    if (line === 'U3') {
      return CapacityYellow;
    }
    return CapacityGreen;
  }

  private isCommutingTime(time: Date): boolean {
    const now = new Date().getTime();
    const diff = now - time.getTime();
    if (diff >= 10 * 1000 * 60 && diff <= 40 * 1000 * 60) {
      return true;
    }

    if (time.getHours() >= 16 && time.getHours() < 18) {
      return true;
    }

    return false;
  }
}
