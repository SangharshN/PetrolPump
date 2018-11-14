import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController, Platform } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreditSale } from '../../../app/credit.sale';
import { TDriver } from '../../../app/tdriver';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { SalesDataProvider } from '../../../providers/sales-data/sales-data';
/**
 * Generated class for the RequestEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-edit',
  templateUrl: 'request-edit.html',
})
export class RequestEditPage {
  user: FormGroup;
  id: number;
  fuelRequested = new CreditSale;
  public cRequest = new CreditSale;
  public transRequestList: any;
  public tdriverList: TDriver[];
  public vehicles: any;
  public transporterId: number;
  public unitName: string;
  public capacity: number;
  constructor(public navCtrl: NavController,
    public transData: TransDataProvider,
    public basicData: BasicDataProvider,
    public storage: Storage,
    public platform:Platform,
    public loadingCtrl:LoadingController,
    public saleData: SalesDataProvider,
    public appCtrl: App,
    public navParams: NavParams) {

    this.user = new FormGroup({
      cashRequested: new FormControl('', [Validators.required]),
      fuelRequested: new FormControl('', [Validators.required]),
      requestType: new FormControl('', [Validators.required]),
    });
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot('RequestCancelPage', {
        param1: this.id
      });
      this.transData.flagRemove(this.id).subscribe(res=>
        {
          console.log(res);
        })
      backAction();
    }, 1)
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad RequestEditPage');
    this.id = this.navParams.get('param1');
    this.showRequest();
    this.storage.get('transporterId').then((val) => {
      this.transporterId = val;
    });
  }
  showRequest() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.transData.showTransRequests(this.id)
      .subscribe(res => {
loading.dismiss();
        this.fuelRequested = res;
        console.log(res);
        this.showVehicle();
      }, err => {
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }
  requestType(sel) {
    this.fuelRequested.requestType = sel;
    this.fuelRequested.fuelRequested=null;
  }

  editRequest() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.user.valid) {
      switch (this.fuelRequested.requestType) {
        case '1':
          this.fuelRequested.fuelRequested = this.user.controls['fuelRequested'].value;
          this.fuelRequested.unitName=this.unitName;
          break;
        case '2':
          this.fuelRequested.unitName = "Rs";
          break;
        case '3':
          this.fuelRequested.unitName=this.unitName;
          break;
      }
      if(this.fuelRequested.requestType==3 && this.fuelRequested.fuelRequested>this.capacity)
      {
        this.basicData.sendErrorNotification("Fuel requested is greater than vehicle capacity");
        this.fuelRequested.fuelRequested=null;
        loading.dismiss();
      }
      else
      {
      console.log(this.fuelRequested);
      this.transData.editTransRequests(this.fuelRequested, this.id)
        .subscribe(status => {
          var raiseSucess = JSON.stringify(status);
          var error = JSON.parse(raiseSucess).errors;
          if (error == undefined || error == null) {
            this.basicData.sendSuccessNotification("Raised request successfully");
            this.appCtrl.getRootNav().setRoot('RequestListPage');
            loading.dismiss();
          }
          else {
            this.basicData.sendErrorNotification("" + error);
            this.fuelRequested.cashRequested = null;
            loading.dismiss();
          }

        }, err => {
          this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
          loading.dismiss();
        });
      }
    }

    else {
      this.user.controls['cashRequested'].markAsTouched();
      this.user.controls['fuelRequested'].markAsTouched();
      this.user.controls['requestType'].markAsTouched();
      loading.dismiss();
    }
  }
  home() {
    this.appCtrl.getRootNav().setRoot('RequestCancelPage', {
      param1: this.id
    });
    this.transData.flagRemove(this.id).subscribe(res=>
      {
        console.log(res);
      })
  }
  showVehicle() {
    this.saleData.getVehicles(this.transporterId)
      .subscribe(res => {
        console.log(res);
        this.vehicles = res;
        this.vehicles = this.vehicles.filter(v => v.regNo == this.fuelRequested.regNo);
        this.unitName = this.vehicles[0].unitName;
        this.capacity = this.vehicles[0].capacity;

      }, err => {
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });

  }
}
