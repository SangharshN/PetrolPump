import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage,App, NavController, NavParams, ViewController } from 'ionic-angular';
import { POwnerHomePage } from '../p-owner-home/p-owner-home';
import { Storage } from '@ionic/storage';
import { Reports } from '../../../app/reports';
import { PumpDataProvider } from '../../../providers/pump-data/pump-data';
import { LoginPage } from '../../ALLContent/login/login';
import { PManagerHomePage } from '../../PMAnagerContent/p-manager-home/p-manager-home';
/**
 * Generated class for the PumppopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pumppop',
  templateUrl: 'pumppop.html',
})
export class PumppopPage {
  public username: any;
  pumpList=new Reports();
  public userType: any;
  public activeCS:number;
  public empCount:number;
  public transCount:number;
  public activeLS:number;
  public name:string;
  pumpId:number;
  public hide:boolean=true;
  public activeCShide:boolean=true;
  public activeLShide:boolean=true;
  constructor(public navCtrl: NavController,
              public storage: Storage,
              public alertCtrl:AlertController,
              public navParams: NavParams,
              public pumpData:PumpDataProvider,
              public appCtrl:App,
              public viewCtrl: ViewController) {
  }
ionViewDidLoad() {
    this.storage.get('username').then((val) => {
      this.username = val;
    });
    this.storage.get('name').then((val) => {
      this.name = val;
    });
    this.storage.get('empCount').then((val) => {
      this.empCount = val;
    });
    this.storage.get('transCount').then((val) => {
      this.transCount = val;
    });
    this.storage.get('activeCS').then((val) => {
      this.activeCS = val;
      if(this.activeCS==0)
      {
this.activeCShide==false;
      }
    });
    this.storage.get('pumpId').then((val) => {
      this.pumpId = val;
      // this.pumpData.getPumpCt(this.pumpId).subscribe(res=>{
      //   console.log(res);
      //   this.pumpList=res;
      // })
    });
    this.storage.get('activeLS').then((val) => {
      this.activeLS = val;
      if(this.activeLS==0)
      {
this.activeLShide==false;
      }
    });
    this.storage.get('userType').then((val) => {
      this.userType = val;
      if(this.userType==11)
      {
        this.hide=false;
      }
    });
  }
 logout() {
  let alert = this.alertCtrl.create({
    message: 'Do you really want to Logout?',
    enableBackdropDismiss : false,
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
  home() {
    if(this.userType==11)
      {
     this.appCtrl.getRootNav().setRoot(POwnerHomePage)
     this.viewCtrl.dismiss();
      }
      else if(this.userType==12)
      {
     this.appCtrl.getRootNav().setRoot(PManagerHomePage)
     this.viewCtrl.dismiss();
      }
  }
  cashRequest() {
 this.appCtrl.getRootNav().setRoot('CashDispensePage');
    this.viewCtrl.dismiss();

  }
  productRates() {
 this.appCtrl.getRootNav().setRoot('ProductRatePage');
    this.viewCtrl.dismiss();
  }
  paymentReminder() {
 this.appCtrl.getRootNav().setRoot('PaymentRequestPage');
    this.viewCtrl.dismiss();
  }
  compliance() {
 this.appCtrl.getRootNav().setRoot('ComplianceAddPage');
    this.viewCtrl.dismiss();
  }
//   leaveApprove() {
//  this.appCtrl.getRootNav().setRoot('LeaveListPage');
//     this.viewCtrl.dismiss();
//   }
  report() {
 this.appCtrl.getRootNav().setRoot('PumpReportPage');
    this.viewCtrl.dismiss();
  }
  editProfile()
  {
    if(this.userType==11)
    {
   this.appCtrl.getRootNav().setRoot('POwnerProfilePage')
   this.viewCtrl.dismiss();
    }
    else if(this.userType==12)
    {
   this.appCtrl.getRootNav().setRoot('PumpProfilePage')
   this.viewCtrl.dismiss();
    }
  }
  tankDips()
  {
 this.appCtrl.getRootNav().setRoot('TankDipsPage');
 this.viewCtrl.dismiss();
  }
  ViewReport()
  {
 this.appCtrl.getRootNav().setRoot('SmsReportPage');
 this.viewCtrl.dismiss();
  }
  changePassword()
  {
 this.appCtrl.getRootNav().setRoot('ChangePasswordPage');
 this.viewCtrl.dismiss();
  }
  PumpEmployeePage()
  {
 this.appCtrl.getRootNav().setRoot('PumpEmployeePage');
 this.viewCtrl.dismiss();
  }
  PumpTransportersListPage()
  {
 this.appCtrl.getRootNav().setRoot('PumpTransportersListPage');
 this.viewCtrl.dismiss();
  }
}
