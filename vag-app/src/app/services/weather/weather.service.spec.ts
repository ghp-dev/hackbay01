import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import {WeatherServiceMock} from './weather-mock.service';

xdescribe('WeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherServiceMock = TestBed.get(WeatherServiceMock);
    expect(service).toBeTruthy();
  });
});
