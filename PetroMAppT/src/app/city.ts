export class City {
    id: number;
    name: string;
    countryId: number;
    regionId: number;
    active: number;

    constructor() {
        this.active = 1;
    }
}