import { Reports } from './../../../app/reports';
import { Component, ViewChild } from "@angular/core";
import { NavController, App, NavParams, PopoverController, Platform, AlertController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { Observable } from 'rxjs';
import { DatePipe } from "@angular/common";
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
import { SalesDataProvider } from '../../../providers/sales-data/sales-data';
import { ReportsProvider } from '../../../providers/reports/reports';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { CreditDataProvider } from '../../../providers/credit-data/credit-data';
import { PumpDataProvider } from '../../../providers/pump-data/pump-data';
import { Slides } from 'ionic-angular';

@Component({
  selector: "page-p-owner-home",
  templateUrl: "p-owner-home.html"
})
export class POwnerHomePage {
  @ViewChild(Slides) slides: Slides;
  public title = "";
  public userType: any;
  public loyality = new Reports;
  public overall = new Reports
  public paymode = new Reports;
  public creditl = new Reports;
  public oilstock = new Reports;
  public pumpSummary = new Reports;
  overallshow: boolean = false;
  overallhide: boolean = false;
  public success: any;
  public paymodeId: number;
  public weekList: any[] = [];
  productList: any;
  LoaylityDetail: any[] = [];
  oilList: any[] = [];
  creditList: any[] = [];
  RegularDetail: any[] = [];
  PaymodeList: any[] = []
  selectPaymodeList: any;
  regular: any;
  oilproductId: number;
  sample: any;
  creditDetail: any;
  loyalityShow: boolean = false;
  loyalityHide: boolean = true;
  regularShow: boolean = false;
  regularHide: boolean = true;
  activCSShow: boolean;
  activLSShow: boolean;
  LoyalitySalesList: any;
  public totalFuel: any;
  public totalCash: any;
  public pumpId: string;
  public name: string;
  public productId: number;
  public productIdOver: number;
  public transPump: any;
  public totalRequest: number;
  public totalPending: number;
  toFix: any;
  OverallSummary: any;
  pumpSummaryFilter: any
  public transporterId: string;
  public activeCS: number;
  public activeLS: number;
  shownGroup = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public trans: TransDataProvider,
    public storage: Storage,
    public salesData: SalesDataProvider,
    public reportData: ReportsProvider,
    public platform: Platform,
    public appCtrl: App,
    public datepipe: DatePipe,
    public basicData: BasicDataProvider,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public credit: CreditDataProvider,
    public pumpData: PumpDataProvider
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
              this.appCtrl.getRootNav().setRoot(POwnerHomePage);
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
    this.productId = 0;
    this.productIdOver = 0;
    this.paymodeId = 0;
  }

  ionViewDidLoad() {
    this.storage.get("pumpId").then(val => {
      this.pumpId = val;
      this.showProduct();
      this.showPumpSummary();
      this.showRegularSale();
      this.showOverall();
      this.showPaymode();
      this.showPaymodewiseSale();

    });


    
    this.storage.get("activeCS").then(val => {
      this.activeCS = val;
      console.log(this.activeCS);
      if (this.activeCS == 1) {
        this.showCreditSale();
      }
    });
    this.storage.get("activeLS").then(val => {
      this.activeLS = val;
      console.log(this.activeLS);
      if (this.activeLS == 1) {
        this.showLoyalitySale();
      }
    });
    // this.storage.set('activeCS', this.activeCS);
    //this.storage.set('activeLS', this.activeLS);

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
      });
  }

  popover(myEvent) {
    let popover = this.popoverCtrl.create("PumppopPage");
    popover.present({
      ev: myEvent
    });
  }
  addRequest() {
    this.appCtrl.getRootNav().setRoot("CashDispensePage");
  }
  reportRequest() {
    this.appCtrl.getRootNav().setRoot("PumpReportPage");
  }
  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  load() {
    Observable.interval(2000 * 60).subscribe(x => {
      this.ionViewDidLoad();
    });

  }
  ProductSelect(productID) {
    console.log(productID);
    this.productId = productID;
    this.showPumpSummary();

  }
  ProductSelectOil(productID) {
    console.log(productID);
    this.productIdOver = productID;
    this.showOverall();
  }
  ProductSelectOilStock(productID) {
    console.log(productID);
    this.oilproductId = productID;
    this.showOilStock();
  }
  showProduct() {
    this.reportData.getProductList(this.pumpId).subscribe(
      res => {
        console.log(res);
        this.productList = res;
        this.oilproductId = res[0].id;
        this.showOilStock();
      },
      err => {
        this.basicData.sendErrorNotification(
          "There is some issue. Please TRY again!!!"
        );
      });
  }
  showPumpSummary() {
    console.log(this.productId);
    this.reportData.getOilPurchased(this.pumpId, this.productId).subscribe(res => {
      console.log(res);
      this.pumpSummary = res;
      this.pumpSummaryFilter = res.AllPO;
    })
  }
  showOverall() {
    this.reportData.getOverallProductWise(this.pumpId, this.productIdOver).subscribe(res => {
      console.log(res);
      this.OverallSummary = res.products;
      this.overall = res;

      if (this.OverallSummary.length == 0 || this.OverallSummary == null) {
        this.overallshow = true;
        this.overallhide = false;
      }
      else {
        this.overallshow = false;
        this.overallhide = true;
      }
      if (this.overall.sumAmount == null) {
        this.overall.sumAmount = 0.00;
      }
      if (this.overall.sumQty == null) {
        this.overall.sumQty = 0.00;
      }
      console.log(this.OverallSummary);
    });
  }



  showOilStock() {
    this.reportData.getCurrentOilStock(this.pumpId, this.oilproductId).subscribe(res => {
      console.log(res);
      this.oilstock = res;
      this.oilList = res.tanks;

    })
  }

  showLoyalitySale() {
    this.reportData.getLoyaltySaleslastDashboard(this.pumpId).subscribe(res => {
      console.log(res);
      this.loyality = res;
      this.LoaylityDetail = res.loyaltySalesList;
      if (this.LoaylityDetail == null) {
        this.loyalityShow = true;
        this.loyalityHide = false;
      }
      else {
        this.loyalityShow = false;
        this.loyalityHide = true;
      }
      if (this.loyality.newDrivers == null) {
        this.loyality.newDrivers = 0.00;
      }
      if (this.loyality.totalDriver == null) {
        this.loyality.totalDriver = 0.00;
      }
      if (this.loyality.visitedDriversCount == null) {
        this.loyality.visitedDriversCount = 0;
      }


    })
  }
  showRegularSale() {
    this.reportData.getRegularSaleslastDashboard(this.pumpId).subscribe(res => {
      console.log(res);
      this.regular = res;
      this.RegularDetail = res.sales;
      if (this.RegularDetail == null || this.RegularDetail.length == 0) {
        this.regularShow = true;
        this.regularHide = false;
      }
      else {
        this.regularShow = false;
        this.regularHide = true;
      }

      if (this.regular.totalAmount == null) {
        this.regular.totalAmount = 0.00;
      }
      if (this.regular.totalQty == null) {
        this.regular.totalQty = 0.00;
      }
    })
  }
  showCreditSale() {
    this.reportData.getCreditSaleslastDashboard(this.pumpId).subscribe(res => {
      console.log(res);
      this.creditl = res;
      this.creditList = res.sales;
      console.log(this.creditList);
      if (this.creditl.totalCSAmount == null) {
        this.creditl.totalCSAmount = 0.00;
      }
      if (this.creditl.totalCSBillAmount == null) {
        this.creditl.totalCSBillAmount = 0.00;
      }
      if (this.creditl.totalPaymentAmount == null) {
        this.creditl.totalPaymentAmount = 0.00;
      }
    })
  }
  showPaymodewiseSale() {
    this.reportData.getPaymodeWiseSales(this.pumpId, this.paymodeId).subscribe(res => {
      console.log(res);
      this.paymode = res;
      this.PaymodeList = res.allSales;
      console.log(this.PaymodeList, this.paymode.totalAmount);
      if (this.paymode.totalAmount == null) {
        this.paymode.totalAmount = 0.00;
      }
      if (this.paymode.totalCreditAmount == null) {
        this.paymode.totalCreditAmount = 0.00;
      }
      if (this.paymode.totalLoyaltyAmount == null) {
        this.paymode.totalLoyaltyAmount = 0.00;
      }
      if (this.paymode.totalRegularAmount == null) {
        this.paymode.totalRegularAmount = 0.00;
      }
    })
  }
  selectPaymode(productID) {
    console.log(productID);
    this.productIdOver = productID;
    this.showPaymodewiseSale();
  }
  showPaymode() {
    this.salesData.getPayMode()
      .subscribe(res => {
        this.selectPaymodeList = res;
        console.log(this.selectPaymodeList)
      }, err => {

        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }
  home() {
    this.ionViewDidLoad();
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }
  goToSlide() {
    this.slides.slideTo(2, 500);
  }

}
