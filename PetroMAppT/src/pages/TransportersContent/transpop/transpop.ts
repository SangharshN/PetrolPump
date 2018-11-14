
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, ViewController, App, Platform } from 'ionic-angular';
import { TransporterPage } from '../transporter/transporter';

import { Storage } from '@ionic/storage';
import { Transporter } from '../../../app/transporter';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
import { LoginPage } from '../../ALLContent/login/login';

@IonicPage()
@Component({
  selector: 'page-transpop',
  templateUrl: 'transpop.html',
})
export class TranspopPage {
  public name: string;
  public userType: number;
  pumpList=new Transporter();
  public transporterId:number;
  public hide: boolean = true;
  driverCount: number;
  mgrCount: number;
  pumpCount: number;
  reqCount: number;
  vehicleCount: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public basicData: BasicDataProvider,
    public storage: Storage,
    public platform:Platform,
    public transData:TransDataProvider,
    public appCtrl: App,
    public viewCtrl: ViewController) {
      this.platform.ready().then(() => {
        console.log("PLATFORM READY IN PROVIDER")
    })
  }

  ionViewDidLoad() {
    this.storage.get('name').then((val) => {
      this.name = val;
    });
    this.storage.get('driverCount').then((val) => {
      this.driverCount = val;
    });
    this.storage.get('mgrCount').then((val) => {
      this.mgrCount = val;
    });
    this.storage.get('pumpCount').then((val) => {
      this.pumpCount = val;
    });
    this.storage.get('reqCount').then((val) => {
      this.reqCount = val;
    }); this.storage.get('vehicleCount').then((val) => {
      this.vehicleCount = val;
    });
    this.storage.get('transporterId').then((val) => {
      this.transporterId = val;
    });
    
    this.storage.get('userType').then((val) => {
      this.userType = val;
      if (this.userType == 22) {
        this.hide = false;
      }
      if (this.userType == 21) {

      }

    });
  }
  home() {
    this.appCtrl.getRootNav().setRoot(TransporterPage)
    this.viewCtrl.dismiss();
  }
  request() {
    this.appCtrl.getRootNav().setRoot('RequestListPage');
    this.viewCtrl.dismiss();

  }
  paybill() {
    this.appCtrl.getRootNav().setRoot('PayBillPage');
    this.viewCtrl.dismiss();
  }
  vehicle() {
    this.appCtrl.getRootNav().setRoot('VehicleListPage');
    this.viewCtrl.dismiss();
  }
  manager() {
    this.appCtrl.getRootNav().setRoot('ManagerListPage');
    this.viewCtrl.dismiss();
  }
  driver() {
    this.appCtrl.getRootNav().setRoot('TDriverListPage');
    this.viewCtrl.dismiss();
  }
  report() {
    this.appCtrl.getRootNav().setRoot('TransporterReportPage');
    this.viewCtrl.dismiss();
  }
  logout() {
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
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    alert.present();

  }
  editProfile() {
    if (this.userType == 22) {
      console.log(this.userType)
      this.appCtrl.getRootNav().setRoot('TManagerProfilePage');
      this.viewCtrl.dismiss();
    }
    if (this.userType == 21) {
      console.log(this.userType)
      this.appCtrl.getRootNav().setRoot('TransporterProfilePage');
      this.viewCtrl.dismiss();
    }

  }
  paymentEntry() {
    this.appCtrl.getRootNav().setRoot('PaymentEntryPage');
    this.viewCtrl.dismiss();
  }

  PumpListPage() {
    this.appCtrl.getRootNav().setRoot('PumpListPage');
    this.viewCtrl.dismiss();
  }

  changePassword() {
    this.appCtrl.getRootNav().setRoot('ChangePasswordPage');
    this.viewCtrl.dismiss();
  }
  
}
