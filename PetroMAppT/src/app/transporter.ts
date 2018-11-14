export class Transporter {
    id: number;
    name: string;
    pumpId: number;
    transporterId: number;
    address: string;
    PINCode: string;
    mobileNo: string;
    creditAmount: number;
    advancedAmount: number;
    creditLimitAllotted: number;
    creditLimitBalance: number;
    email: string;
    bankName: string;
    branchAddress: string;
    accountNo: string;
    IFSCCode: string;
    username: string;
    updated_by: string;
    status: number;
    vehicles:any[];
    fuelCreditBill:any[];
    cashCreditBill:any[];
    regularSales:number;
    billType:number;
    creditSales:number;
    otherSales:number;
    loyaltySales:number;
    total:number;
    aFuels:any[];
    aCashs:any[];
    againstAll:any[];
    amount:number;
    billAmount:any;
    creditBillId:number;
    payModeId:number;
active:number;
driverCount: number;
mgrCount:number;
pumpCount:number;
reqCount: number;
vehicleCount: number;
    constructor() {
    }
}