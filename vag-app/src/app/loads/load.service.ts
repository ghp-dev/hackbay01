import { Injectable } from '@angular/core';
import {VagCapacityService} from '../vag-capacity/vag-capacity.service';
import {RoutingService} from '../services/routing/routing.service';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  constructor(private capService: VagCapacityService, private routeService: RoutingService) { }

  /**
   * returns the current route's load distribution
   */
  getLoad() {

    const linesOnRoute = this.routeService.routeInfo('1');

    const result = JSON.parse(JSON.stringify(linesOnRoute));
    result.map((transport) => {
      transport.loadState = this.capService
        .getState(transport.name, transport.direction, transport.time);
    });

    return result;
  }
}
