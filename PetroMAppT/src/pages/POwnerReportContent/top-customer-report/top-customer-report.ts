
import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, PopoverController, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ReportsProvider } from '../../../providers/reports/reports';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { POwnerHomePage } from '../../POwnerContent/p-owner-home/p-owner-home';
import { PManagerHomePage } from '../../PMAnagerContent/p-manager-home/p-manager-home';


@IonicPage()
@Component({
  selector: 'page-top-customer-report',
  templateUrl: 'top-customer-report.html',
})
export class TopCustomerReportPage {
  public pumpId: any;
  public topCustomer: any;
  public errorMsg: any;
  public userType: number;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public reportData: ReportsProvider,
    public storage: Storage,
    public appCtrl: App,
    public platform: Platform,
    public basicData: BasicDataProvider,
    public popoverCtrl: PopoverController
  ) {
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot('PumpReportPage');
      backAction();
    }, 1)
  }

  ionViewDidLoad() {
    //this.basicData.Loader();
    this.storage.get('pumpId').then((val) => {
      this.pumpId = val;
      this.showTopCustomer();
    });
    this.storage.get('userType').then((val) => {
      this.userType = val;
    });
  }
  showTopCustomer() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.reportData.getTopCustomer(this.pumpId).subscribe
      (res => {
        loading.dismiss();
        this.topCustomer = res;
      }, err => {

        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
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
