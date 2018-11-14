export class Country {
    id: number;
    name: string;
    shortName: string;
    phoneCode: string;
    updated_by: string;
    active: number;

    constructor() {
        this.active = 1;
    }
}