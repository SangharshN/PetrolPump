import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, App, Platform, LoadingController } from 'ionic-angular';
import { Reports } from '../../../app/reports';
import { ReportsProvider } from '../../../providers/reports/reports';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { DatePipe } from '@angular/common';
import { SalesDataProvider } from '../../../providers/sales-data/sales-data';


/**
 * Generated class for the PaymentReceivedPaymodeWiseReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-received-paymode-wise-report',
  templateUrl: 'payment-received-paymode-wise-report.html',
})
export class PaymentReceivedPaymodeWiseReportPage {
  startDate: any;
  start: Date;
  endDate: any;
  paymodeList: any;
  currentDate: any;
  PaymodeId: any;
  tDate: any;
  eDate: any;
  sDate: any;
  pumpId: number;
  paymentR = new Reports;
  public ValidDateofBirth: any;
  show: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private datePipe: DatePipe,
    public appCtrl: App,
    public loadingCtrl:LoadingController,
    public storage: Storage,
    public popoverCtrl: PopoverController,
    public reportData: ReportsProvider,
    public platform: Platform,
    public salesData: SalesDataProvider,
    public basicData: BasicDataProvider) {
    this.PaymodeId = 0;
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot("CreditSalesReportPage");
      backAction();
    }, 1);
    this.currentDate = new Date().toLocaleDateString();;
    console.log(this.currentDate);
    this.currentDate = this.datePipe.transform(this.currentDate, "yyyy-MM-dd");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentReceivedPaymodeWiseReportPage');
    this.showPaymode();
    this.endDate = new Date().toISOString();
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 6);
    this.start = currentDate;
    this.startDate = this.start;
    console.log(this.startDate, this.endDate);
    this.storage.get('pumpId').then((val) => {
      this.pumpId = val;
      console.log(this.pumpId);
      this.getPayment();
    });

  }
  showPaymode() {
    this.salesData.getPayMode()
      .subscribe(res => {
        this.paymodeList = res;
      }, err => {
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }
  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  onChange(value) {
    console.log(value);
    switch (value) {
      case '1':
        this.startDate = new Date().toISOString();
        this.endDate = new Date().toISOString();
        this.getPayment();
        this.show = false;
        break;

      case '2':
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.endDate = this.startDate;
        this.getPayment();
        this.show = false;
        break;
      case '3':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(currentDate.getDate() - 2);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.getPayment();
        this.show = false;
        break;
      case '4':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(currentDate.getDate() - 6);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.getPayment();
        this.show = false;
        break;
      case '5':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(currentDate.getDate() - 14);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.getPayment();
        this.show = false;
        break;
      case '6':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(1);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.getPayment();
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
        this.getPayment();
        break;
      case '8':
        this.show = true;
        console.log(this.show);
        break;
    }
  }
  selectPaymodeList(reqFuel1) {
    console.log(reqFuel1);
    this.PaymodeId = reqFuel1;
    this.getPayment();
  }
  getPayment() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.endDate = this.datePipe.transform(this.endDate, "yyyy-MM-dd");
    this.startDate = this.datePipe.transform(this.startDate, "yyyy-MM-dd");
    this.tDate = this.startDate + ',' + this.endDate;
    console.log(this.tDate);
    this.reportData.getPaymentReceivedPaymodeWise(this.pumpId, this.PaymodeId, this.tDate).subscribe(res => {
      console.log(res);
      loading.dismiss();
      this.paymentR = res;
      console.log(this.paymentR.regularSales);
      if (this.paymentR.creditSales == null) {
        this.paymentR.creditSales = 0;
      }
      if (this.paymentR.loyaltySales == null) {
        this.paymentR.loyaltySales = 0;
      }
      if (this.paymentR.regularSales == null) {
        this.paymentR.regularSales = 0;
      }
      if (this.paymentR.otherSales == null) {
        this.paymentR.otherSales = 0;
      }
    })
  }
  dateChanged() {
    console.log(this.sDate, this.eDate);
    this.startDate = this.sDate;
    this.endDate = this.eDate;
    this.getPayment();
  }
  home() {
    this.appCtrl.getRootNav().setRoot("CreditSalesReportPage")
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }

}
