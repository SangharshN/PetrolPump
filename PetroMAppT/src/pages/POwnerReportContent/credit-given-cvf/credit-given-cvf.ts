import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, App, Platform, LoadingController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { Reports } from '../../../app/reports';
import { ReportsProvider } from '../../../providers/reports/reports';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';


/**
 * Generated class for the CreditGivenCvfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-credit-given-cvf',
  templateUrl: 'credit-given-cvf.html',
})
export class CreditGivenCvfPage {
  pumpId: number;
  productList: any;
  startDate: any;
  productId: number;
  transporterId: number;
  currentDate: any;
  public treport = new Reports;
  public treport1 = new Reports;
  public cashCreditSales = [];
  public fuelCreditSales = [];
  public totalCreditSales = [];
  public transporter: any;
  public transporterList = [];
  public transporterNameList: any;
  hideTransporter: boolean = false;
  cashEmpty: boolean = false;
  fuelEmpty: boolean = false;
  totalEmpty: boolean = false;
  cashView: boolean = false;
  fuelView: boolean = false;
  totalView: boolean = false;
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
    public storage: Storage,
    public loadingCtrl:LoadingController,
    public datePipe: DatePipe,
    public reportData: ReportsProvider,
    public basicData: BasicDataProvider,
    public appCtrl: App) {
    this.categories = "Fuel";
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
      this.showTransporter();
      this.getCreditGivenCashFuel();
    });
  }

  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  home() {
    this.appCtrl.getRootNav().setRoot("CreditSalesReportPage");
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
  onChange(value) {
    console.log(value);
    switch (value) {
      case '1':
        this.startDate = new Date().toISOString();
        this.endDate = new Date().toISOString();
        this.getCreditGivenCashFuel();
        this.show = false;
        break;

      case '2':
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.endDate = this.startDate;
        this.getCreditGivenCashFuel();
        this.show = false;
        break;
      case '3':
        currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 2);
        this.start = currentDate;
        this.endDate = new Date().toISOString();
        this.startDate = this.start.toISOString();
        this.getCreditGivenCashFuel();
        this.show = false;
        break;
      case '4':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(currentDate.getDate() - 6);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.getCreditGivenCashFuel();
        this.show = false;
        break;
      case '5':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(currentDate.getDate() - 14);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.getCreditGivenCashFuel();
        this.show = false;
        break;
      case '6':
        currentDate = new Date();
        currentDate.setDate(1);
        this.endDate = new Date().toISOString();
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.getCreditGivenCashFuel();
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
        this.getCreditGivenCashFuel();
        break;
      case '8':
        this.show = true;
        console.log(this.show);
        break;
    }
  }
  dateChanged() {
    console.log(this.sDate, this.eDate);
    this.startDate = this.sDate;
    this.endDate = this.eDate;
    this.getCreditGivenCashFuel();
  }
  showTransporter() {
    this.reportData.getTransporterList(this.pumpId)
      .subscribe(res => {
        console.log(res);
        this.transporter = res;
        this.transporterNameList = res;
        for (var i = 0; i < res.length; i++) {
          this.transporterList[i] = res[i].name;
        }
        console.log(this.transporterList, res);

      }, err => {
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }
  filter() {
    if (this.query !== "") {
      if (this.query.length > 1) {
        this.transporterNameList = this.transporterList.filter(function (el) {
          return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
      }
    } else {
      this.transporterNameList = [];
    }
  }

  select(item) {
    console.log(item, this.transporter);
    // this.state = item;
    this.query = '';
    this.selectedTransporter = this.transporter.filter(name => name.name === item);
    console.log(this.selectedTransporter);
    this.treport.transporterId = this.selectedTransporter[0].id;
    console.log(this.treport.transporterId);
    this.transporterId = this.treport.transporterId;
    this.reportData.getTransporterDetail(this.treport.transporterId, this.pumpId)
      .subscribe(res => {
        console.log(res);
        this.treport1 = res;
        this.hideTransporter = true;
        this.getCreditGivenCashFuel();
      });
  }
  getCreditGivenCashFuel() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.endDate = this.datePipe.transform(this.endDate, "yyyy-MM-dd");
    this.startDate = this.datePipe.transform(this.startDate, "yyyy-MM-dd");
    this.tDate = this.startDate + ',' + this.endDate;
    console.log(this.tDate);
    this.reportData.getCreditGivenCashFuel(this.pumpId, this.transporterId, this.tDate).subscribe(res => {
      console.log(res);
      loading.dismiss();
      this.treport = res;
      this.cashCreditSales = res.cashCreditSales;
      this.fuelCreditSales = res.fuelCreditSales;
      this.totalCreditSales = res.totalCreditSales;
      if (this.cashCreditSales.length == 0) {
        this.cashEmpty = true;
        this.cashView = false;
      }
      else {
        this.cashEmpty = false;
        this.cashView = true;
      }
      if (this.fuelCreditSales.length == 0) {
        this.fuelEmpty = true;
        this.fuelView = false;
      }
      else {
        this.fuelEmpty = false;
        this.fuelView = true;
      }
      if (this.totalCreditSales.length == 0) {
        this.totalEmpty = true;
        this.totalView = false;
      }
      else {
        this.totalEmpty = false;
        this.totalView = true;
      }
    })
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }

}
