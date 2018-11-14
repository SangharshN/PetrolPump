import { Storage } from '@ionic/storage';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, PopoverController, App, Platform, LoadingController } from "ionic-angular";
import { DatePipe } from "@angular/common";
import { Reports } from '../../../app/reports';
import { ReportsProvider } from '../../../providers/reports/reports';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';


/**
 * Generated class for the PaymentReceivedTransporterWiseReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-payment-received-transporter-wise-report",
  templateUrl: "payment-received-transporter-wise-report.html"
})
export class PaymentReceivedTransporterWiseReportPage {
  public treport = new Reports;
  public paymenttreport = new Reports;
  public transporter: any;
  public transporterList = [];
  public transporterNameList: any;
  fuelEmpty: boolean = false;
  cashEmpty: boolean = false;
  totalEmpty: boolean = false;
  cashView: boolean = false;
  fuelView: boolean = false;
  totalView: boolean = false;
  selectedTransporter: any;
  startDate: any;
  currentDate: any;
  start: Date;
  categories: any;
  transporterId: number;
  endDate: any;
  public pumpId: number;
  FuelList: any;
  CashList: any;
  Total: any;
  public query = '';
  tDate: any;
  eDate: any;
  sDate: any;
  showEmpty: boolean;
  show: boolean = false;
  hideTransporter: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public datePipe: DatePipe,
    public storage: Storage,
    public loadingCtrl:LoadingController,
    public platform: Platform,
    public reportsData: ReportsProvider,
    public basicData: BasicDataProvider,
    public appCtrl: App) {
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot("CreditSalesReportPage");
      backAction();
    }, 1);
    this.categories = "Fuel";
    this.transporterId = 0;
    this.currentDate = new Date().toLocaleDateString();;
    console.log(this.currentDate);
    this.currentDate = this.datePipe.transform(this.currentDate, "yyyy-MM-dd");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PaymentReceivedTransporterWiseReportPage");
    this.storage.get('pumpId').then((val) => {
      this.pumpId = val;
      console.log(this.pumpId)
      this.showTransporter();
      this.getPayment();
    });
    this.endDate = new Date().toISOString();
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 6);
    this.start = currentDate;
    this.startDate = this.start;
    console.log(this.startDate, this.endDate);
  }
  showTransporter() {
    this.reportsData.getTransporterList(this.pumpId)
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
        if (this.transporterNameList.length == 0) {
          this.showEmpty = true;
        }
        else {
          this.showEmpty = false;
        }
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
    this.reportsData.getTransporterDetail(this.treport.transporterId, this.pumpId)
      .subscribe(res => {
        console.log(res);
        this.treport = res;
        this.hideTransporter = true;
        this.getPayment();
      });
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
        currentDate.setDate(currentDate.getDate() - 2);
        this.start = currentDate;
        new Date().toISOString();
        this.endDate = new Date().toISOString();

        this.startDate = this.start.toISOString();
        this.getPayment();
        this.show = false;
        break;
      case '4':
        currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 6);
        this.start = currentDate;
        new Date().toISOString();
        this.endDate = new Date().toISOString();

        this.startDate = this.start.toISOString();
        this.getPayment();
        this.show = false;
        break;
      case '5':
        currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 14);
        this.start = currentDate;
        new Date().toISOString();
        this.endDate = new Date().toISOString();

        this.startDate = this.start.toISOString();
        this.getPayment();
        this.show = false;
        break;
      case '6':
        currentDate = new Date();
        currentDate.setDate(1);
        this.start = currentDate;
        new Date().toISOString();
        this.endDate = new Date().toISOString();

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
  getPayment() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.endDate = this.datePipe.transform(this.endDate, "yyyy-MM-dd");
    this.startDate = this.datePipe.transform(this.startDate, "yyyy-MM-dd");
    this.tDate = this.startDate + ',' + this.endDate;
    console.log(this.pumpId, this.transporterId, this.tDate);
    this.reportsData.getPaymentReceivedTranspWise(this.pumpId, this.transporterId, this.tDate).subscribe(res => {
      console.log(res);
      loading.dismiss();
      this.paymenttreport = res;
      this.FuelList = res.fuelData;
      this.CashList = res.cashData;
      this.Total = res.totData;
      if (this.FuelList == null || this.FuelList.length == 0) {
        this.fuelEmpty = true;
        this.fuelView = false;
      }
      else {
        this.fuelEmpty = false;
        this.fuelView = true;
      }
      if (this.CashList == null || this.CashList.length == 0) {
        this.cashEmpty = true;
        this.cashView = false;
      }
      else {
        this.cashEmpty = false;
        this.cashView = true;
      }
      if (this.Total == null || this.Total.length == 0) {
        this.totalEmpty = true;
        this.totalView = false;
      }
      else {
        this.totalEmpty = false;
        this.totalView = true;
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
