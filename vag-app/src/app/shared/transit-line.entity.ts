import {CapacityState} from '../services/vag-capacity/capacity-state';

export interface TransitLine {
    name: string;
    direction: string;
    time: Date;
    icon?: string;
    loadState?: CapacityState;
}
