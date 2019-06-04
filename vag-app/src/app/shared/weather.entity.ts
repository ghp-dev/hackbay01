export class Weather {
    temperature: string;
    iconName: string;

    constructor(private temp: string, private icon: string) {
        this.temperature = temp;
        this.iconName = icon;
    }
}
