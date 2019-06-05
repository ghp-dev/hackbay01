import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { RoutingInfo } from '../shared/routing-info.entity';
import { WeatherService } from '../services/weather/weather.service';
import { Weather } from '../shared/weather.entity';
import { LoadService } from '../services/loads/load.service';
import { CapacityRed, CapacityYellow, CapacityGreen } from '../services/vag-capacity/capacity-state';
import { PreferencesService } from '../preferences/preferences.service';
import { TransitLine } from '../shared/transit-line.entity';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
        private router: Router,
        private toastrService: ToastrService
    ) {
    }

    triggerLeaveHomeToast() {
//      setTimeout(() => {
        this.toastrService.info('in 5 Minuten musst du das Haus verlassen', 'Es ist Zeit', {
            positionClass: 'toast-bottom-right',
            timeOut: 10000,
        });
  //  }, 2000);

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


                        results.forEach( item => item.steps = this.loadService.getLoad( item.id ) );
                        this.routes = results.sort( ( a, b ) => a.startTime < b.startTime ? -1 : 1 );
                        console.dir( this.routes );
                    },
                    ( status ) => {
                        console.error( status );
                    }
                );
        }
    }

    loadState(route: RoutingInfo): number {
      let state = CapacityGreen;

      route.steps.forEach(step => {
        if (step.loadState === CapacityRed) {
          state = CapacityRed;
        } else if (step.loadState === CapacityYellow && state === CapacityGreen) {
          state = CapacityYellow;
        }
      });

      return state;
    }

    getLoadStateClass(route: RoutingInfo) {
      const classes = {accent: true};
      switch (this.loadState(route)) {
        case CapacityRed:
          classes['mgl-timeline-entry-dot-red'] = true;
          break;
        case CapacityYellow:
          classes['mgl-timeline-entry-dot-yellow'] = true;
          break;
        case CapacityGreen:
          classes['mgl-timeline-entry-dot-green'] = true;
          break;
        default:
          // tslint:disable-next-line:no-string-literal
            classes['accent'] = true;
      }

      return classes;
    }

    getLoadStateClassOfStep(step: TransitLine): string {
      switch (step.loadState) {
        case CapacityRed:
          return 'mgl-timeline-entry-dot-red';
        case CapacityYellow:
          return 'mgl-timeline-entry-dot-yellow';
        default:
          if (step.type === 'WALKING') {
            return '';
          }
          return 'mgl-timeline-entry-dot-green';
      }
    }
}
