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

  it('should return state green for line 65', () => {

    const result = service.getState('65', 'Nürnberg Nordostbahnhof', new Date(2019, 5, 6, 8, 0, 0, 0));

    expect(result).toBe(CapacityState.Green);
  });

  it('should return state red for line 44 direction Hauptbahnhof at 8 am', () => {
    const result = service.getState('44', 'Nürnberg Hauptbahnhof', new Date(2019, 5, 6, 8, 0, 0, 0));

    expect(result).toBe(CapacityState.Red);
  });

  it('should return state red for line 44 direction Hauptbahnhof at 9 am', () => {
    const result = service.getState('44', 'Nürnberg Hauptbahnhof', new Date(2019, 5, 6, 8, 0, 0, 0));

    expect(result).toBe(CapacityState.Red);
  });

  it('should return state green for line 44 direction Zerzabelshof Ost', () => {
    const result = service.getState('44', 'Nürnberg Zerzabelshof Ost', new Date(2019, 5, 6, 8, 0, 0, 0));

    expect(result).toBe(CapacityState.Green);
  });

  it('should return state red for line U1 direction Fürth at evening commuting time', () => {
    const result = service.getState('U1', 'Nürnberg Fürth Hardhöhe', new Date(2019, 5, 6, 16, 25, 0, 0));

    expect(result).toBe(CapacityState.Red);
  });

  it('should return state yellow for line U3 in both directions and all day long', () => {
    let result = service.getState('U3', 'Nürnberg Gustav-Adolf-Straße', new Date(2019, 5, 6, 16, 25, 0, 0));
    expect(result).toBe(CapacityState.Yellow);
    result = service.getState('U3', 'Nürnberg Nordwestring', new Date(2019, 5, 6, 23, 25, 0, 0));
    expect(result).toBe(CapacityState.Yellow);
    result = service.getState('U3', 'Nürnberg Nordwestring', new Date(2019, 5, 6, 8, 25, 0, 0));
    expect(result).toBe(CapacityState.Yellow);
    result = service.getState('U3', 'Nürnberg Gustav-Adolf-Straße', new Date(2019, 5, 6, 7, 25, 0, 0));
    expect(result).toBe(CapacityState.Yellow);
  });

});
