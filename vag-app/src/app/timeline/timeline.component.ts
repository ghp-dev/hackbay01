import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { RoutingInfo } from '../shared/routing-info.entity';
import { WeatherService } from '../services/weather/weather.service';

@Component( {
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: [ './timeline.component.scss' ]
} )
export class TimelineComponent implements OnInit {

    private routes: RoutingInfo[] = [];

    constructor(
        private routingService: RoutingService,
        private weatherService: WeatherService,
    ) {
    }

    ngOnInit() {
        this.weatherService.fetchWeatherForecastHourly(new Date()).subscribe(value => {
            console.log(value);
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

                    this.routes = results;
                },
                ( status ) => {
                    console.error( status );
                }
            );
    }

}
