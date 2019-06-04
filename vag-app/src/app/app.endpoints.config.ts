import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EndpointsConfig {

  private readonly weatherApiUri: string;

  constructor() {
    this.weatherApiUri = environment.weather_api_uri;
  }

  fetchWeather(): string {
    return `${this.weatherApiUri}`;
  }
}
