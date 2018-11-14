import { HttpClient,HttpHeaders,  HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Reports } from "../../app/reports";
import { BasicDataProvider } from "../basic-data/basic-data";
import { EmployeeProfile } from '../../app/employeeProfile';

@Injectable()
export class ReportsProvider {
  apiUrl;
  constructor(public http: HttpClient,public basicData:BasicDataProvider) {
    this.apiUrl = this.basicData.apiUrl;
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

  getTopCustomer(pumpId):Observable<Reports[]> {
    return this.http.get<Reports[]>(this.apiUrl+"/loyaltySales/top10Drivers/"+pumpId)
      .catch(this.errorHandler);
  }
  getLostDriver(pumpId,date):Observable<Reports[]> {
    return this.http.get<Reports[]>(this.apiUrl+"/loyaltySales/lostDrivers/"+pumpId+"/"+date)
      .catch(this.errorHandler);
  }
  getProductRatesList(pumpId):Observable<Reports[]> {
    return this.http.get<Reports[]>(this.apiUrl+"/productRates/list/"+pumpId)
      .catch(this.errorHandler);
  }
  getCreditPayment(pumpId):Observable<Reports[]> {
    return this.http.get<Reports[]>(this.apiUrl+"/creditSales/creditPayments/"+pumpId)
      .catch(this.errorHandler);
  }
  getCreditPaymentDate(pumpId,startDate,endDate):Observable<Reports[]> {
    return this.http.get<Reports[]>(this.apiUrl+"/creditSales/creditPayments/"+pumpId+"/"+startDate+"/"+endDate)
      .catch(this.errorHandler);
  }
  getEmployeeProfile(id):Observable<EmployeeProfile> {
    return this.http.get<EmployeeProfile>(this.apiUrl+"/employees/getProfile/"+id)
      .catch(this.errorHandler);
  }
  updateEmployeeProfile(profile:EmployeeProfile, id): Observable<EmployeeProfile> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.put<EmployeeProfile>(this.apiUrl+"/employees/"+id+"/saveProfile",profile, {headers}) 
      .catch(this.errorHandler); 
  }
  getPumpOwnerProfile(id):Observable<EmployeeProfile> {
    return this.http.get<EmployeeProfile>(this.apiUrl+"/pumps/getProfile/"+id)
      .catch(this.errorHandler);
  }
  updatePumpOwnerProfile(profile:EmployeeProfile, id): Observable<EmployeeProfile> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.put<EmployeeProfile>(this.apiUrl+"/pumps/"+id+"/saveProfile",profile, {headers}) 
      .catch(this.errorHandler); 
  }
  getTransporterList(pumpId):Observable<Reports[]> {
    return this.http.get<Reports[]>(this.apiUrl+"/pumpreports/getTransporterList/"+pumpId)
      .catch(this.errorHandler);
  }
  getTransporterDetail(transporterId,pumpId):Observable<Reports> {
    return this.http.get<Reports>(this.apiUrl+"/pumpreports/getTransporterDetails/"+transporterId+"/"+pumpId)
      .catch(this.errorHandler);
  }
  getTransporterStatwise(pumpId, regionId):Observable<Reports[]> {
    return this.http.get<Reports[]>(this.apiUrl+"/pumpreports/getTransporterStatwise/"+pumpId+"/"+regionId)
      .catch(this.errorHandler);
  }
  getDefaulterTransporters(pumpId):Observable<Reports[]> {
    return this.http.get<Reports[]>(this.apiUrl+"/pumpreports/getDefaulterTransporters/"+pumpId)
      .catch(this.errorHandler);
  }
  getPaymentDue( pumpId):Observable<Reports[]> {
    return this.http.get<Reports[]>(this.apiUrl+"/pumpreports/getPaymentDue/"+pumpId)
      .catch(this.errorHandler);
  }
  getPaymentReceivedPaymodeWise(pumpId, paymode,twoDate):Observable<Reports> {
    return this.http.get<Reports>(this.apiUrl+"/pumpreports/getPaymentReceivedPaymodeWise/"+pumpId+"/"+paymode+"/"+twoDate)
      .catch(this.errorHandler);
  }
  getPaymentReceivedTranspWise(pumpId, transporterId, twoDate):Observable<Reports> {
    return this.http.get<Reports>(this.apiUrl+"/pumpreports/getPaymentReceivedTranspWise/"+pumpId+"/"+transporterId+"/"+twoDate)
      .catch(this.errorHandler);
  }
  getDefaulerTransporterList(pumpId):Observable<Reports[]> {
    return this.http.get<Reports[]>(this.apiUrl+"/pumpreports/getDefaulerTransporterList/"+pumpId)
      .catch(this.errorHandler);
  }
  // getPumpSummary(pumpId,productId):Observable<Reports[]> {
  //   return this.http.get<Reports[]>(this.apiUrl+"/pumpreports/getPumpSummary/"+pumpId+"/"+productId)
  //     .catch(this.errorHandler);
  // }
  getProductList(pumpId):Observable<Reports[]> {
    return this.http.get<Reports[]>(this.apiUrl+"/pumpreports/getProductList/"+pumpId)
      .catch(this.errorHandler);
  }
  getOilPurchasedDatewise(pumpId,productId,twoDate):Observable<Reports> {
    return this.http.get<Reports>(this.apiUrl+"/pumpreports/getOilPurchased/"+pumpId+"/" +productId+"/"+twoDate)
      .catch(this.errorHandler);
  }
  getOilPurchased(pumpId,productId):Observable<Reports> {
    return this.http.get<Reports>(this.apiUrl+"/pumpreports/getOilPurchased/"+pumpId+"/" +productId)
      .catch(this.errorHandler);
  }
  getOverallProductWise(pumpId, productId):Observable<Reports> {
    return this.http.get<Reports>(this.apiUrl+"/pumpreports/getOverallProductWise/"+pumpId+"/" +productId)
      .catch(this.errorHandler);
  }
  getLoyaltySaleslastDashboard(pumpId):Observable<Reports> {
    return this.http.get<Reports>(this.apiUrl+"/pumpreports/getLoyaltySalesDashboard/"+pumpId)
      .catch(this.errorHandler);
  }
  getCreditSaleslastDashboard(pumpId):Observable<Reports> {
    return this.http.get<Reports>(this.apiUrl+"/pumpreports/getCreditSalesDashboard/"+pumpId)
      .catch(this.errorHandler);
  }

  getCurrentOilStock(pumpId, productId):Observable<Reports> {
    return this.http.get<Reports>(this.apiUrl+"/pumpreports/getCurrentOilStock/"+pumpId+"/"+productId)
      .catch(this.errorHandler);
  }
  
  getRegularSaleslastDashboard(pumpId):Observable<Reports> {
    return this.http.get<Reports>(this.apiUrl+"/pumpreports/getRegularSalesDashboard/"+pumpId)
      .catch(this.errorHandler);
  }
  getAllFuelSold(pumpId, twodate,productId):Observable<Reports> {
    return this.http.get<Reports>(this.apiUrl+"/pumpreports/getAllFuelSold/"+pumpId+"/"+twodate+"/"+productId)
      .catch(this.errorHandler);
  }
  getCreditGivenCashFuel(pumpId, transporterId, twodate):Observable<Reports> {
    return this.http.get<Reports>(this.apiUrl+"/pumpreports/getCreditGivenCashFuel/"+pumpId + "/"+transporterId+"/"+twodate)
      .catch(this.errorHandler);
  }
  getLoyaltyFuelSoldQtyAmt(pumpId, productId, twodate):Observable<Reports> {
    return this.http.get<Reports>(this.apiUrl+"/pumpreports/getLoyaltyFuelSoldQtyAmt/"+pumpId+ "/"+productId+"/"+twodate)
      .catch(this.errorHandler);
  }
  getPaymodeWiseSales(pumpId, paymodeId):Observable<Reports> {
    return this.http.get<Reports>(this.apiUrl+"/pumpreports/getPaymodeWiseSales/"+pumpId+ "/"+paymodeId)
      .catch(this.errorHandler);
  }
   getLoyaltySaleSummary(pumpId, driverId, twodate):Observable<Reports> {
    return this.http.get<Reports>(this.apiUrl+"/pumpreports/getLoyaltySaleSummary/"+pumpId+ "/"+driverId +"/"+twodate)
      .catch(this.errorHandler);
  }
  getLDriverList(pumpId):Observable<Reports[]> {
    return this.http.get<Reports[]>(this.apiUrl+"/pumpreports/getLDriverList/"+pumpId)
      .catch(this.errorHandler);
  }
getpaymentDueCashFuel(pumpId, transporterId,twodate):Observable<Reports> {
  return this.http.get<Reports>(this.apiUrl+"/pumpreports/getpaymentDueCashFuel/"+pumpId+ "/"+transporterId+"/"+twodate)
    .catch(this.errorHandler);
}
getOldProductRates(pumpId,productId):Observable<Reports[]> {
  return this.http.get<Reports[]>(this.apiUrl+"/productRates/getOldProductRates/"+pumpId+ "/"+productId)
    .catch(this.errorHandler);
}
}