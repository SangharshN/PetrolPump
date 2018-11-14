import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, App, Platform, LoadingController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { Reports } from '../../../app/reports';
import { ReportsProvider } from '../../../providers/reports/reports';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';


/**
 * Generated class for the LoyaltyFuelSoldQtyAmtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loyalty-fuel-sold-qty-amt',
  templateUrl: 'loyalty-fuel-sold-qty-amt.html',
})
export class LoyaltyFuelSoldQtyAmtPage {
  Loyality = new Reports;
  pumpId: number;
  productList: any;
  startDate: any;
  productId: number;
  transporterId: number;
  public treport = new Reports;
  public treport1 = new Reports;
  public cashCreditSales = [];
  public fuelCreditSales = [];
  public totalCreditSales = [];
  public transporter: any;
  public transporterList = [];
  public LoyaltyDetail: any[] = [];
  public transporterNameList: any;
  hideTransporter: boolean = false;
  loyalityHide: boolean = false;
  loyalityShow: boolean = false;
  totalEmpty: boolean = false;
  currentDate: any;
  public query = '';
  tDate: any;
  eDate: any;
  sDate: any;
  FuelDetail: any[] = [];
  creditList = new Reports;
  start: Date;
  endDate: any;
  show: boolean = false;
  view: boolean = true;
  showRecord: boolean = false;
  selectedTransporter: any;
  categories: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public platform: Platform,
    public loadingCtrl:LoadingController,
    public storage: Storage,
    public datePipe: DatePipe,
    public reportData: ReportsProvider,
    public basicData: BasicDataProvider,
    public appCtrl: App) {
    this.categories = "Fuel";
    this.productId = 0;
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot("LoyaltySalesReportPage");
      backAction();
    }, 1);
    this.currentDate = new Date().toLocaleDateString();;
    console.log(this.currentDate);
    this.currentDate = this.datePipe.transform(this.currentDate, "yyyy-MM-dd");
  }

  ionViewDidLoad() {
    this.storage.get("pumpId").then(val => {
      this.pumpId = val;
      this.endDate = new Date().toISOString();
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 6);
      this.start = currentDate;
      this.startDate = this.start;
      console.log(this.startDate, this.endDate);
      this.showProduct();
      this.getLoyaltyFuelSoldQtyAmt();
    });
  }

  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  home() {
    this.appCtrl.getRootNav().setRoot("LoyaltySalesReportPage");
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
  ProductSelect(productID) {
    console.log(productID);
    this.productId = productID;
    this.getLoyaltyFuelSoldQtyAmt();
    // this.pumpSummaryFilter = this.pumpSummary.filter(v => v.productId === productID);
    // console.log(this.pumpSummaryFilter);
  }
  onChange(value) {
    console.log(value);
    switch (value) {
      case '1':
        this.startDate = new Date().toISOString();
        this.endDate = new Date().toISOString();
        this.getLoyaltyFuelSoldQtyAmt();
        this.show = false;
        break;

      case '2':
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.endDate = this.startDate;
        this.getLoyaltyFuelSoldQtyAmt();
        this.show = false;
        break;
      case '3':
        currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 2);
        this.start = currentDate;
        this.endDate = new Date().toISOString();
        this.startDate = this.start.toISOString();
        this.getLoyaltyFuelSoldQtyAmt();
        this.show = false;
        break;
      case '4':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(currentDate.getDate() - 6);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.getLoyaltyFuelSoldQtyAmt();
        this.show = false;
        break;
      case '5':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(currentDate.getDate() - 14);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.getLoyaltyFuelSoldQtyAmt();
        this.show = false;
        break;
      case '6':
        currentDate = new Date();
        currentDate.setDate(1);
        this.endDate = new Date().toISOString();
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.getLoyaltyFuelSoldQtyAmt();
        this.show = false;
        break;
      case '7':
        currentDate = new Date();
        currentDate.setDate(1);
        var currentMonth = currentDate.getMonth() - 1;
        currentDate.setMonth(currentMonth);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        // var currentDate = new Date();
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var lastDay = new Date(y, m, 0);
        this.start = lastDay;
        this.endDate = this.start.toISOString();
        this.getLoyaltyFuelSoldQtyAmt();
        break;
      case '8':
        this.show = true;
        console.log(this.show);
        break;
    }
  }
  dateChanged() {
    console.log(this.sDate, this.eDate);
    if (this.sDate == undefined || this.eDate == undefined) {
      console.log("yes");
    }
    else {
      this.startDate = this.sDate;
      this.endDate = this.eDate;
      this.getLoyaltyFuelSoldQtyAmt();
    }
  }
  getLoyaltyFuelSoldQtyAmt() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.endDate = this.datePipe.transform(this.endDate, "yyyy-MM-dd");
    this.startDate = this.datePipe.transform(this.startDate, "yyyy-MM-dd");
    this.tDate = this.startDate + ',' + this.endDate;
    console.log(this.tDate);
    this.reportData.getLoyaltyFuelSoldQtyAmt(this.pumpId, this.productId, this.tDate).subscribe(res => {
      console.log(res);
      loading.dismiss();
      this.Loyality = res;
      this.LoyaltyDetail = res.loyaltySalesData;
      if (this.LoyaltyDetail == null || this.LoyaltyDetail.length == 0) {
        this.loyalityShow = true;
        this.loyalityHide = false;
      }
      else {
        this.loyalityHide = true;
        this.loyalityShow = false;
      }
    })
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }
}
