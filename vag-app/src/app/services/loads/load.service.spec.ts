import { TestBed } from '@angular/core/testing';

import { LoadService } from './load.service';
import { CapacityGreen } from '../vag-capacity/capacity-state';
import {DecimalPipe} from '@angular/common';
import {RoutingService} from '../routing/routing.service';
import {RoutingMockService} from '../routing/routing-mock.service';
import {VagCapacityService} from '../vag-capacity/vag-capacity.service';

describe('LoadService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DecimalPipe,
      {provide: RoutingService, useClass: RoutingService},
    VagCapacityService
    ]
  }));

  it('should be created', () => {
    const service: LoadService = TestBed.get(LoadService);
    expect(service).toBeTruthy();
  });


  it ('should get load per line', () =>  {
    const service: LoadService = TestBed.get(LoadService);
    const actual = service.getLoad('1');

    const expectedDate = '1969-07-20T00:20:18.000Z';
    expect(actual)
      .toEqual(
        [
          {
            name: '39',
            direction: 'Frankenstraße',
            time: expectedDate,
            loadState: CapacityGreen
          },
          {
            name: '65',
            direction: 'Hiroshimaplatz',
            time: expectedDate,
            loadState: CapacityGreen
          },
          {
            name: '68',
            direction: 'Langwasser Mitte',
            time: expectedDate,
            loadState: CapacityGreen
          },
        ]);

  });
});
