import { TestBed } from '@angular/core/testing';

import { LoadService } from './load.service';
import {CapacityState} from '../vag-capacity/capacity-state';

describe('LoadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadService = TestBed.get(LoadService);
    expect(service).toBeTruthy();
  });


  it ('should get load per line', () =>  {
    const service: LoadService = TestBed.get(LoadService);
    const actual = service.getLoad();

    const expectedDate = '1969-07-20T00:20:18.000Z';
    expect(actual)
      .toEqual(
        [
          {
            name: '39',
            direction: 'Frankenstraße',
            time: expectedDate,
            loadState: CapacityState.Green
          },
          {
            name: '65',
            direction: 'Hiroshimaplatz',
            time: expectedDate,
            loadState: CapacityState.Green
          },
          {
            name: '68',
            direction: 'Langwasser Mitte',
            time: expectedDate,
            loadState: CapacityState.Green
          },
        ]);

  });
});
