export class transporterReport {
    pumpId: number;

//pumpwiseconsumed
    sales: any[];
    sumCashAmount: number;
    sumFuelAmount: number;
    sumtotalAmount: number;

//pumpwisecreditLimit
    limitAllocated: number;
    usedLimit: number;
    balanceLimit: number;

//pumpwisepayment
    sumDueBillAmount:number;
    sumPaid:number;
    sumPending:number;  

//pendingrequest
    requestCt:number;
    sumCash:number;
    constructor() {
    }
}