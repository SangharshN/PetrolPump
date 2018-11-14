
import { Component } from "@angular/core";
import { NavController, App, NavParams, PopoverController, Platform, AlertController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { TransDataProvider } from "../../../providers/trans-data/trans-data";
import { BasicDataProvider } from "../../../providers/basic-data/basic-data";
import { Http } from "@angular/http";
import { CreditDataProvider } from "../../../providers/credit-data/credit-data";
import { PumpDataProvider } from "../../../providers/pump-data/pump-data";
import { ReportsProvider } from "../../../providers/reports/reports";
import { Reports } from "../../../app/reports";


@Component({
  selector: "page-p-manager-home",
  templateUrl: "p-manager-home.html"
})
export class PManagerHomePage {
  public title = "";
  public userType: any;
  public pumpSummary=new Reports;
  public pumpSummaryFilter:any[]=[];
  public success: any;
  public barChart: any;
  public doughnutChart: any;
  public lineChart: any;
  public totalFuel: any;
  public shownGroup: null;
  productId: number;
  productList:any;
  public activeCS:number;

  public totalCash: any;
  public pumpId: string;
  public name: string;
  public transPump: any;
  public totalRequest: number;
  public totalPending: number;

  information: any[];
  public transporterId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public trans: TransDataProvider,
    public storage: Storage,
    public appCtrl: App,
    public platform: Platform,
    public reportData:ReportsProvider,
    public basicData: BasicDataProvider,
    public alertCtrl: AlertController,
    public http: Http,
    public popoverCtrl: PopoverController,
    public credit: CreditDataProvider,
    public pumpData: PumpDataProvider,
  ) {
    let backAction = this.platform.registerBackButtonAction(() => {
      // omitted;
      let alert = this.alertCtrl.create({
        // title: 'Confirm purchase',
        message: "Do you really want to exit?",
        enableBackdropDismiss: false,
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              this.appCtrl.getRootNav().setRoot(PManagerHomePage);
            }
          },
          {
            text: "Ok",
            handler: () => {
              platform.exitApp();
            }
          }
        ]
      });
      alert.present();
      backAction();
    }, 1);
    // let localData = http
    //   .get("assets/information.json")
    //   .map(res => res.json().items);
    // localData.subscribe(data => {
    //   this.information = data;
    // });
    this.productId=0;
  }

  ionViewDidLoad() {
    //this.basicData.Loader();
    this.storage.get("activeCS").then(val => {
      this.activeCS = val;
    });
  
    this.storage.get("pumpId").then(val => {
      this.pumpId = val;
      console.log(this.pumpId);
      this.showProduct();
      this.showPumpSummary();
      this.pumpData.getPumpTotal(this.pumpId).subscribe(
        res => {
          console.log(res);
          this.transPump = res;
          this.totalRequest = this.transPump.totalRequests;
          this.totalPending = this.transPump.totalPending;
          this.totalCash = this.transPump.totalInProgress;
        },
        err => {

          this.basicData.sendErrorNotification(
            "There is some issue. Please TRY again!!!"
          );
        }
      );
    });
    this.storage.get("transporterId").then(val => {
      this.transporterId = val;
    });
    this.storage.get("name").then(val => {
      this.name = val;
    });
    this.storage.get("userType").then(val => {
      this.userType = val;
      if (this.userType == "11") this.title = "Owner";
      else if (this.userType == "12") this.title = "Manager";
    });
  }

  login() {
    var trans = 1;
    this.pumpData.getCompParams(trans).subscribe(
      status => {
        this.success = JSON.stringify(status);
      },
      err => {

        this.basicData.sendErrorNotification(
          "There is some issue. Please TRY again!!!"
        );
      }
    );
  }
  showPumpSummary() {
    this.reportData.getOilPurchased(this.pumpId, this.productId).subscribe(res => {
      console.log(res);
      this.pumpSummary = res;
      this.pumpSummaryFilter = res.AllPO;
    })
  }
  ProductSelect(productID) {
    console.log(productID);
    this.productId = productID;
    this.showPumpSummary();
  }
  showProduct() {
    this.reportData.getProductList(this.pumpId).subscribe(
      res => {
        console.log(res);
        this.productList = res;
      },
      err => {
        this.basicData.sendErrorNotification(
          "There is some issue. Please TRY again!!!"
        );
      });
  }
  addRequest() {
    this.appCtrl.getRootNav().setRoot("CashDispensePage");
  }
  reportRequest() {
    this.appCtrl.getRootNav().setRoot("PumpReportPage");
  }
  buyItem(item) { }
  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  toggleGroup(group) {

    if (this.isGroupShown(group)) {
      this.shownGroup = null;
      console.log(group, this.shownGroup);
    } else {
      this.shownGroup = group;
      console.log(group, this.shownGroup)
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  }

  home() {
    this.ionViewDidLoad();
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }
}
