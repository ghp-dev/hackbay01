import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { EndpointsConfig } from 'src/app/app.endpoints.config';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private endpoints: EndpointsConfig, private httpClient: HttpClient) {
  }

  fetchWeatherForecastHourly(): Observable<any> {
    return this.httpClient.get(this.endpoints.fetchWeatherForecastHourly()).pipe(
      map(this.extractData));
  }

  private extractData(res: Response) {
    return res || { };
  }
}
