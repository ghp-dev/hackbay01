import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {WeatherForecastHourly} from '../../shared/weather-forecast-hourly.entity';
import { EndpointsConfig } from 'src/app/app.endpoints.config';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private endpoints: EndpointsConfig, private httpClient: HttpClient) {
  }

  fetchWeatherForecastHourly(): Observable<WeatherForecastHourly> {
    return this.httpClient.get<WeatherForecastHourly>(this.endpoints.fetchWeatherForecastHourly());
  }
}
