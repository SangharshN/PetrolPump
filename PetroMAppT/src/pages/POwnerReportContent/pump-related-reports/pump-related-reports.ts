import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, PopoverController, Platform, App } from "ionic-angular";

import { BasicDataProvider } from '../../../providers/basic-data/basic-data';

import { Storage } from "@ionic/storage";
import { POwnerHomePage } from "../../POwnerContent/p-owner-home/p-owner-home";
@IonicPage()
@Component({
  selector: 'page-pump-related-reports',
  templateUrl: 'pump-related-reports.html',
})
export class PumpRelatedReportsPage {

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
    console.log('ionViewDidLoad PumpRelatedReportsPage');
  }

  AllFuelSoldPage() {
    this.appCtrl.getRootNav().setRoot("AllFuelSoldPage");
  }
  home() {
    this.appCtrl.getRootNav().setRoot(POwnerHomePage)
  }
  OilPurchasePage() {
    this.appCtrl.getRootNav().setRoot("OilPurchasePage")
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }
}
