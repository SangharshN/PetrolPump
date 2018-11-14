
import { Storage } from "@ionic/storage";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, PopoverController, App, Platform, LoadingController } from "ionic-angular";
import { Reports } from '../../../app/reports';
import { ReportsProvider } from '../../../providers/reports/reports';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';



/**
 * Generated class for the TransporterDetailReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-transporter-detail-report",
  templateUrl: "transporter-detail-report.html"
})
export class TransporterDetailReportPage {
  public treport = new Reports();
  public transporter: any;
  public transporterList = [];
  public transporterNameList: any;
  selectedTransporter: any;
  public pumpId: number;
  public query = "";
  public blanketTotal: number;
  public nonblanketTotal: number;
  show: boolean = false;
  showEmpty: boolean;
  cashHide: boolean = true;
  fuelHide: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public storage: Storage,
    public appCtrl: App,
    public platform: Platform,
    public popoverCtrl: PopoverController,
    public basicData: BasicDataProvider,
    public reportsData: ReportsProvider
  ) {
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot("CreditSalesReportPage");
      backAction();
    }, 1);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TransporterDetailReportPage");
    this.storage.get("pumpId").then(val => {
      this.pumpId = val;
      console.log(this.pumpId);
      this.showTransporter();
    });
  }
  showTransporter() {
    this.reportsData.getTransporterList(this.pumpId).subscribe(
      res => {
        console.log(res);
        this.transporter = res;
        this.transporterNameList = res;
        for (var i = 0; i < res.length; i++) {
          this.transporterList[i] = res[i].name;
        }
        console.log(this.transporterList, res);
      },
      err => {
        this.basicData.sendErrorNotification(
          "There is some issue. Please TRY again!!!"
        );
      }
    );
  }
  filter() {
    if (this.query !== "") {
      if (this.query.length > 1) {
        this.transporterNameList = this.transporterList.filter(
          function (el) {
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
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    console.log(item, this.transporter);
    // this.state = item;
    this.query = "";
    this.selectedTransporter = this.transporter.filter(
      name => name.name === item
    );
    console.log(this.selectedTransporter);
    this.treport.transporterId = this.selectedTransporter[0].id;
    this.reportsData.getTransporterDetail(this.treport.transporterId, this.pumpId)
      .subscribe(res => {
        console.log(res);
        this.treport = res;
loading.dismiss();
        console.log(this.treport.vehicles);
        for (var i = 0; i < this.treport.vehicles.length; i++) {
          if (this.treport.vehicles[i].blanket == 0) {
            this.nonblanketTotal = this.treport.vehicles[i].vehicle;
            console.log(this.nonblanketTotal);
          } else if (this.treport.vehicles[i].blanket == 1) {
            console.log(this.treport.vehicles[i].vehicle);
            this.blanketTotal = this.treport.vehicles[i].vehicle;
            console.log(this.blanketTotal);
          }
        }
        if (this.treport.transporterFuelBill.billNo == 0) {
          this.fuelHide = false;
          console.log("cash");
        }
        if (this.treport.transporterCashBill.billNo == 0) {
          this.cashHide = false;
          console.log("fuel");
        }
        if (this.blanketTotal == undefined) {
          this.blanketTotal = 0;
        }
        if (this.nonblanketTotal == undefined) {
          this.nonblanketTotal = 0;
        }
        console.log(this.blanketTotal, this.nonblanketTotal);
        this.show = true;
      });

  }

  home() {
    this.appCtrl.getRootNav().setRoot("CreditSalesReportPage");
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }
}
