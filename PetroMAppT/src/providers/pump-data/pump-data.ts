import { Employee } from '../../app/employee';
import { Product } from '../../app/product';
import { CompParam } from '../../app/compparam';
import { Compliance } from './../../app/compliance';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { CreditSale } from '../../app/credit.sale';
import { RegularSale } from '../../app/regular-sale';
import { BasicDataProvider } from '../basic-data/basic-data';
import { tankDip } from '../../app/tank.dip';
import { Reports } from '../../app/reports';

/*
  Generated class for the PumpDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PumpDataProvider {
 public apiUrl;

  constructor(public http: HttpClient,public basicData:BasicDataProvider) {
    this.apiUrl = this.basicData.apiUrl;
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

  getProducts(pumpId):Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl+"/productRates/list/"+pumpId)
      .catch(this.errorHandler);
  }

  getProduct(id):Observable<Product> {
    return this.http.get<Product>(this.apiUrl+"/products/"+id)
      .catch(this.errorHandler);
  }
  getPumpShifts(pumpId):Observable<Compliance[]>
  {  return this.http.get<Compliance[]>(this.apiUrl+"/empShifts/pumpShifts/"+pumpId)
  .catch(this.errorHandler);

  }
addProductRate(products,pumpId):Observable<Product>{
  const headers = new HttpHeaders().set('content-type', 'application/json');  
  return this.http.put<Product>(this.apiUrl+"/productRates/"+pumpId+"/update", products, {headers}) 
      .catch(this.errorHandler);
}
 

  getEmployees(pumpId):Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl+"/employees/getEmployees/"+pumpId)
      .catch(this.errorHandler);
  }

  //getRequests(pumpId):Observable<CreditSale[]> {
   // return this.http.get<CreditSale[]>(this.apiUrl+"/creditSales/getRequests/"+pumpId)
    //  .catch(this.errorHandler);
  //}

  showRequest(id):Observable<CreditSale> {
    return this.http.get<CreditSale>(this.apiUrl+"/creditSales/showRequest/"+id)
      .catch(this.errorHandler);
  }

  getCompParams(companyId):Observable<CompParam[]> {
    return this.http.get<CompParam[]>(this.apiUrl+"/compliances/getCompParams/"+companyId)
      .catch(this.errorHandler);
  }

  getCompliances(pumpId, employeeId):Observable<Compliance[]> {
    return this.http.get<Compliance[]>(this.apiUrl+"/compliances/getComplianes/"+pumpId+"/"+employeeId)
      .catch(this.errorHandler);
  }

  getLeaves(pumpId, employeeId):Observable<Compliance[]> {
    return this.http.get<Compliance[]>(this.apiUrl+"/leaves/getLeaves/"+pumpId+"/"+employeeId)
      .catch(this.errorHandler);
  }
  getPumpTotal(pumpId):Observable<Compliance[]> {
    return this.http.get<Compliance[]>(this.apiUrl+"/creditSales/pumpTotals/"+pumpId)
      .catch(this.errorHandler);
  }
  getPumpDSMs(pumpId):Observable<Compliance[]> {
    return this.http.get<Compliance[]>(this.apiUrl+"/empShifts/pumpDSMs/"+pumpId)
      .catch(this.errorHandler);
  }
  
  getPumpMachines(pumpId):Observable<Compliance[]> {
    return this.http.get<Compliance[]>(this.apiUrl+"/empShifts/pumpMachines/"+pumpId)
      .catch(this.errorHandler);
  }
  getPumpNoozle(pumpId):Observable<Compliance[]> {
    return this.http.get<Compliance[]>(this.apiUrl+"/empShifts/pumpNozzles/"+pumpId)
      .catch(this.errorHandler);
  }

  addRegularCash(regular):Observable<RegularSale>{
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.post<RegularSale>(this.apiUrl+"/regularSales/store", regular, {headers}) 
    .catch(this.errorHandler); 
  }

  addNozzleTotalizer(regular):Observable<RegularSale>{
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.post<RegularSale>(this.apiUrl+"/empShifts/totalizeNozzle",regular, {headers}) 
    .catch(this.errorHandler); 
  }
  getTank(pumpId):Observable<tankDip>
{
  return this.http.get<tankDip[]>(this.apiUrl+"/tanks/tankList/"+pumpId)
  .catch(this.errorHandler);
}
getTankDip(pumpId):Observable<tankDip>
{
  return this.http.get<tankDip[]>(this.apiUrl+"/tanks/tankDipList/"+pumpId)
  .catch(this.errorHandler);
}
addTankDip(tank):Observable<tankDip>{
  const headers = new HttpHeaders().set('content-type', 'application/json');  
  return this.http.post<RegularSale>(this.apiUrl+"/tanks/store", tank, {headers}) 
  .catch(this.errorHandler); 
}
getEmployeeList(pumpId,username):Observable<Reports[]>
{
  return this.http.get<Reports[]>(this.apiUrl+"/employees/getEmployeeList/"+pumpId+"/"+username)
  .catch(this.errorHandler);
}
changeStatus(employeeId,userType):Observable<Reports[]>
{
  return this.http.get<Reports[]>(this.apiUrl+"/employees/changeStatus/"+employeeId+"/"+userType)
  .catch(this.errorHandler);
}

getPumpCt(pumpId):Observable<Reports>
{
  return this.http.get<Reports>(this.apiUrl+"/pumps/getPumpCt/"+pumpId)
  .catch(this.errorHandler);
}
changeTranspStatus(pumpId,transporterId):Observable<Reports>
{
  return this.http.get<Reports>(this.apiUrl+"/pumps/changeTranspStatus/"+pumpId+"/"+transporterId)
  .catch(this.errorHandler);
}
changeTranspDefaulterStatus(pumpId,transporterId):Observable<Reports>
{
  return this.http.get<Reports>(this.apiUrl+"/pumps/changeTranspDefaulterStatus/"+pumpId+"/"+transporterId)
  .catch(this.errorHandler);
}

}
