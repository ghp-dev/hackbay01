import { Injectable } from '@angular/core';
import {VagCapacityService} from '../vag-capacity/vag-capacity.service';
import {RoutingService} from '../routing/routing.service';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  constructor(private capService: VagCapacityService, private routeService: RoutingService) { }

  /**
   * returns the current route's load distribution
   */
  getLoad(id: string) {

    const linesOnRoute = this.routeService.routeInfo(id);

    const result = JSON.parse(JSON.stringify(linesOnRoute));
    result.map((transport) => {
      transport.loadState = this.capService
        .getState(transport.name, transport.direction, new Date(transport.time));
    });

    return result;
  }
}
