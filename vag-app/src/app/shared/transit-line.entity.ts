export interface TransitLine {
    name: string;
    direction: string;
    time: Date;
    icon?: string;
    loadState?: number;
    type: string;
}
