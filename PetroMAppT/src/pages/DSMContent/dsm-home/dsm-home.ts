import { SalesDataProvider } from './../../../providers/sales-data/sales-data';
import { LoginPage } from './../../ALLContent/login/login';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform, App, AlertController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DSMReports } from '../../../app/DSMReports';
import { DsmReportsProvider } from '../../../providers/dsm-reports/dsm-reports';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
// @IonicPage()
@Component({
  selector: 'page-dsm-home',
  templateUrl: 'dsm-home.html',
})
export class DsmHomePage {
  detailSales=new DSMReports();
  empShift: Boolean = false;
  noshift: Boolean = false;
  credithide: boolean = true;
  loaylityhide: boolean = true;
  RegularHide: boolean = true;
  cashSubmitted:boolean;
  cashtoSubmitted:any;
  public employeeId: number;
  public shiftId: number;
  public pumpId: number;
  public username: string;
  public my_Class = 'style1';
  public nozzleList: any;
  public activeLS: number;
  public activeCS: number;
  public disel: number;
  public petrol: number;
  public name: string;
  public errorMsg;
  public empShiftId: number;
  public shift: any;
  public isTotalizer = 0;
  public dsmReportList: any[] = [];
  public dsmReport:any[]=[];
  public success: any; public error: any;
  public success1: any; public error1: any;
  public success2: any; public error2: any;
  public prodRates: any;
  constructor(
    public navCtrl: NavController,
    public salesData: SalesDataProvider,
    public toast: ToastController,
    public platform: Platform,
    public appCtrl: App,
    public dsmreport: DsmReportsProvider,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public basicData: BasicDataProvider,
    public navParams: NavParams) {
    let backAction = this.platform.registerBackButtonAction(() => {
      // omitted;
      let alert = this.alertCtrl.create({
        // title: 'Confirm purchase',
        message: 'Do you really want to exit?',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',

            handler: () => {
              this.appCtrl.getRootNav().setRoot(DsmHomePage);
            }
          },
          {
            text: 'Ok',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
      backAction();
    }, 1)
  }

  ionViewDidLoad() {
    //this.basicData.Loader();
    this.storage.get('employeeId').then((val) => {
      this.employeeId = val;
    });
    this.storage.get('username').then((val) => {
      this.username = val;
    });
    this.storage.get('name').then((val) => {
      this.name = val;
    });
    this.storage.get('shiftId').then((val) => {
      this.shiftId = val;
    });
    this.storage.get('empShiftId').then((val) => {
      this.empShiftId = val;
    });
    this.storage.get('activeCS').then((val) => {
      this.activeCS = val; console.log(this.activeCS);
      if (this.activeCS == 0) {
        this.credithide = false;
      }
    });
    this.storage.get('activeLS').then((val) => {
      this.activeLS = val; console.log(this.activeLS);
      if (this.activeLS == 0) {
        this.loaylityhide = false;
      }
    });
    this.storage.get('pumpId').then((val) => {
      this.pumpId = val;
      console.log(this.pumpId, this.employeeId);
      this.showNoozle();
      this.showRates();
      this.getPendingCash();
      this.getDSMSale();
    });
  }

  showNoozle() {
    console.log(this.pumpId, this.employeeId, this.isTotalizer);
    this.salesData.getDSMNozzles(this.pumpId, this.employeeId, this.isTotalizer)
      .subscribe(res => {
        this.nozzleList = res;
        console.log(res);
        this.getDSMFuelSale();
        this.success = JSON.stringify(res);
        this.error = JSON.parse(this.success).error;
        console.log(this.error);
      }, err => {

        console.log(err)
        // this.basicData.sendErrorNotification("No nozzle are assign to this shift");
      });
    this.salesData.getDSMNozzles(this.pumpId, this.employeeId, 1)
      .subscribe(res => {
        this.success1 = JSON.stringify(res);
        this.error1 = JSON.parse(this.success1).error;
        console.log(this.error1);
      }, err => {

        console.log(err)
        // this.basicData.sendErrorNotification("No nozzle are assign to this shift");
      });
    console.log(this.pumpId, this.empShiftId, this.employeeId);
    this.salesData.getTotalSales(this.pumpId, this.empShiftId, this.employeeId).subscribe(res => {
      this.success2 = JSON.stringify(res);
      this.error2 = JSON.parse(this.success2).error;
      console.log(this.error2);
    }, err => {
      console.log(err)
    });
  }

  showRates() {
    this.salesData.getProductRates(this.pumpId)
      .subscribe(res => {
        this.prodRates = res;
        // this.disel = this.prodRates[0].currentRate;
        // this.petrol = this.prodRates[1].currentRate
      }, err => {

        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }

  CreditSale() {
    if (this.error == undefined || this.error == null) {
      this.appCtrl.getRootNav().setRoot('CreditSalePage');
    }
    else {
      this.basicData.sendErrorNotification("" + this.error);
    }
  }

  cashSale() {
    if (this.error == undefined || this.error == null) {
      this.appCtrl.getRootNav().setRoot('CashSalePage');
    }
    else {
      this.basicData.sendErrorNotification("" + this.error);
    }
  }

  noozleTotal() {

    if (this.error1 == undefined || this.error1 == null) {
      this.appCtrl.getRootNav().setRoot('NozzleTotalizerPage');
      console.log(this.error1)
    }
    else {
      this.basicData.sendErrorNotification("" + this.error1);
    }
  }

  regularSale() {
    if (this.error2 == undefined || this.error2 == null) {
      this.appCtrl.getRootNav().setRoot('RegularCashPage');
    }
    else {
      this.basicData.sendErrorNotification("" + this.error2);
    }

  }

  logOut() {
    let alert = this.alertCtrl.create({
      message: 'Do you really want to Logout?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.appCtrl.getRootNav().setRoot(LoginPage);
            this.storage.clear();
          }
        }
      ]
    });
    alert.present();

  }

  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  editProfile() {
    this.appCtrl.getRootNav().setRoot('DsmProfilePage');
  }
  popover(myEvent) {
    let popover = this.popoverCtrl.create('DsmPopPage');
    popover.present({
      ev: myEvent
    });
  }
  // load()
  // {
  //   Observable.interval(2000 * 60).subscribe(x => {
  //     this.ionViewDidLoad();
  //   });
  // }
  getDSMFuelSale() {
    this.dsmreport.getDSMFuelSale(this.pumpId, this.employeeId).subscribe(res => {
      console.log(res);
      this.dsmReport=res;
      this.dsmReportList = res;
      console.log(this.dsmReportList);
      // for(var i=0;i<this.nozzleList.length;i++)
      // {
      //   this.dsmReportList=this.dsmReportList.filter(v=>v.productId===this.nozzleList[i].productId)
      //   console.log(this.dsmReportList)
      // }

  
      if(this.dsmReportList.length==1)
      {
        this.my_Class='col12';
      }
      else
      {
        this.my_Class='col6';
      }
    })
  }
  getPendingCash()
  {
    this.salesData.getPendingCash(this.pumpId,this.employeeId,this.empShiftId).subscribe(res=>{
      console.log(res);
      if(res==0)
      {
       this.cashSubmitted=false;
       console.log("khulya");
      }
      else
      {
        this.cashSubmitted=true;
        this.cashtoSubmitted=res;
       console.log( this.cashtoSubmitted);
      }
    })
  }
  getDSMSale()
  {
    this.dsmreport.getDSMSale(this.pumpId, this.employeeId).subscribe(res => {
      console.log(res);
     this.detailSales=res;
     console.log(this.detailSales.creditSold);
     console.log(this.detailSales.loyaltySold);
     console.log(this.detailSales.regularSold);
    });
  }
}