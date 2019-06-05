import {CapacityState} from '../services/vag-capacity/capacity-state';

export enum TransitType {
    WALKING = 'WALKING',
    TRANSIT = 'TRANSIT',
}

export interface TransitLine {
    name: string;
    direction: string;
    time: Date;
    icon?: string;
    loadState?: CapacityState;
    type: TransitType;
}
