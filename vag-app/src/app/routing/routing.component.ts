import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { RoutingInfo } from '../shared/routing-info.entity';

@Component( {
    selector: 'app-routing',
    templateUrl: './routing.component.html',
    styleUrls: [ './routing.component.scss' ]
} )
export class RoutingComponent implements OnInit {

    constructor(
        private routingService: RoutingService,
    ) {
    }

    ngOnInit() {
        this.routingService
            .navigate( {
                startTime: new Date(),
                startAddress: 'Hugenottenplatz, Erlangen',
                endAddress: 'Gostenhof, Nürnberg',
            } )
            .then(
                ( results: RoutingInfo[] ) => {
                    console.dir( results );


                    results.forEach(result => {
                        console.dir(this.routingService.routeInfo(result.id));
                    });
                },
                ( status ) => {
                    console.error( status );
                }
            );
    }

}
