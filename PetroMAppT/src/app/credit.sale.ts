import { DateTime } from "ionic-angular";

export class CreditSale {
    id: number;
    regNo: string;
    pumpId: number;
    transporterId: number;
    transporterName: string;
    employeeId: number;
    requestType: any;
    fuelType: number;
    fuelRequested: number;
    cashRequested: number;
    productRate:number;
    fuelActual: number;
    cashActual: number;
    inprogress_at?: DateTime;
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
invoicePhoto:any;
    quantity: any;
    amount: any;
    invoiceNo: any;
    earnedPoints: number;
    mobileNo: number;
    driverMobileNo: number;
    regionId:number;
    productId: any;
    currentRate:number;
    constructor() {
        this.fuelType = 1;
        this.fuelUnit = 1;
        this.status = 1;
    }
}