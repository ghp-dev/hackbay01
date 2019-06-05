import { Injectable } from '@angular/core';
import { Weather } from 'src/app/shared/weather.entity';
import { RoutingInfo } from 'src/app/shared/routing-info.entity';
import { CapacityRed, CapacityYellow, CapacityGreen } from 'src/app/services/vag-capacity/capacity-state';
import { TransitType_Walking, TransitType_Transit, TransitType_Bike, TransitType_Taxi } from 'src/app/shared/transit-line.entity';

@Injectable({
  providedIn: 'root',
})
export class PointsCalculatorService {

  constructor() {
  }

  calculatePoints(weatherData: Weather, routeData: RoutingInfo, capacityData: number): number {
    let points = 0;

    // Points für Wetter (Energieverbrauch Klimaanlage)
    routeData.steps.forEach(item => points += this.pointsForWeather(item.type, weatherData));

    // Points für Kapazitätsdaten
    points += this.pointsForCapacity(capacityData);

    // Points für Routen-Schritte-Verkehrsmittel
    routeData.steps.forEach(item => points += this.pointsForType(item.type));

    return points;
  }

  private pointsForCapacity(capacity: number): number {
    switch (capacity) {
      case CapacityGreen:
        return 8;

      case CapacityYellow:
        return 4;

      case CapacityRed:
        return 1;

      default:
        return 0;
    }
  }

  private pointsForType(typeName: string): number {
    switch (typeName) {
      case TransitType_Walking:
        return 8;

      case TransitType_Bike:
        return 7;

      case TransitType_Transit:
        return 5;

      case TransitType_Taxi:
        return 2;

      default:
        return 0;
    }
  }

  private pointsForWeather(typeName: string, weather: Weather): number {
    if (parseInt(weather.temperature, 10) > 23) {
      switch (typeName) {
        case TransitType_Walking:
          return 5;

        case TransitType_Bike:
          return 5;

        case TransitType_Transit:
          return 2;

        case TransitType_Taxi:
          return 0;

        default:
          return 0;
      }
    }
    return 0;
  }
}
