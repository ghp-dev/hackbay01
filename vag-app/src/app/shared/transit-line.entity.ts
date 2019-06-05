export interface TransitLine {
    name: string;
    direction: string;
    time: Date;
    icon?: string;
    loadState?: number;
    type: string;
}

export const TransitType_Walking = 'WALKING';
export const TransitType_Transit = 'TRANSIT';
export const TransitType_Bike = 'BIKE';
export const TransitType_Taxi = 'TAXI';