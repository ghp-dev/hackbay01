import { Component, OnInit, ElementRef } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { RoutingInfo } from '../shared/routing-info.entity';
import { WeatherService } from '../services/weather/weather.service';
import { Weather } from '../shared/weather.entity';
import { LoadService } from '../services/loads/load.service';
import { CapacityRed, CapacityYellow, CapacityGreen } from '../services/vag-capacity/capacity-state';
import { PreferencesService } from '../preferences/preferences.service';
import { Router, RoutesRecognized } from '@angular/router';
import { TransitLine, TransitType_Walking } from '../shared/transit-line.entity';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { PointsCalculatorService } from '../services/points-calculator/points-calculator.service';
import { isNgTemplate } from '@angular/compiler';
import { animate, animation, style } from '@angular/animations';
import { WalletService } from '../services/wallet/wallet.service';

@Component( {
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: [ './timeline.component.scss' ]
} )
export class TimelineComponent implements OnInit {

  private animation;
  private travelDate: Date = environment.presentation ? new Date(2019, 5, 6, 7, 50) : new Date();
    private routes: any[] = [];
    private weather: Weather = new Weather('0', 'sunny');

    constructor(
        private routingService: RoutingService,
        private weatherService: WeatherService,
        private loadService: LoadService,
        private pointsCalculatorService: PointsCalculatorService,
        private preferencesService: PreferencesService,
        private router: Router,
        private toastrService: ToastrService,
        private walletService: WalletService
    ) { }

    doSth(ref: ElementRef){
      ref.nativeElement.class = 'stuff-animated';
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

        const preferences = this.preferencesService.load();

        if (!preferences.home || !preferences.work) {
            this.router.navigate(['/preferences']);
        } else {
          this.weatherService.fetchWeatherForecastHourly(this.travelDate).subscribe(value => {
            this.weather = value;
            this.routingService
                .navigate( {
                    startTime: this.travelDate,
                    startAddress: preferences.home,
                    endAddress: preferences.work,
                } )
                .then(
                    ( results: any[] ) => {

                        console.dir( results );

                        results.forEach( item => {
                          item.steps = this.loadService.getLoad( item.id );
                          item.weather = this.weather;
                          item.points = this.pointsCalculatorService.calculatePoints(this.weather, item, this.loadState(item));
                        });

                        this.routes = results.sort( ( a, b ) => a.startTime < b.startTime ? -1 : 1 );
                        if (environment.presentation) {
                          results[0].weather = new Weather('16', 'sunny');
                          results[0].recommendation = true;
                        }

                        console.dir( this.routes );
                    },
                    ( status ) => {
                        console.error( status );
                    }
                );
              });
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
          if (step.type === TransitType_Walking) {
            return '';
          }
          return 'mgl-timeline-entry-dot-green';
      }
    }

    startRoute(points: number) {
      this.walletService.addPoints(points);
    }
}
