import { Component, OnInit, ViewChild } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { RoutingInfo } from '../shared/routing-info.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare const google: any

@Component( {
    selector: 'app-routing',
    templateUrl: './routing.component.html',
    styleUrls: [ './routing.component.scss' ]
} )
export class RoutingComponent implements OnInit {

    private route: RoutingInfo;

    @ViewChild('gmap', { static: true }) gmapElement: any;

    public map: any;

    constructor(
        private routingService: RoutingService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService
    ) {
    }

    private loadRoute(id: string) {
        const route = this.routingService.getRoute(id);

        if (!route) {
            this.router.navigate(['/']);
        } else {
            this.route = route;
        }
    }

    private initMap() {
        const mapProp = {
            center: new google.maps.LatLng(18.5793, 73.8143),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

        const directionsRenderer = this.routingService.getDirectionsRenderer();

        console.dir(this.route.apiResult);

        directionsRenderer.setMap(this.map);
        directionsRenderer.setDirections(this.route.apiResult);
        directionsRenderer.setRouteIndex(this.route.routeIndex);
    }

    private initToastr() {
        setTimeout(() => {
            this.toastrService.info('Linie U1 in 5 Minuten', 'Umsteigen - Frankenstraße', {
                positionClass: 'toast-bottom-right',
                timeOut: 10000,
            });
        }, 4000);
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.loadRoute(params.id);

            this.initMap();
            this.initToastr();
        });
    }

}
