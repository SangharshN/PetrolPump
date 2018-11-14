
import { AlertController, LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, ToastController, PopoverController, Platform } from 'ionic-angular';
import { Transporter } from '../../../app/transporter';
import { CreditSale } from '../../../app/credit.sale';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-request-cancel',
  templateUrl: 'request-cancel.html',
})
export class RequestCancelPage {
  public transRequestList = {};
  public cRequest = new Transporter;
  fuelRequested = new CreditSale;
  cancelRequested: any;
  pending: boolean;
  inProgress: boolean;
  completed: boolean;
  cancelled: boolean;
  hidestatus: boolean;
  pendingStatus: boolean;
  inProgressOnly: boolean;
  fuelBoolean: boolean; fuelrequestnull: boolean; cashrequestnull: boolean;
  fuelActualAmount: number;
  public errorMsg: any;
  id: any;
  reqCount: number;
  toFix: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public basicData: BasicDataProvider,
    public popoverCtrl: PopoverController,
    public toast: ToastController,
    public storage: Storage,
    public loadingCtrl:LoadingController,
    public appCtrl: App,
    public alertCtrl: AlertController,
    public platform: Platform,
    public transData: TransDataProvider) {
    this.id = navParams.get('param1');
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot('RequestListPage');
      backAction();
    }, 1)
  }

  ionViewDidLoad() {     //this.basicData.Loader();
    this.showRequest();
  }
  showRequest() {
    console.log(this.id);
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.storage.get('reqCount').then((val) => {
      this.reqCount = val;
    });
    this.transData.showTransRequests(this.id)
      .subscribe(res => {
        loading.dismiss();
        this.fuelRequested = res;
        console.log(res);
        if (this.fuelRequested.status == 1) {
          this.pending = true;
          this.inProgress = false;
          this.completed = false;
          this.cancelled = false;
          this.fuelBoolean = false;
          this.pendingStatus = true;
          console.log("1");
        }
        if (this.fuelRequested.status == 2) {
          if (this.fuelRequested.fuelRequested == 0) {
            this.inProgress = true;
            this.pending = false;
            this.completed = false;
            this.pendingStatus = false;
            this.cancelled = false;
            this.fuelBoolean = false;
            this.hidestatus = true;
            console.log("1");
          } else {
            this.inProgress = true;
            this.fuelBoolean = true;
            this.hidestatus = true;
            this.pending = false;
            this.completed = false;
            this.cancelled = false;
            this.fuelActualAmount = this.fuelRequested.fuelActual * this.fuelRequested.productRate;
            this.toFix = this.fuelActualAmount;
            this.fuelActualAmount = this.toFix.toFixed(0);
            console.log(this.fuelActualAmount, this.fuelRequested.fuelActual, this.fuelRequested.productRate);
          }
        }
        if (this.fuelRequested.status == 3) {
          if (this.fuelRequested.cashRequested == 0) {
            this.fuelActualAmount = this.fuelRequested.fuelActual * this.fuelRequested.productRate;
            this.toFix = this.fuelActualAmount;
            this.fuelActualAmount = this.toFix.toFixed(0);
            console.log(this.fuelActualAmount, this.fuelRequested.fuelActual, this.fuelRequested.productRate);
            this.inProgress = true;
            this.pending = false;
            this.completed = false;
            this.fuelrequestnull = true;
            this.cashrequestnull = false;
            this.cancelled = false;
            this.fuelBoolean = true;
            this.inProgressOnly = true;
            this.hidestatus = false;
            console.log("1");
          }
          if (this.fuelRequested.fuelRequested == 0) {
            this.completed = true;
            this.fuelrequestnull = false;
            this.inProgress = false;
            this.cashrequestnull = true;
            this.cancelled = false;
            this.pending = false;
            this.fuelBoolean = false;
            console.log("hii");
          }
          if (this.fuelRequested.cashRequested != 0 && this.fuelRequested.fuelRequested != 0) {
            this.completed = true;
            this.fuelrequestnull = true;
            this.inProgress = false;
            this.cancelled = false;
            this.cashrequestnull = true;
            this.pending = false;
            this.fuelBoolean = false;
            this.fuelActualAmount = this.fuelRequested.fuelActual * this.fuelRequested.productRate;
            this.toFix = this.fuelActualAmount;
            this.fuelActualAmount = this.toFix.toFixed(0);
            console.log(this.fuelActualAmount, this.fuelRequested.fuelActual, this.fuelRequested.productRate);
          }
        }
        if (this.fuelRequested.status == 4) {
          this.cancelled = true;
          this.inProgress = false;
          this.completed = false;
          this.pending = false;
          this.fuelBoolean = false;
          console.log("1");
        }
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }
  cancelRequest(reqId) {
    this.cRequest.id = reqId;
    let alert = this.alertCtrl.create({
      // title: 'Confirm purchase',
      message: 'Do you really want to Cancel Request?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {

            this.transData.cancelTransRequests(this.cRequest, reqId)
              .subscribe(res => {
                this.basicData.sendSuccessNotification("Request Cancelled Successfully")
                this.cancelRequested = res;
                this.reqCount = this.reqCount - 1;
                this.storage.set('reqCount', this.reqCount);
                this.appCtrl.getRootNav().setRoot('RequestListPage');
              }, err => {

                this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
              })
          }
        }
      ]
    });
    alert.present();

  }
  editRequest(reqId) {
    this.appCtrl.getRootNav().setRoot('RequestEditPage', {
      param1: reqId
    });
    this.transData.flagInsert(reqId).subscribe(res => {
      console.log(res);
    })
  }
  popover(myEvent) {
    let popover = this.popoverCtrl.create('TranspopPage');
    popover.present({
      ev: myEvent
    });
  }
  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  home() {
    this.navCtrl.setRoot('RequestListPage');
  }
  menuClick() {
    this.basicData.checkTransCount();
  }
}
