import { Injectable } from '@angular/core';


declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class RoutingService {

    private directionsService: any;

  constructor() {
      this.directionsService = new google.maps.DirectionsService;
   }

   public navigate() {
        return this.directionsService.route({
            origin: {lat:49.450520, lng: 11.080480},
            destination: {lat: 49.443056, lng: 11.094571},
            travelMode: 'TRANSIT'
        }, function(response, status) {
            console.log(response);
            console.log(status);
        })
   }

  
  
}
