export class Vehicle {
    id: number;
    regNo: string;
    pumpId: number;
    transporterId: number;
    transporterName: string;
    regYear: string;
    vehicleTypeId: number;
    fuelTypeId: number;
    fuelName: string;
    blanket: number;
    blanketCash: number;
    blanketFuel: any;
    unitId: number;
    unitName: string;
    prodGroupId: number;
    capacity: any;
    updated_by: string;
    active: number;
    tdriverId: number;
    fuelType: any;
    constructor() {

        this.fuelTypeId = 1;
        this.unitId;
        this.blanket = 0;
        this.blanketCash = 0;
        this.blanketFuel = 0;

    }
}