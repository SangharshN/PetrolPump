import { DateTime } from "ionic-angular";

export class CashDispense {
    id: number;
    regNo: string;
    pumpId: number;
    transporterId: number;
    transporterName: string;
    employeeId: number;
    requestType: number;
    fuelType: number;
    fuelRequested: number;
    cashRequested: number;
    fuelActual: number;
    cashActual: number;
    fuelUnit: any;
    innoviceNo: any;
    prodId: any;
    updatedby: string;
    unitName: string;
    status: number;
    created_at?: DateTime;
    completed_at?: DateTime;
    cancelled_at?: DateTime;
    updated_by: string;
    tdriverId: number;
    tname: string;
    machineId: number;
    nozzleId: number;
    empShiftId: any;
    managerId: any;
    payModeId: number;
    requestId: any;
    requestComplete: any;
    DSMId: any;

    cardId: any;
    productId: any;
    quantity: any;
    amount: any;
    invoiceNo: any;
    earnedPoints: number;
    mobileNo: number;
    driverMobileNo: number;
    constructor() {
        this.fuelType = 1;
        this.fuelUnit = 1;
        this.status = 1;
    }
}