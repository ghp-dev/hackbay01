import { Injectable } from '@angular/core';
import { TransitLine } from '../../shared/transit-line.entity';
import { RoutingRequestEntity } from '../../shared/routing-request.entity';
import { RoutingInfo } from '../../shared/routing-info.entity';

declare const google: any;

@Injectable( {
    providedIn: 'root',
} )
export class RoutingService {

    private routes: Map<string, RoutingInfo> = new Map<string, RoutingInfo>();

    constructor() {
    }

    public getDirectionsService() {
        return new google.maps.DirectionsService();
    }

    public navigate( routingRequestEntity: RoutingRequestEntity ) {

        const routingInfos: RoutingInfo[] = [];

        return new Promise( ( resolve, reject ) => {
            this.getDirectionsService().route( {
                origin: routingRequestEntity.startAddress,
                destination: routingRequestEntity.endAddress,
                transitOptions: {
                    arrivalTime: routingRequestEntity.startTime,
                    departureTime: routingRequestEntity.endTime
                },
                provideRouteAlternatives: true,
                travelMode: 'TRANSIT'
            }, ( response, status ) => {
                if (status === 'OK') {
                    response.routes.forEach( routes => {
                        let gotFirstTransit = false;
                        const routingInfo = new RoutingInfo();
                        routingInfo.id = this.createRouteId();
                        routingInfo.startTime = routes.legs[ 0 ].departure_time.value;
                        routingInfo.endTime = routes.legs[0].arrival_time.value;

                        routes.legs[ 0 ].steps.forEach( ( step ) => {
                            console.dir( step );

                            if (step.travel_mode === 'TRANSIT') {
                                if (!gotFirstTransit) {
                                    routingInfo.startStation = step.transit.departure_stop.name;
                                    routingInfo.startTransitLine = step.transit.line.short_name;
                                    gotFirstTransit = true;
                                }
                                routingInfo.vehicleIcons.push( step.transit.line.vehicle.icon );

                                routingInfo.steps.push( {
                                    time: step.transit.departure_time.value,
                                    direction: step.transit.headsign,
                                    name: step.transit.line.short_name,
                                    icon: step.transit.line.vehicle.icon,
                                } );
                            } else {
                                console.dir(step);

                                routingInfo.steps.push( {
                                    time: new Date(), // TODO
                                    direction: null,
                                    name: step.instructions,
                                    icon: '../../assets/img/walk-icon.png',
                                });
                            }
                        } );

                        this.routes.set( routingInfo.id, routingInfo );
                        routingInfos.push( routingInfo );
                    } );
                    resolve( routingInfos );
                } else {
                    reject( status );
                }
            } );
        } );
    }

    public routeInfo( id: string ): TransitLine[] {

        const routingInfo = this.routes.get( id );

        if (routingInfo === null) {
            return null;
        }

        return routingInfo.steps;
    }

    private createRouteId(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, ( c ) => {
            // tslint:disable-next-line:no-bitwise
            const r = Math.random() * 16 | 0;
            // tslint:disable-next-line:no-bitwise
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString( 16 );
        } );
    }
}
