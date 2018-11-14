export class Manager {
    id: number;
    name: string;
    pumpId: number;
    transporterId: number;
    gender: string;
    DOB: Date;
    DOJ: Date;
    address: string;
    countryId: number;
    regionId: number;
    cityId: number;
    PINCode: string;
    mobileNo: number;
    email: string;
    username: string;
    updated_by: string;
    active: number;

    constructor() {
        this.active = 1;
    }
}