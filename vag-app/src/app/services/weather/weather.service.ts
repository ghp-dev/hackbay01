import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { EndpointsConfig } from 'src/app/app.endpoints.config';
import { map, catchError, tap } from 'rxjs/operators';
import {Weather} from 'src/app/shared/weather.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private endpoints: EndpointsConfig, private httpClient: HttpClient) {
  }

  fetchWeatherForecastHourly(timestamp: Date): Weather {
    const newTimestamp = this.roundToHour(timestamp).toUTCString();

    console.log('UTC-Timestamp for WeatherAPI-Response-Extraction:' + newTimestamp);

    return new Weather('23.0', 'mostly_sunny');

    // TODO: Eigentlicher Call
    // return this.httpClient.get<Weather>(this.endpoints.fetchWeatherForecastHourly());
  }

  private roundToHour(date) {
    let p = 60 * 60 * 1000; // milliseconds in an hour
    return new Date(Math.round(date.getTime() / p ) * p);
  }
}
