import { transporterReport } from './../../app/transporterReport';
import { HttpClient,  HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BasicDataProvider } from "../basic-data/basic-data";
/*
  Generated class for the TransporterReportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransporterReportProvider {
  apiUrl;
  constructor(public http: HttpClient,public basicData:BasicDataProvider) {
    this.apiUrl = this.basicData.apiUrl;
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
  getPumpWiseCreditLimit(transporterId,pumpId):Observable<transporterReport> {
    return this.http.get<transporterReport>(this.apiUrl+"/transporterreports/getPumpWiseCreditLimit/"+transporterId+"/"+pumpId)
      .catch(this.errorHandler);
  }

  getPumpwiseConsumed(transporterId, pumpId):Observable<transporterReport> {
    return this.http.get<transporterReport>(this.apiUrl+"/transporterreports/getPumpwiseConsumed/"+transporterId+"/"+pumpId)
      .catch(this.errorHandler);
  }
  getPumpWisePaymentReports(transporterId, pumpId):Observable<transporterReport> {
    return this.http.get<transporterReport>(this.apiUrl+"/transporterreports/getPumpWisePaymentReports/"+transporterId+"/"+pumpId)
      .catch(this.errorHandler);
  }
  getPumpwisePendingRequest(transporterId,pumpId):Observable<transporterReport> {
    return this.http.get<transporterReport>(this.apiUrl+"/transporterreports/getPumpwisePendingRequest/"+transporterId+"/"+pumpId)
      .catch(this.errorHandler);
  }
  
}
