import { CreditSale } from './../../app/credit.sale';
import { Vehicle } from './../../app/vehicle';
import { Manager } from '../../app/manager';
import { Transporter } from '../../app/transporter';
import { Driver } from '../../app/driver';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Product } from '../../app/product';
import { CashSale } from '../../app/cash.sale';
import { RegularSale } from '../../app/regular-sale';
import { CashDispense } from '../../app/cash.dispense';
import { BasicDataProvider } from '../basic-data/basic-data';
import { EmployeeNozzle } from '../../app/employee.nozzle';
/*
  Generated class for the SalesDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SalesDataProvider {
  apiUrl;
  amount:number;

  constructor(public http: HttpClient, public basicData: BasicDataProvider) {
    this.apiUrl = this.basicData.apiUrl;
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

  getProducts(pumpId): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + "/products/" + pumpId)
      .catch(this.errorHandler);
  }

  getProduct(id): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + "/products/" + id)
      .catch(this.errorHandler);
  }

  getDrivers(pumpId): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl + "/drivers/" + pumpId)
      .catch(this.errorHandler);
  }

  getDriver(id): Observable<Driver> {
    return this.http.get<Driver>(this.apiUrl + "/products/" + id)
      .catch(this.errorHandler);
  }

  getVehicles(transporterId): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl + "/vehicles/list/" + transporterId)
      .catch(this.errorHandler);
  }

  getVehicle(id): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.apiUrl + "/vehicles/" + id)
      .catch(this.errorHandler);
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    const headers = new HttpHeaders().set('content-type', 'application/json');

    return this.http.post<Vehicle>(this.apiUrl + "/vehicles/store", vehicle, { headers })
      .catch(this.errorHandler);
  }

  updateVehicle(vehicle: Vehicle, id): Observable<Vehicle> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put<Vehicle>(this.apiUrl + "/vehicles/" + id + "/update", vehicle, { headers })
      .catch(this.errorHandler);
  }

  getManagers(pumpId, transporterId): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.apiUrl + "/tmanagers/" + pumpId + "/" + transporterId)
      .catch(this.errorHandler);
  }

  getManager(id): Observable<Manager> {
    return this.http.get<Manager>(this.apiUrl + "/tmanagers/" + id)
      .catch(this.errorHandler);
  }

  addManager(manager: Manager): Observable<Manager> {
    const headers = new HttpHeaders().set('content-type', 'application/json');

    return this.http.post<Manager>(this.apiUrl + "/tmanagers/store", manager, { headers })
      .catch(this.errorHandler);
  }

  updateManager(manager: Manager, id): Observable<Manager> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put<Manager>(this.apiUrl + "/tmanagers/" + id + "/update", manager, { headers })
      .catch(this.errorHandler);
  }

  getTransporters(pumpId): Observable<Transporter[]> {
    return this.http.get<Transporter[]>(this.apiUrl + "/transporters/getTransporters/" + pumpId)
      .catch(this.errorHandler);
  }

  getTransporter(id): Observable<Transporter> {
    return this.http.get<Transporter>(this.apiUrl + "/transporters/" + id)
      .catch(this.errorHandler);
  }

  updateTransporter(transporter: Transporter, id): Observable<Transporter> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put<Transporter>(this.apiUrl + "/transporters/" + id + "/update", transporter, { headers })
      .catch(this.errorHandler);
  }

  getRequests(pumpId): Observable<CreditSale[]> {
    return this.http.get<CreditSale[]>(this.apiUrl + "/creditSales/pumpRequests/" + pumpId)
      .catch(this.errorHandler);
  }

  getDSMRequest(pumpId, regNo): Observable<CreditSale> {
    return this.http.get<CreditSale>(this.apiUrl + "/creditSales/getDSMRequest/" + pumpId + "/" + regNo)
      .catch(this.errorHandler);
  }

  getDSMBlanketRequest(pumpId, regNo, username,DSMID): Observable<CreditSale> {
    return this.http.get<CreditSale[]>(this.apiUrl + "/creditSales/getDSMBlanket/" + pumpId + "/" + regNo + "/" + username+ "/" + DSMID )
      .catch(this.errorHandler);
  }

  showRequest(id): Observable<CreditSale> {
    return this.http.get<CreditSale>(this.apiUrl + "/creditSales/showRequest/" + id)
      .catch(this.errorHandler);
  }
  getProductRates(pumpId): Observable<CreditSale[]> {
    return this.http.get<CreditSale[]>(this.apiUrl + "/productRates/dpRates/" + pumpId)
      .catch(this.errorHandler);
  }

  getDSMNozzles(pumpId, employeeId, isTotalizer): Observable<EmployeeNozzle[]> {
    return this.http.get<EmployeeNozzle[]>(this.apiUrl + "/empShifts/getDSMNozzles/" + pumpId + "/" + employeeId + "/" + isTotalizer)
      .catch(this.errorHandler);
  }

  // getCheckNozzle(pumpId,employeeId):Observable<Employee[]> {
  //   return this.http.get<Employee[]>(this.apiUrl+"/empShifts/checkNozzle/"+pumpId +"/" +employeeId)
  //     .catch(this.errorHandler);
  // }

  getFuelDispense(requestId, crequest: CreditSale): Observable<CreditSale[]> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<CreditSale[]>(this.apiUrl + "/creditSales/" + requestId + "/fuelDispense", crequest, { headers })
      .catch(this.errorHandler);
  }

  addCashSale(cashsale: CashSale): Observable<CashSale> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<CashSale>(this.apiUrl + "/loyaltySales/store", cashsale, { headers })
      .catch(this.errorHandler);
  }

  getCashDispense(requestId, cashsale: CashDispense): Observable<CashDispense> {
    const headers = new HttpHeaders().set('content-type', 'application/json');

    return this.http.post<CashSale>(this.apiUrl + "/creditSales/" + requestId + "/cashDispense", cashsale, { headers })
      .catch(this.errorHandler);
  }

  getPayMode(): Observable<RegularSale[]> {
    return this.http.get<RegularSale[]>(this.apiUrl + "/productRates/paymodes")
      .catch(this.errorHandler);
  }

  getPayModeLoyality(pumpId, employeeId, empShiftId, saleType): Observable<RegularSale[]> {
    return this.http.get<RegularSale[]>(this.apiUrl + "/empShifts/payModeWiseSales/" + pumpId + "/" + employeeId + "/" + empShiftId + "/" + saleType)
      .catch(this.errorHandler);
  }

  gelLoyaltyDriver(pumpId): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl + "/loyaltySales/loyalDrivers/" + pumpId)
      .catch(this.errorHandler);
  }

  getCashDriverRequest(pumpId, mobileNo): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl + "/loyaltySales/showDriver/" + pumpId + "/" + mobileNo)
      .catch(this.errorHandler);
  }
  
  getManagerRequest(pumpId, regNo): Observable<CreditSale[]> {
    return this.http.get<CreditSale[]>(this.apiUrl + "/creditSales/getMgrRequest/" + pumpId + "/" + regNo)
      .catch(this.errorHandler);
  }

  getTotalSales(pumpId, empShiftId, employeeId): Observable<RegularSale[]> {
    return this.http.get<RegularSale[]>(this.apiUrl + "/regularSales/totalSales/" + pumpId + "/" + empShiftId + "/" + employeeId)
      .catch(this.errorHandler);
  }
  sendOTPForBlanket(pumpId, tdriverId, regNo): Observable<CreditSale> {
    return this.http.get<CreditSale[]>(this.apiUrl + "/creditSales/sendOTPForBlanket/" + pumpId + "/" + tdriverId + "/" + regNo )
      .catch(this.errorHandler);
  }
  getPendingCash(pumpId, employeeId, empShiftId){
    return this.http.get(this.apiUrl + "/empShifts/getPendingCash/" + pumpId + "/" + employeeId + "/" + empShiftId )
      .catch(this.errorHandler);
  }
 
}
