import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, App, Platform, LoadingController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { Reports } from '../../../app/reports';
import { ReportsProvider } from '../../../providers/reports/reports';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';


/**
 * Generated class for the OilPurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-oil-purchase',
  templateUrl: 'oil-purchase.html',
})
export class OilPurchasePage {
  pumpId: number;
  productList: any;
  startDate: any;
  productId: number;
  currentDate: any;
  tDate: any;
  eDate: any;
  sDate: any;
  FuelDetail: any[] = [];
  FuelSoldList = new Reports;
  start: Date;
  endDate: any;
  show: boolean = false;
  view: boolean = false;
  showRecord: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public platform: Platform,
    public storage: Storage,
    public loadingCtrl:LoadingController,
    public datePipe: DatePipe,
    public reportData: ReportsProvider,
    public basicData: BasicDataProvider,
    public appCtrl: App) {
    this.productId = 0;

    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot("PumpRelatedReportsPage");
      backAction();
    }, 1)
    this.currentDate = new Date().toLocaleDateString();;
    console.log(this.currentDate);
    this.currentDate = this.datePipe.transform(this.currentDate, "yyyy-MM-dd");
  }

  ionViewDidLoad() {
    this.storage.get("pumpId").then(val => {
      this.pumpId = val;
      this.showProduct();
      this.endDate = new Date().toISOString();
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 6);
      this.start = currentDate;
      this.startDate = this.start;

      //  this.startDate = new Date().toISOString();
      console.log(this.startDate, this.endDate);
      this.getOilPurchase();
    });
  }

  home() {
    this.appCtrl.getRootNav().setRoot("PumpRelatedReportsPage");
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
    this.getOilPurchase();
    // this.pumpSummaryFilter = this.pumpSummary.filter(v => v.productId === productID);
    // console.log(this.pumpSummaryFilter);
  }
  onChange(value) {
    console.log(value);
    switch (value) {
      case '1':
        this.startDate = new Date().toISOString();
        this.endDate = new Date().toISOString();
        this.getOilPurchase();
        this.show = false;
        break;

      case '2':
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.endDate = this.startDate;
        this.getOilPurchase();
        this.show = false;
        break;
      case '3':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(currentDate.getDate() - 2);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.getOilPurchase();
        this.show = false;
        break;
      case '4':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(currentDate.getDate() - 6);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.getOilPurchase();
        this.show = false;
        break;
      case '5':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(currentDate.getDate() - 14);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.getOilPurchase();
        this.show = false;
        break;
      case '6':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(1);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.getOilPurchase();
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
        this.getOilPurchase();
        break;
      case '8':
        this.show = true;
        console.log(this.show);
        break;
    }
  }
  dateChanged(item) {
    console.log(this.sDate, this.eDate);
    if (this.sDate == undefined || this.eDate == undefined) {
      console.log("yes");
    }
    else {
      this.startDate = this.sDate;
      this.endDate = this.eDate;
      this.getOilPurchase();
    }

  }
  getOilPurchase() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.endDate = this.datePipe.transform(this.endDate, "yyyy-MM-dd");
    this.startDate = this.datePipe.transform(this.startDate, "yyyy-MM-dd");
    this.tDate = this.startDate + ',' + this.endDate;
    console.log(this.tDate);
    this.reportData.getOilPurchasedDatewise(this.pumpId, this.productId, this.tDate).subscribe(res => {
      console.log(res);
      loading.dismiss();
      this.FuelSoldList = res;
      this.FuelDetail = this.FuelSoldList.AllPO;
      if (this.FuelDetail.length == 0) {
        this.showRecord = true;
        this.view = false;
      }
      else {
        this.showRecord = false;
        this.view = true;
      }
    })
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }

}
