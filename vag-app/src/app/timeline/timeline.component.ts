import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { RoutingInfo } from '../shared/routing-info.entity';
import { WeatherService } from '../services/weather/weather.service';
import { Weather } from '../shared/weather.entity';
import { LoadService } from '../services/loads/load.service';
import { CapacityState } from '../services/vag-capacity/capacity-state';
import { PreferencesService } from '../preferences/preferences.service';
import { TransitLine } from '../shared/transit-line.entity';
import { Router } from '@angular/router';

@Component( {
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: [ './timeline.component.scss' ]
} )
export class TimelineComponent implements OnInit {

    private routes: any[] = [];
    private weather: Weather = new Weather('0', 'sunny');

    constructor(
        private routingService: RoutingService,
        private weatherService: WeatherService,
        private loadService: LoadService,
        private preferencesService: PreferencesService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.weatherService.fetchWeatherForecastHourly(new Date()).subscribe(value => {
            this.weather = value;
        });

        const preferences = this.preferencesService.load();

        if (!preferences.home || !preferences.work) {
            this.router.navigate(['/preferences']);
        } else {
            this.routingService
                .navigate( {
                    startTime: new Date(),
                    startAddress: preferences.home,
                    endAddress: preferences.work,
                } )
                .then(
                    ( results: RoutingInfo[] ) => {

                    console.dir( results );


                    results.forEach(item => item.steps = this.loadService.getLoad(item.id));
                    this.routes = results.sort((a, b) => a.startTime < b.startTime ? -1 : 1);
                    console.dir(this.routes);
                },
                ( status ) => {
                    console.error( status );
                }
            );
    }

    loadState(route: RoutingInfo): CapacityState {
      let state = CapacityState.Green;

      route.steps.forEach(step => {
        if (step.loadState === CapacityState.Red) {
          state = CapacityState.Red;
        } else if (step.loadState === CapacityState.Yellow && state === CapacityState.Green) {
          state = CapacityState.Yellow;
        }
      });

      return state;
    }

    getLoadStateClass(route: RoutingInfo): string {
      switch (this.loadState(route)) {
        case CapacityState.Red:
          return 'mgl-timeline-entry-dot-red';
        case CapacityState.Yellow:
          return 'mgl-timeline-entry-dot-yellow';
        default:
            return 'mgl-timeline-entry-dot-green';
      }
    }

    getLoadStateClassOfStep(step: TransitLine): string {
      switch (step.loadState) {
        case CapacityState.Red:
          return 'mgl-timeline-entry-dot-red';
        case CapacityState.Yellow:
          return 'mgl-timeline-entry-dot-yellow';
        default:
            return 'mgl-timeline-entry-dot-green';
      }
    }
}
