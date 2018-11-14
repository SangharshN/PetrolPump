import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { HttpParams } from '@angular/common/http';
/*
  Generated class for the SmsDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SmsDataProvider {
  apiUrl = "http://5.189.153.48:8080/vendorsms/CheckBalance.aspx";
  constructor(public http: HttpClient) {
    console.log('Hello SmsDataProvider Provider');
  }
  


  checkUser(usernm,passwd) {
    const params = new HttpParams({fromString: 'user='+usernm+'&password='+passwd});
    return new Promise((resolve, reject) => {
      this.http.request("GET",this.apiUrl, 
          {
              responseType:"text",
              params
          }).subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      
    });
  }
}
