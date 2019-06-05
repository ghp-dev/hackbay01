import { TestBed } from '@angular/core/testing';

import { PointsCalculatorService } from './points-calculator.service';

xdescribe('PointsCalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointsCalculatorService = TestBed.get(PointsCalculatorService);
    expect(service).toBeTruthy();
  });
});
