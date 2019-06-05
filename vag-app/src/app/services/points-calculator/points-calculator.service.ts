import { Injectable } from '@angular/core';
import { Weather } from 'src/app/shared/weather.entity';
import { RoutingInfo } from 'src/app/shared/routing-info.entity';

@Injectable({
  providedIn: 'root',
})
export class PointsCalculatorService {

  constructor() {
  }

  calculatePoints(weatherData: Weather, routeData: RoutingInfo, capacityData: number): number {
    console.log('Points-Calculator: Init-State');
    // Info: Wetterdaten nur für Berechnung der Punkte für Autofahrten relevant:
    //        (je wärmer, desto mehr muss das Auto kühlen, desto mehr Kraftstoff wird verbraucht)

    // TODO: Berechnungslogik implementieren

    return 123;
  }
}
