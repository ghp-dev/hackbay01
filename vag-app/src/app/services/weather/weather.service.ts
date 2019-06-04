import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Weather} from '../../shared/weather.entity';
import { EndpointsConfig } from 'src/app/app.endpoints.config';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private endpoints: EndpointsConfig, private httpClient: HttpClient) {
  }

  fetchWeather(): Observable<Weather> {
    return this.httpClient.get<Weather>(this.endpoints.fetchWeather());
  }
}
