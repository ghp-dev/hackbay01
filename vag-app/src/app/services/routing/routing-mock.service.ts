import {Injectable} from '@angular/core';
import {TransitLine, TransitType_Transit, TransitType_Walking} from '../../shared/transit-line.entity';
import {RoutingInfo} from '../../shared/routing-info.entity';

@Injectable( /*{
//    providedIn: 'root',
} */)
export class RoutingMockService {

    constructor() {
    }

    private routes: Map<string, RoutingInfo> = new Map<string, RoutingInfo>();

  // tslint:disable-next-line
  private _37Minutes = 37 * 1000 * 60;

  private ICON_WALK = '../../assets/img/walk-icon.png';

  private ICON_TRANSIT_U = '../../assets/img/u-icon.png';

  private ICON_TRANSIT_R = '../../assets/img/r-icon.png';
  private ICON_TRANSIT_BUS = '../../assets/img/bus-icon.png';

  public getDirectionsRenderer() {
    }

    // noinspection JSUnusedLocalSymbols
  public navigate(routingRequestEntity: any) {
    return new Promise((resolve) => {
      const x = this.getMockedRoutingInfos();

      resolve(x);
    });
  }

  private getMockedRoutingInfos(): RoutingInfo[] {

    const routingInfos: RoutingInfo[] = [];

    const routingInfo = new RoutingInfo();
    routingInfo.id = this.createRouteId();
    routingInfo.startTime = new Date();
    routingInfo.endTime = new Date(routingInfo.startTime.getTime() + this._37Minutes);

    routingInfo.startStation = 'Heroldsberg';
    routingInfo.startTransitLine =  {
      direction: 'Nürnberg Nordost',
      icon: this.ICON_TRANSIT_R,
      loadState: 17,
      name: 'RB 58710 (R21)',
      time: routingInfo.startTime,
      type: TransitType_Transit,
    };
    routingInfo.vehicleIcons.push(this.ICON_TRANSIT_R);

    routingInfo.steps.push({
      time: new Date(routingInfo.startTime.getTime() + 14 * 1000 * 60),
      direction: 'Röthenbach',
      name: 'U2',
      icon: this.ICON_TRANSIT_U,
      type: TransitType_Transit,
    });
    routingInfo.vehicleIcons.push(this.ICON_WALK);

    routingInfo.steps.push({
      time: new Date(routingInfo.startTime.getTime() + 9 * 1000 * 60),
      direction: 'Langwasser Süd',
      name: 'U1',
      icon: this.ICON_TRANSIT_U,
      type: TransitType_Transit,
    });

    routingInfo.steps.push({
      time: new Date(routingInfo.startTime.getTime() + 13 * 1000 * 60),
      direction: 'Nordostbahnhof',
      name: '65',
      icon: this.ICON_TRANSIT_BUS,
      type: TransitType_Transit,
    });

    routingInfo.steps.push({
      time: new Date(routingInfo.startTime.getTime() + 1 * 1000 * 60),
      direction: 'ca. 1 Min (0,2 km)',
      name: 'Fußweg',
      icon: this.ICON_WALK,
      type: TransitType_Walking,
    });
    routingInfo.routeIndex = 1;

    this.routes.set(routingInfo.id, routingInfo);

    routingInfos.push(routingInfo);

// push more fake routes
    let temp = JSON.parse(JSON.stringify(routingInfo));
    temp.id = this.createRouteId();
    temp.startTime = new Date(routingInfo.startTime.getTime() + 15 * 1000 * 60);
    temp.endTime = new Date(temp.startTime.getTime() + this._37Minutes);

    temp.routeIndex = 2;

    this.routes.set(temp.id, temp);

    routingInfos.push(temp);

    temp = JSON.parse(JSON.stringify(routingInfo));
    temp.id = this.createRouteId();
    temp.startTime = new Date(routingInfo.startTime.getTime() + 30 * 1000 * 60);
    temp.endTime = new Date(temp.startTime.getTime() + this._37Minutes);

    temp.routeIndex = 3;

    this.routes.set(temp.id, temp);


    routingInfos.push(temp);

    temp = JSON.parse(JSON.stringify(routingInfo));
    temp.id = this.createRouteId();
    temp.startTime = new Date(routingInfo.startTime.getTime() + 45 * 1000 * 60);
    temp.endTime = new Date(temp.startTime.getTime() + this._37Minutes);

    temp.routeIndex = 4;

    this.routes.set(temp.id, temp);

    routingInfos.push(temp);
    temp = JSON.parse(JSON.stringify(routingInfo));
    temp.id = this.createRouteId();
    temp.startTime = new Date(routingInfo.startTime.getTime() + 60 * 1000 * 60);
    temp.endTime = new Date(temp.startTime.getTime() + this._37Minutes);

    temp.routeIndex = 5;

    this.routes.set(temp.id, temp);

    routingInfos.push(temp);

    return routingInfos;
  }

  public getRoute( id: string ): RoutingInfo {
    console.dir('mocked: ' + this.routes.size);
    return this.routes.get( id );
  }

  public routeInfo( id: string ): TransitLine[] {

    const routingInfo = this.routes.get( id );

    if (!routingInfo) {
      return [];
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
