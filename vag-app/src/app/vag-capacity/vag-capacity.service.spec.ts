import { TestBed } from '@angular/core/testing';

import { VagCapacityService } from './vag-capacity.service';
import { CapacityState } from './capacity-state';

describe('VagCapacityService', () => {
  let service: VagCapacityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(VagCapacityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should return state green for line 65', () => {

    const result = service.getState(65, 'Nürnberg Nordostbahnhof', new Date(2019, 5, 6, 8, 0, 0, 0));

    expect(result).toBe(CapacityState.Green);
  });

  fit('should return state red for line 44 direction Hauptbahnhof at 8 am', () => {
    const result = service.getState(44, 'Nürnberg Hauptbahnhof', new Date(2019, 5, 6, 8, 0, 0, 0));

    expect(result).toBe(CapacityState.Red);
  });

  fit('should return state red for line 44 direction Hauptbahnhof at 9 am', () => {
    const result = service.getState(44, 'Nürnberg Hauptbahnhof', new Date(2019, 5, 6, 8, 0, 0, 0));

    expect(result).toBe(CapacityState.Red);
  });

  fit('should return state green for line 44 direction Zerzabelshof Ost', () => {
    const result = service.getState(44, 'Nürnberg Zerzabelshof Ost', new Date(2019, 5, 6, 8, 0, 0, 0));

    expect(result).toBe(CapacityState.Green);
  });
});
