import { TransporterProfile } from './../../app/transporterProfile';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { TDriver } from '../../app/tdriver';
import { Vehicle } from '../../app/vehicle';
import { Manager } from '../../app/manager';
import { Transporter } from '../../app/transporter';
import { CreditSale } from '../../app/credit.sale';
import { BasicDataProvider } from '../basic-data/basic-data';

/*
  Generated class for the TransDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransDataProvider {
  apiUrl;

  constructor(public http: HttpClient,public basicData:BasicDataProvider) {
    this.apiUrl = this.basicData.apiUrl;
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

  getTDrivers(transporterId):Observable<TDriver[]> {
    return this.http.get<TDriver[]>(this.apiUrl+"/tdrivers/list/"+transporterId)
      .catch(this.errorHandler);
  }

  getTDriver(id):Observable<TDriver> {
    return this.http.get<TDriver>(this.apiUrl+"/tdrivers/"+id)
      .catch(this.errorHandler);
  }

  getTDriverActivate(id):Observable<TDriver> {
    return this.http.get<TDriver[]>(this.apiUrl+"/tdrivers/"+id+"/activate")
      .catch(this.errorHandler);
  }
  getTDriverDeactivate(id):Observable<TDriver> {
    return this.http.get<TDriver[]>(this.apiUrl+"/tdrivers/"+id+"/deactivate")
      .catch(this.errorHandler);
  }
  addTDriver(tdriver:TDriver): Observable<TDriver> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    
    return this.http.post<TDriver>(this.apiUrl+"/tdrivers/store", tdriver, {headers}) 
      .catch(this.errorHandler); 
  }

  updateTDriver(tdriver:TDriver, id): Observable<Vehicle> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.put<Vehicle>(this.apiUrl+"/tdrivers/"+id+"/update", tdriver, {headers}) 
      .catch(this.errorHandler); 
  }

  getVehicles(pumpId, transporterId):Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl+"/vehicles/"+pumpId+"/"+transporterId)
      .catch(this.errorHandler);
  }

  getVehicle(id):Observable<Vehicle> {
    return this.http.get<Vehicle>(this.apiUrl+"/vehicles/"+id)
      .catch(this.errorHandler);
  }

  addVehicle(vehicle:Vehicle): Observable<Vehicle> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    
    return this.http.post<Vehicle>(this.apiUrl+"/vehicles/store", vehicle, {headers}) 
      .catch(this.errorHandler); 
  }

  updateVehicle(vehicle:Vehicle, id): Observable<Vehicle> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.put<Vehicle>(this.apiUrl+"/vehicles/"+id+"/update", vehicle, {headers}) 
      .catch(this.errorHandler); 
  }
  getVehicleDeactivate(id):Observable<TDriver> {
    return this.http.get<TDriver[]>(this.apiUrl+"/vehicles/"+id+"/deactivate")
      .catch(this.errorHandler);
  }
  getVehicleActivate(id):Observable<TDriver> {
    return this.http.get<TDriver[]>(this.apiUrl+"/vehicles/"+id+"/activate")
      .catch(this.errorHandler);
  }
  getManagers( transporterId):Observable<Manager[]> {
    return this.http.get<Manager[]>(this.apiUrl+"/tmanagers/list/"+transporterId)
      .catch(this.errorHandler);
  }

  getManager(id):Observable<Manager> {
    return this.http.get<Manager>(this.apiUrl+"/tmanagers/"+id)
      .catch(this.errorHandler);
  }

  addManager(manager:Manager): Observable<Manager> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    
    return this.http.post<Manager>(this.apiUrl+"/tmanagers/store", manager, {headers}) 
      .catch(this.errorHandler); 
  }

  updateManager(manager:Manager, id): Observable<Manager> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.put<Manager>(this.apiUrl+"/tmanagers/"+id+"/update", manager, {headers}) 
      .catch(this.errorHandler); 
  }
  getManagerDeactivate(id):Observable<Manager> {
    return this.http.get<Manager[]>(this.apiUrl+"/tmanagers/"+id+"/deactivate")
      .catch(this.errorHandler);
  }
  getManagerActivate(id):Observable<Manager> {
    return this.http.get<Manager[]>(this.apiUrl+"/tmanagers/"+id+"/activate")
      .catch(this.errorHandler);
  }

  getTransporters(pumpId):Observable<Transporter[]> {
    return this.http.get<Transporter[]>(this.apiUrl+"/pumps/getTransporters/"+pumpId)
      .catch(this.errorHandler);
  }

  getTransporter(id):Observable<Transporter> {
    return this.http.get<Transporter>(this.apiUrl+"/transporters/"+id)
      .catch(this.errorHandler);
  }

  updateTransporter(transporter:Transporter, id): Observable<Transporter> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.put<Transporter>(this.apiUrl+"/transporters/"+id+"/update", transporter, {headers}) 
      .catch(this.errorHandler); 
  }

  getTransRequests(transporterId):Observable<Transporter[]> {
    return this.http.get<Transporter[]>(this.apiUrl+"/creditSales/transRequests/"+transporterId)
      .catch(this.errorHandler);
  }
  getTransRequestsDate(transporterId,startDate,endDate):Observable<Transporter[]> {
    return this.http.get<Transporter[]>(this.apiUrl+"/creditSales/transRequests/"+transporterId+"/"+startDate+"/"+endDate)
      .catch(this.errorHandler);
  }
  showTransRequests(req_id):Observable<CreditSale> {
    return this.http.get<CreditSale>(this.apiUrl+"/creditSales/showRequest/"+req_id)
      .catch(this.errorHandler);
  }
  editTransRequests(cRequest:CreditSale,req_id): Observable<CreditSale[]> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.put<CreditSale>(this.apiUrl+"/creditSales/"+req_id +"/editRequest",cRequest,{headers}) 
      .catch(this.errorHandler); 
  }
  cancelTransRequests(cRequest:Transporter,req_id): Observable<Transporter[]> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.put<Transporter>(this.apiUrl+"/creditSales/"+req_id +"/cancelRequest",cRequest,{headers}) 
      .catch(this.errorHandler); 
  }
  getPumpList(transporterId):Observable<Transporter[]>{
    return this.http.get<Transporter[]>(this.apiUrl+"/creditSales/pumpList/"+transporterId)
    .catch(this.errorHandler);
  }
  flagInsert(reqId): Observable<CreditSale> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.post<CreditSale>(this.apiUrl+"/creditSales/"+reqId +"/flagInsert", {headers}) 
      .catch(this.errorHandler); 
  } 
   flagRemove(reqId): Observable<CreditSale> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.post<CreditSale>(this.apiUrl+"/creditSales/"+reqId +"/flagRemove", {headers}) 
      .catch(this.errorHandler); 
  }

  getTransTotal(transporterId):Observable<Transporter> {

    return this.http.get<Transporter>(this.apiUrl+"/creditSales/transTotals/"+transporterId)
      .catch(this.errorHandler);
  }
  getRaiseRequest(credit: CreditSale): Observable<CreditSale> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.post<any>(this.apiUrl+"/creditSales/raiseRequest", credit, {headers}) 
      .catch(this.errorHandler); 
  } 
  getFuel(transporterId):Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl+"/creditSales/fuelList/"+transporterId)
      .catch(this.errorHandler);
  }
  getFuelType():Observable<TDriver[]> {
    return this.http.get<TDriver[]>(this.apiUrl+"/vehicles/fuelTypes")
      .catch(this.errorHandler);
  }
  getVehicleType():Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl+"/vehicles/vehicleTypes")
      .catch(this.errorHandler);
  }
  getTransporterProfile(id):Observable<TransporterProfile> {
    return this.http.get<TransporterProfile>(this.apiUrl+"/transporters/getProfile/"+id)
      .catch(this.errorHandler);
  }
  updateTransporterProfile(tprofile:TransporterProfile, id): Observable<TransporterProfile> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.put<TransporterProfile>(this.apiUrl+"/transporters/"+id+"/saveProfile", tprofile, {headers}) 
      .catch(this.errorHandler); 
  }
  getTManagerProfile(id):Observable<TransporterProfile> {
    return this.http.get<TransporterProfile>(this.apiUrl+"/tmanagers/getProfile/"+id)
      .catch(this.errorHandler);
  }
  updateTManagerProfile(tprofile:TransporterProfile, id): Observable<TransporterProfile> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.put<TransporterProfile>(this.apiUrl+"/tmanagers/"+id+"/saveProfile", tprofile, {headers}) 
      .catch(this.errorHandler); 
  }
  getTransporterPumpList(transporterId): Observable<Transporter[]> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.get<Transporter[]>(this.apiUrl+"/transporters/getTransporterPumpList/"+transporterId,{headers}) 
      .catch(this.errorHandler); 
  }
  getPumpTransporter(pumpId,transporterId): Observable<Transporter> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.get<Transporter>(this.apiUrl+"/pumps/getPumpTransporter/"+pumpId+"/"+transporterId,{headers}) 
      .catch(this.errorHandler); 
  } 
 
  getTransporterCt(transporterId): Observable<Transporter> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.get<Transporter>(this.apiUrl+"/transporters/getTransporterCt/"+transporterId,{headers}) 
      .catch(this.errorHandler); 
  }
 
  getCreditBillList(transporterId): Observable<Transporter[]> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.get<Transporter[]>(this.apiUrl+"/transporters/getCreditBillList/"+transporterId,{headers}) 
      .catch(this.errorHandler); 
  }
  getBillDetails(creditBillId): Observable<Transporter> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.get<Transporter>(this.apiUrl+"/transporters/getBillDetails/"+creditBillId,{headers}) 
      .catch(this.errorHandler); 
  }
  updateBillPayment(request:Transporter): Observable<CreditSale> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.post<CreditSale>(this.apiUrl+"/transporters/updateBillPayment", request,{headers}) 
      .catch(this.errorHandler); 
  } 
}
