import { DSMReports } from './../../app/DSMReports';
import { HttpClient,  HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BasicDataProvider } from "../basic-data/basic-data";

/*
  Generated class for the DsmReportsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DsmReportsProvider {
  apiUrl;
  constructor(public http: HttpClient,public basicData:BasicDataProvider) {
    this.apiUrl = this.basicData.apiUrl;
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
  getDSMFuelSale(pumpId, employeeId):Observable<DSMReports[]> {
    return this.http.get<DSMReports[]>(this.apiUrl+"/dsmreports/getDSMFuelSale/"+pumpId+"/"+employeeId)
      .catch(this.errorHandler);
  }
  getDSMSale(pumpId,employeeId): Observable<DSMReports> {
    return this.http.get<DSMReports>(this.apiUrl + "/dsmreports/getDSMSale/" + pumpId + "/" + employeeId)
      .catch(this.errorHandler);
  }
  getDayWiseSale(pumpId,employeeId,twodate): Observable<DSMReports> {
    return this.http.get<DSMReports>(this.apiUrl + "/dsmreports/getDayWiseSale/" + pumpId + "/" + employeeId + "/" + twodate)
      .catch(this.errorHandler);
  }
  getPaymodeWiseSale(employeeId,saleId,twodate): Observable<DSMReports> {
    return this.http.get<DSMReports>(this.apiUrl + "/dsmreports/getPaymodeWiseSale/" + employeeId + "/" + saleId + "/" + twodate)
      .catch(this.errorHandler);
  }  
}
