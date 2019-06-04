import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConfig } from 'src/app/app.endpoints.config';
import { map, catchError, tap, filter, switchMap } from 'rxjs/operators';
import { Weather } from 'src/app/shared/weather.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private endpoints: EndpointsConfig, private httpClient: HttpClient) {
  }

  fetchWeatherForecastHourly(timestamp: Date): Observable<Weather> {
    const newTimestamp = this.buildCompareDateString(this.roundToHour(timestamp));

    console.log('UTC-Timestamp for WeatherAPI-Response-Extraction:' + newTimestamp);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };



    return this.httpClient.get(this.endpoints.fetchWeatherForecastHourly())
      .pipe(
        map(result => {
          const entry = result["hourlyForecasts"]["forecastLocation"]["forecast"].filter(item => item.utcTime === newTimestamp);
          return new Weather(entry[0]["temperature"], entry[0]["iconName"])
        }
        ));
  }

  private buildCompareDateString(date: Date) {
    return date.getFullYear() + '-0' + (date.getUTCMonth()+1) + '-0' + (date.getUTCDate()+1) + 'T' + date.getHours() + ':00:00.000+02:00';
  }

  private roundToHour(date) {
    let p = 60 * 60 * 1000; // milliseconds in an hour
    return new Date(Math.round(date.getTime() / p) * p);
  }
}
