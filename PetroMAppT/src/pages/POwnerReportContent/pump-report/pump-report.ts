
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { Component } from "@angular/core";
import {IonicPage,NavController,NavParams,PopoverController,Platform,App} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { POwnerHomePage } from '../../POwnerContent/p-owner-home/p-owner-home';
import { PManagerHomePage } from '../../PMAnagerContent/p-manager-home/p-manager-home';
@IonicPage()
@Component({
  selector: "page-pump-report",
  templateUrl: "pump-report.html"
})
export class PumpReportPage {
  public userType: number;
  activeCS: number;
  activeLS: number;
  activCSShow: boolean;
  activLSShow: boolean;
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
      if (this.userType == 11) {
        this.appCtrl.getRootNav().setRoot(POwnerHomePage);
      } else if (this.userType == 12) {
        this.appCtrl.getRootNav().setRoot(PManagerHomePage);
      }
      backAction();
    }, 1);
  }

  ionViewDidLoad() {
    //this.basicData.Loader();
    this.storage.get("activeCS").then(val => {
      this.activeCS = val;
      console.log(this.activeCS)
    });
    this.storage.get("activeLS").then(val => {
      this.activeLS = val;
      console.log(this.activeLS);
    });
    this.storage.get("userType").then(val => {
      this.userType = val;
    });
  }
  topCustomer() {
    this.appCtrl.getRootNav().setRoot("TopCustomerReportPage");
  }
  totalSales() {
    this.appCtrl.getRootNav().setRoot("TotalSalesReportPage");
  }
  creditPayments() {
    this.appCtrl.getRootNav().setRoot("CreditPaymentReportPage");
  }
  pendingPayments() {
    this.appCtrl.getRootNav().setRoot("PendingPaymentReportPage");
  }
  lostPayment() {
    this.appCtrl.getRootNav().setRoot("LostPaymentReportPage");
  }

  productRateList() {
    this.appCtrl.getRootNav().setRoot("ProductRateListReportPage");
  }

  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  home() {
    if (this.userType == 11) {
      this.appCtrl.getRootNav().setRoot(POwnerHomePage);
    } else if (this.userType == 12) {
      this.appCtrl.getRootNav().setRoot(PManagerHomePage);
    }
  }

  PumpRelatedReportsPage() {
    this.appCtrl.getRootNav().setRoot("PumpRelatedReportsPage");
  }

  CreditSalesReportPage() {
    this.appCtrl.getRootNav().setRoot("CreditSalesReportPage");
  }

  LoyaltySalesReportPage() {
    this.appCtrl.getRootNav().setRoot("LoyaltySalesReportPage");
  }

  menuClick() {
    this.basicData.checkPumpCount();
  }

}
