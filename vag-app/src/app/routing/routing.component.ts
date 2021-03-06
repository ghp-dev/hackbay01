import { Component, OnInit, ViewChild } from '@angular/core';
import { RoutingService } from '../services/routing/routing.service';
import { RoutingInfo } from '../shared/routing-info.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.presentation';
import { TransitType_Transit } from '../shared/transit-line.entity';

declare const google: any;
declare const window: any;

@Component( {
    selector: 'app-routing',
    templateUrl: './routing.component.html',
    styleUrls: [ './routing.component.scss' ]
} )
export class RoutingComponent implements OnInit {

    private route: RoutingInfo;

    @ViewChild('gmap', { static: true }) gmapElement: any;

    public map: any;

    private actualStep = 1;

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
      /*  const mapProp = {
            center: new google.maps.LatLng(18.5793, 73.8143),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

        const directionsRenderer = this.routingService.getDirectionsRenderer();

        directionsRenderer.setMap( this.map );
        directionsRenderer.setDirections( this.route.apiResult );
        directionsRenderer.setRouteIndex( this.route.routeIndex );*/
    }

    private initToastr() {
      if (!environment.presentation) {
        this.route.steps
            .filter((step) => step.type === TransitType_Transit)
            .forEach((step, index) => {
                setTimeout(() => {
                    this.toastrService.info('Linie ' + step.name + ' an nächster Haltestellen verlassen', 'Umsteigen', {
                        positionClass: 'toast-bottom-right',
                        timeOut: 3000,
                    });
                }, (index + 1) * 5000);
            });
          }
    }

    triggerNextStep() {
      if (this.actualStep === 1) {
        this.toastrService.info('Linie ' + this.route.steps[1].name + ' an nächster Haltestellen verlassen', 'Umsteigen', {
          positionClass: 'toast-bottom-right',
          timeOut: 3000,
        });
        setTimeout(() => this.actualStep++, 3000);
      } else if(this.actualStep === 2) {
        this.router.navigate(['/option']);
      }
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.loadRoute(params.id);

            if (this.route) {
                this.initMap();
                this.initToastr();

                window.scrollTo( 0, 0 );
            }
        });
    }

}
