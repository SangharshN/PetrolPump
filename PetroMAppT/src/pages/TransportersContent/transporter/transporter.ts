import { MenuController, PopoverController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, App, NavParams, Platform, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { transporterReport } from '../../../app/transporterReport';
import { TransporterReportProvider } from '../../../providers/transporter-report/transporter-report';
import { SalesDataProvider } from '../../../providers/sales-data/sales-data';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';


/**
 * Generated class for the TransporterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-transporter',
  templateUrl: 'transporter.html',
})
export class TransporterPage {
  creditLimit = new transporterReport;
  consumed = new transporterReport;
  payment = new transporterReport;
  pending = new transporterReport;

  creditLimitList: any[] = [];
  consumedList: any[] = [];
  paymentList: any[] = [];

  public pumpId: number;
  public requestPumpId: number;
  public creditPumpId: number;
  public paymentPumpId: number;

  public title = '';
  public userType: any;
  public transTotal: any;
  public transporterId: any;
  public transRequestList: any;
  public totalRequest: number;
  public pendingRequest: number;
  public vehicles: any;
  public drivers: any;
  public name: string;
  pumpList: any;
  shownGroup = null;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    public menuCtrl: MenuController,
    public storage: Storage, public alertCtrl: AlertController,
    public platform: Platform,
    public appCtrl: App,
    public transReport: TransporterReportProvider,
    public saleData: SalesDataProvider,
    public basicData: BasicDataProvider,
    public transData: TransDataProvider,
    public popoverCtrl: PopoverController) {
    let backAction = this.platform.registerBackButtonAction(() => {
      let alert = this.alertCtrl.create({
        // title: 'Confirm purchase',
        message: 'Do you really want to exit?',
        enableBackdropDismiss: false,
        buttons: [
          {

            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.appCtrl.getRootNav().setRoot(TransporterPage);
            }
          },
          {
            text: 'Ok',
            handler: () => {
              platform.exitApp();
            }
          }
        ]
      });
      alert.present();
      backAction();
    }, 1)
    this.pumpId = 0;
    this.creditPumpId = 0;
    this.paymentPumpId = 0;
    this.requestPumpId = 0;
  }

  ionViewDidLoad() {
    this.storage.get('userType').then((val) => {
      this.userType = val;
      console.log("userTypeload")
      if (this.userType == '21')
        this.title = "Transporter";
      else if (this.userType == '22')
        this.title = "Manager";
    });
    this.storage.get('transporterId').then((val) => {
      this.transporterId = val;
      this.showRequest();
      this.showPumps()
      this.getPumpwiseConsumed();
      this.getPumpWiseCreditLimit();
      this.getPumpWisePaymentReports();
      this.getPumpwisePendingRequest();
      this.transData.getTransTotal(this.transporterId).subscribe(
        res => {
          this.transTotal = res;
          this.totalRequest = this.transTotal.totalRequests;
          this.pendingRequest = this.transTotal.totalPending;

        });
    }, err => {
      this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
    });

    this.storage.get('name').then((val) => {
      this.name = val;
    })
  }
  totalRequestSend() {
    this.appCtrl.getRootNav().setRoot('RequestListPage')
  }
  totalPendingSend() {
    this.appCtrl.getRootNav().setRoot('RequestListPage');
  }

  popover(myEvent) {
    let popover = this.popoverCtrl.create('TranspopPage');
    popover.present({
      ev: myEvent
    });
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }
  isGroupShown(group) {
    return this.shownGroup === group;
  }

  addRequest() {
    if (this.vehicles.length == 0) {
      this.basicData.sendErrorNotification("Sorry no  Vehicles found!!!")
    }
    else if (this.drivers.length == 0) {
      this.basicData.sendErrorNotification("Sorry no  Drivers found!!!")
    }
    else {
      this.appCtrl.getRootNav().setRoot('RequestRaisePage');
    }

  }
  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  showRequest() {
    this.transData.getTransRequests(this.transporterId).subscribe(
      res => {
        this.transRequestList = res;
        this.transRequestList = res.filter(v => v.status !== 4);
        this.transRequestList = this.transRequestList.filter(v => v.status !== 3);
        this.saleData.getVehicles(this.transporterId)
          .subscribe(res => {
            this.vehicles = res.filter(v => v.active == 1);
            // for (var i = 0; i < this.transRequestList.length; i++) {
            //   this.vehicles = this.vehicles.filter(vehicle => vehicle.regNo != this.transRequestList[i].regNo);
            // }
          });
        this.transData.getTDrivers(this.transporterId)
          .subscribe(res => {
            this.drivers = res.filter(v => v.active == 1);
            // for (var i = 0; i < this.transRequestList.length; i++) {
            //   this.drivers = this.drivers.filter(vehicle => vehicle.id != this.transRequestList[i].tdriverId);
            // }
          }, err => {

            this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
          });

      }, err => {
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }

  showPumps() {
    this.transData.getPumpList(this.transporterId)
      .subscribe(res => {
        this.pumpList = res;
        console.log(this.pumpList);

      }, err => {
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }
  selectPump(pumpId) {
    console.log(pumpId);
    this.pumpId = pumpId;
    this.getPumpwiseConsumed();
  }
  selectPumpCredit(pumpId) {
    console.log(pumpId);
    this.creditPumpId = pumpId;
    this.getPumpWiseCreditLimit();
  }
  selectPumpPayment(pumpId) {
    console.log(pumpId);
    this.paymentPumpId = pumpId;
    this.getPumpWiseCreditLimit();
  }
  selectPumpRequest(pumpId) {
    console.log(pumpId);
    this.requestPumpId = pumpId;
    this.getPumpwisePendingRequest();
  }

  getPumpWiseCreditLimit() {
    this.transReport.getPumpWiseCreditLimit(this.transporterId, this.creditPumpId).subscribe(res => {
      console.log(res);
      this.creditLimit = res;

    })
  }
  getPumpwiseConsumed() {
    this.transReport.getPumpwiseConsumed(this.transporterId, this.pumpId).subscribe(res => {
      console.log(res);
      this.consumed = res;
      this.consumedList = res.sales;
    })
  }
  getPumpWisePaymentReports() {
    this.transReport.getPumpWisePaymentReports(this.transporterId, this.paymentPumpId).subscribe(res => {
      console.log(res);
      this.payment = res;
      this.paymentList = res.sales;
    })
  }

  getPumpwisePendingRequest() {
    this.transReport.getPumpwisePendingRequest(this.transporterId, this.requestPumpId).subscribe(res => {
      console.log(res);
      this.pending = res;

    })
  }
  openMenu() {
    this.menuCtrl.open();
  }
  home() {
    this.appCtrl.getRootNav().setRoot('TransporterPage');
  }
  RequestListPage() {
    this.appCtrl.getRootNav().setRoot('RequestListPage');
  }
  menuClick() {
    this.basicData.checkTransCount();
  }
}
