
import { Storage } from '@ionic/storage';
import { Country } from './../../app/country';
import { Region } from '../../app/region';
import { City } from '../../app/city';
import { User } from '../../app/user';
import { resetPassword } from '../../app/resetPassword';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { ToastController, LoadingController, Events } from 'ionic-angular';
import { Reports } from '../../app/reports';



/*
  Generated class for the BasicDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BasicDataProvider {
  empCount: number;
  eCount:any;
  transCount: number;
  pumpCount: number;
  mgrCount: number;
  vehicleCount: number;
  pumpId: number;
  count=new Reports;
  transporterId: number;
  driverCount: number;
  pumpList: any;
  transList: any;
  //public apiUrl = "http://45.64.105.226/api";
  public apiUrl = "http://45.252.188.68/api";
  constructor(public http: HttpClient,
    public toast: ToastController,
    public storage: Storage,
    public events:Events,
    public loadingCtrl: LoadingController) {
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

  loginCheck(user: User): Observable<User> {
    const headers = new HttpHeaders().set('content-type', 'application/json');

    return this.http.post<any>(this.apiUrl + "/login", user, { headers })
      .catch(this.errorHandler);
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl + "/countries")
      .catch(this.errorHandler);
  }

  getRegions(countryId): Observable<Region[]> {
    return this.http.get<Region[]>(this.apiUrl + "/regions/list/" + countryId)
      .catch(this.errorHandler);
  }
  getPumpCt(pumpId):Observable<Reports>
  {
    return this.http.get<Reports>(this.apiUrl+"/pumps/getPumpCt/"+pumpId)
    .catch(this.errorHandler);
  }
  getCities(regionId): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl + "/cities/list/" + regionId)
      .catch(this.errorHandler);
  }
  sendOtp(data: resetPassword): Observable<resetPassword> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<resetPassword>(this.apiUrl + "/users/getOTP", data, { headers })
      .catch(this.errorHandler);
  }
  verifyOtp(data: resetPassword): Observable<resetPassword> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<resetPassword>(this.apiUrl + "/users/changePassword", data, { headers })
      .catch(this.errorHandler);
  }
  getTransporterCt(transporterId): Observable<Reports> { 
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    return this.http.get<Reports>(this.apiUrl+"/transporters/getTransporterCt/"+transporterId,{headers}) 
      .catch(this.errorHandler); 
  }

  sendSuccessNotification(message: string): void {
    let notification = this.toast.create({
      message: message,
      duration: 3000,
      cssClass: "toast-success",
      // cssClass: "toast-error",
    });
    notification.present();
  }
  sendErrorNotification(message: string): void {
    let notification = this.toast.create({
      message: message,
      duration: 5000,
      cssClass: "toast-error",
    });
    notification.present();
  }
  Loader() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }
  checkPumpCount() {
    this.storage.get('empCount').then(val => {
      this.empCount = val;
    });
    this.storage.get('transCount').then(val => {
      this.transCount = val;
    });
    this.storage.get('pumpId').then(val => {
      this.pumpId = val;
    

    this.getPumpCt(this.pumpId).subscribe(res=>{
     // console.log(res);
      this.pumpList=res;
      var eCount=this.pumpList.empCount;
      var tCount=this.pumpList.transCount;
      console.log(eCount,tCount,this.empCount,this.transCount)
      if(eCount==this.empCount && tCount==this.transCount)
      {
       // console.log("equal")
      }
      else
      {
        this.storage.set('empCount', eCount);
        this.storage.set('transCount', tCount);
      this.count.empCount=eCount;
      this.count.transCount=tCount;
         // console.log("notequal")
          this.events.publish('user:updated', this.count);
      }

    })
  });
   
  }
  checkTransCount() {
    this.storage.get('driverCount').then(val => {
      this.driverCount = val;
    });
    this.storage.get('vehicleCount').then(val => {
      this.vehicleCount = val;
    });
    this.storage.get('pumpCount').then(val => {
      this.pumpCount = val;
    });
    this.storage.get('mgrCount').then(val => {
      this.mgrCount = val;
    });
    this.storage.get('transporterId').then(val => {
      this.transporterId = val;
    

    this.getTransporterCt(this.transporterId).subscribe(res=>{
      // console.log(res);
      this.pumpList=res;
      var dCount=this.pumpList.driverCount;
      var mCount=this.pumpList.mgrCount;
      var vCount=this.pumpList.vehicleCount;
      var pCount=this.pumpList.pumpCount;
     // console.log(this.driverCount,this.vehicleCount,this.mgrCount,this.pumpCount);
      //console.log(dCount,vCount,mCount,pCount);
      if(dCount==this.driverCount && mCount==this.mgrCount && vCount==this.vehicleCount && pCount==this.pumpCount)
      {
      }
      else
      {
        this.storage.set('driverCount', dCount);
        this.storage.set('mgrCount', mCount);
        this.storage.set('vehicleCount', vCount);
        this.storage.set('pumpCount', pCount);
        this.count.driverCount=dCount;
        this.count.mgrCount=mCount;
        this.count.vehicleCount=vCount;
        this.count.pumpCount=pCount;
        //  console.log("notequal")
          this.events.publish('user:updated1', this.count);
      }
      
    })
  });
   
  }
}
