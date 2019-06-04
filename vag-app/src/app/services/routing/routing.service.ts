import { Injectable } from '@angular/core';
import { TransitLine } from '../../shared/transit-line.entity';
import { RoutingRequestEntity } from '../../shared/routing-request.entity'
import { RoutingInfo} from '../../shared/routing-info.entity'

declare const google: any;

@Injectable( {
    providedIn: 'root',
} )
export class RoutingService {

    private directionsService: any;

    constructor() {
    }

    public getDirectionsService() {
        return new google.maps.DirectionsService();
    }

    public navigate(routingRequestEntitty: RoutingRequestEntity) {

        var routingInfos: RoutingInfo[] = [];

        return new Promise((resolve, reject) => {
            this.getDirectionsService().route( {
            origin: { lat: routingRequestEntitty.startLat, lng: routingRequestEntitty.startLong },
            destination: { lat: routingRequestEntitty.endLat, lng: routingRequestEntitty.endLong },
            transitOptions: {arrivalTime: routingRequestEntitty.startTime, departureTime: routingRequestEntitty.endTime},
            travelMode: 'TRANSIT'
        }, ( response, status ) => {
            if(status == 'OK')  {
                response.routes.forEach(routes => {
                    var entity: RoutingInfo;
                    entity.vehicleIcons = [];
                    entity.startTime = routes.legs[0].departure_time;
                    var gotFirstTransit = false;
                    routes.legs[0].steps.forEach((step) => {
                        if (step.travel_mode == 'TRANSIT')
                        {
                            if(!gotFirstTransit) {
                            entity.startStation = step.departure_stop.name;
                            entity.startTransitLine = step.line.short_name;
                            gotFirstTransit = true;
                            }
                            entity.vehicleIcons.push(step.line.vehicle.icon);
                        }
                    });
                    routingInfos.push(entity);
                });
                resolve(routingInfos);
            } else {
                reject(status);
            }
        } )});
    }

    public routeInfo(id: string): TransitLine[] {
        return [
            {
                name: '39',
                direction: 'Frankenstraße',
                time: new Date(),
            },
            {
                name: '65',
                direction: 'Hiroshimaplatz',
                time: new Date(),
            },
            {
                name: '68',
                direction: 'Langwasser Mitte',
                time: new Date(),
            },
        ];
    }

    // Route
    //  id
    // ->
    // [
    //   Linie
    //   Direction
    //   Time
    // ]

    //


}
