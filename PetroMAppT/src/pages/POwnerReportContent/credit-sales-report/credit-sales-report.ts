
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, PopoverController, Platform, App } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';

@IonicPage()
@Component({
  selector: "page-credit-sales-report",
  templateUrl: "credit-sales-report.html"
})
export class CreditSalesReportPage {

  public userType: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public basicData: BasicDataProvider,
    public appCtrl: App,
    public popoverCtrl: PopoverController
  ) {
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot("PumpReportPage");
      backAction();
    }, 1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditSalesReportPage');
    this.storage.get("userType").then(val => {
      this.userType = val;
      console.log(this.userType)
    });
  }

  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  home() {
    this.appCtrl.getRootNav().setRoot("PumpReportPage");
  }

  TransporterDetailPage() {
    this.appCtrl.getRootNav().setRoot("TransporterDetailReportPage");
  }

  TransporterStateWisePage() {
    this.appCtrl.getRootNav().setRoot("TransporterStateWiseReportPage");
  }

  DefaulterTransporterPage() {
    this.appCtrl.getRootNav().setRoot("DefaulterTransportersReportPage");
  }

  PaymentDueTransporterReportPage() {
    this.appCtrl.getRootNav().setRoot("PaymentDueTransporterReportPage");
  }

  PaymentReceivedPaymodeWiseReportPage() {
    this.appCtrl.getRootNav().setRoot("PaymentReceivedPaymodeWiseReportPage");
  }

  PaymentReceivedTransporterWiseReportPage() {
    this.appCtrl
      .getRootNav()
      .setRoot("PaymentReceivedTransporterWiseReportPage");
  }

  PaymentDueCvfReportPage() {
    this.appCtrl.getRootNav().setRoot("PaymentDueCvfReportPage");
  }

  CreditGivenCvfPage() {
    this.appCtrl.getRootNav().setRoot("CreditGivenCvfPage");
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }

}
