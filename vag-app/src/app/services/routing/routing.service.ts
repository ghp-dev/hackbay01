import { Injectable } from '@angular/core';
import { TransitLine } from '../../shared/transit-line.entity';

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

    public navigate() {
        return this.getDirectionsService().route( {
            origin: { lat: 49.450520, lng: 11.080480 },
            destination: { lat: 49.443056, lng: 11.094571 },
            travelMode: 'TRANSIT'
        }, ( response, status ) => {
            console.log( response );
            console.log( status );
        } );
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
