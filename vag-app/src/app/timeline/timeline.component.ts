import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { RoutingInfo } from '../shared/routing-info.entity';
import { WeatherService } from '../services/weather/weather.service';
import { Weather } from '../shared/weather.entity';
import { LoadService } from '../loads/load.service';
import { CapacityState } from '../vag-capacity/capacity-state';

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
    ) {
    }

    ngOnInit() {
        this.weatherService.fetchWeatherForecastHourly(new Date()).subscribe(value => {
            this.weather = value;
        });

        this.routingService
            .navigate( {
                startTime: new Date(),
                startAddress: 'Hugenottenplatz, Erlangen',
                endAddress: 'Gostenhof, Nürnberg',
            } )
            .then(
                ( results: RoutingInfo[] ) => {

                    console.dir( results );


                    results.forEach(item => item.steps = this.loadService.getLoad(item.id));
                    this.routes = results;
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
        if (step["loadState"] === CapacityState.Red) {
          state = CapacityState.Red;
        } else if(step["loadState"] === CapacityState.Yellow && state === CapacityState.Green) {
          state = CapacityState.Yellow;
        }
      });

      return state;
    }

    getLoadStateClass(route: RoutingInfo): string {
      switch(this.loadState(route)) {
        case CapacityState.Red:
          return 'mgl-timeline-entry-dot-red';
        case CapacityState.Yellow:
          return 'mgl-timeline-entry-dot-yellow';
        default:
            return 'mgl-timeline-entry-dot-green';
      }
    }
}
