import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather/weather.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    /*
    this.weatherService.fetchWeatherForecastHourly()
    .subscribe(() => {
      console.log('klappt.');
    }, error => {
      console.log(error);
    }); */
  }

}
