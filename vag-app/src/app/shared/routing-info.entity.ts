import { TransitLine } from './transit-line.entity';

export interface RoutingInfo {
    startTime: Date;
    startStation: string;
    startTransitLine: TransitLine;
    vehicleIcons: String[];
}
