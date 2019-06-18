import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConfig } from 'src/app/app.endpoints.config';
import { map, catchError, tap, filter, switchMap } from 'rxjs/operators';
import {mappedIconName, Weather} from 'src/app/shared/weather.entity';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherServiceMock {

  constructor() {
  }

  fetchWeatherForecastHourly(timestamp: Date): Observable<Weather> {

    const keys = Object.keys(mappedIconName);
    const iconIndex = timestamp.getTime() % keys.length - 1;

    return of(new Weather('17.5', mappedIconName[keys[iconIndex]]));

  }

  private buildCompareDateString(date: Date) {
    return  date.getFullYear() + '-0' + (date.getUTCMonth() + 1)
      + '-0' + date.getUTCDate() + 'T' + (date.getHours() >= 10 ? date.getHours() : '0'
        + date.getHours()) + ':00:00.000+02:00';
  }

  private roundToHour(date) {
    const millisInHour = 60 * 60 * 1000;
    return new Date(Math.round(date.getTime() / millisInHour) * millisInHour);
  }
}
