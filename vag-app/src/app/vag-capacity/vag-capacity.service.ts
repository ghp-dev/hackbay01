import { Injectable } from '@angular/core';
import { CapacityState } from './capacity-state';

@Injectable({
  providedIn: 'root'
})
export class VagCapacityService {

  constructor() { }

  getState(line: number, direction: string, time: Date): CapacityState {
    if (line === 44 && direction === 'Nürnberg Hauptbahnhof' && time.getHours() >= 7 && time.getHours() < 9) {
      return CapacityState.Red;
    }
    return CapacityState.Green;
  }
}
