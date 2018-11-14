
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { Component } from "@angular/core";
import {IonicPage,NavController,NavParams,PopoverController,Platform,App} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { POwnerHomePage } from '../../POwnerContent/p-owner-home/p-owner-home';
@IonicPage()
@Component({
  selector: 'page-loyalty-sales-report',
  templateUrl: 'loyalty-sales-report.html',
})
export class LoyaltySalesReportPage {
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
      this.appCtrl.getRootNav().setRoot(POwnerHomePage);
      backAction();
    }, 1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoyaltySalesReportPage');
  }

  LoyaltyFuelSoldQtyAmtPage() {
    this.appCtrl.getRootNav().setRoot("LoyaltyFuelSoldQtyAmtPage");
  }

  LoyaltySummaryPage() {
    this.appCtrl.getRootNav().setRoot("LoyaltySummaryPage");
  }

  home() {
    this.appCtrl.getRootNav().setRoot(POwnerHomePage);
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }
}
