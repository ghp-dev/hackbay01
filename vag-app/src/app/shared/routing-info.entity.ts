import { TransitLine } from './transit-line.entity';

export class RoutingInfo {
    id: string;
    startTime: Date;
    endTime: Date;
    startStation: string;
    startTransitLine: TransitLine;
    vehicleIcons: string[] = [];

    steps: Array<TransitLine> = [];
    points: number;
}
