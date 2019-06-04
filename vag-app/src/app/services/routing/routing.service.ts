import { Injectable } from '@angular/core';
import { TransitLine } from '../../shared/transit-line.entity';

declare const google: any;

@Injectable( {
    providedIn: 'root',
} )
export class RoutingService {

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

      const date = new Date('July 20, 69 00:20:18 GMT+00:00');
      return [
            {
                name: '39',
                direction: 'Frankenstraße',
                time: date,
            },
            {
                name: '65',
                direction: 'Hiroshimaplatz',
                time: date,
            },
            {
                name: '68',
                direction: 'Langwasser Mitte',
                time: date,
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
