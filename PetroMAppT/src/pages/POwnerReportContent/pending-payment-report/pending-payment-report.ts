
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, PopoverController, Platform } from 'ionic-angular';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { POwnerHomePage } from '../../POwnerContent/p-owner-home/p-owner-home';
import { PManagerHomePage } from '../../PMAnagerContent/p-manager-home/p-manager-home';

/**
 * Generated class for the PendingPaymentReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pending-payment-report',
  templateUrl: 'pending-payment-report.html',
})
export class PendingPaymentReportPage {
  startDate: String;
  start: Date;
  endDate: String;
  userType: number;
  dateOption: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public basicData: BasicDataProvider,
    public storage: Storage,
    public platform: Platform,
    public appCtrl: App,
    public popoverCtrl: PopoverController
  ) {
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot('PumpReportPage');
      backAction();
    }, 1)
  }

  ionViewDidLoad() {     //this.basicData.Loader();
    this.endDate = new Date().toISOString();
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 7);
    this.start = currentDate;
    this.startDate = this.start.toISOString();
    console.log(this.startDate, this.endDate);
    this.storage.get('userType').then((val) => {
      this.userType = val;
    });
  }
  onChange(value) {
    console.log(value);
    switch (value) {
      case '1':
        this.startDate = new Date().toISOString();
        this.endDate = new Date().toISOString();
        break;
      case '2':
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.endDate = this.startDate;
        break;
      case '3':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(currentDate.getDate() - 2);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        break;
      case '4':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(currentDate.getDate() - 7);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        break;
      case '5':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(currentDate.getDate() - 14);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        break;
      case '6':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(1);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        break;
      case '7':
        currentDate = new Date();
        currentDate.setDate(1);
        var currentMonth = currentDate.getMonth() - 1;
        currentDate.setMonth(currentMonth);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        // var currentDate = new Date();
        currentDate.setDate(30);
        currentMonth = currentDate.getMonth() - 1;
        currentDate.setMonth(currentMonth);
        this.start = currentDate;
        this.endDate = this.start.toISOString();
        break;
    }
  }

  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  home() {
    if (this.userType == 11) {
      this.appCtrl.getRootNav().setRoot(POwnerHomePage)
    }
    else if (this.userType == 12) {
      this.appCtrl.getRootNav().setRoot(PManagerHomePage)
    }
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }
}
