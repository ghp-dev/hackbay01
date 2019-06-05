import { Injectable } from '@angular/core';
import { Weather } from 'src/app/shared/weather.entity';
import { RoutingInfo } from 'src/app/shared/routing-info.entity';
import { CapacityRed, CapacityYellow, CapacityGreen } from 'src/app/services/vag-capacity/capacity-state';

@Injectable({
  providedIn: 'root',
})
export class PointsCalculatorService {

  constructor() {
  }

  calculatePoints(weatherData: Weather, routeData: RoutingInfo, capacityData: number): number {
    console.log('Points-Calculator: Init-State');
    let points = 0;
    // Info: Wetterdaten nur für Berechnung der Punkte für Autofahrten relevant:
    //        (je wärmer, desto mehr muss das Auto kühlen, desto mehr Kraftstoff wird verbraucht)

    // Points für capacityData
    switch (capacityData) {
      case CapacityGreen:
        points += 80;
        break;

      case CapacityYellow:
        points += 40;
        break;

      case CapacityRed:
        points += 10;
        break;

      default:
        points += 100;
    }

    // Points für Routen-Schritte-Verkehrsmittel


    return points;
  }
}
