import { PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { SmsDataProvider } from '../../../providers/sms-data/sms-data';
import { POwnerHomePage } from '../../POwnerContent/p-owner-home/p-owner-home';
import { PManagerHomePage } from '../../PMAnagerContent/p-manager-home/p-manager-home';


/**
 * Generated class for the SmsReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sms-report',
  templateUrl: 'sms-report.html',
})
export class SmsReportPage {
  username = 'sawasdee12345spa';
  password = 123456;
  name: any;
  public userType: number;
  success: any;
  myStr: any;
  error: any;
  constructor(public navCtrl: NavController, public basicData: BasicDataProvider, public popoverCtrl: PopoverController,
    public appCtrl: App, public navParams: NavParams, public service: SmsDataProvider,
    public dataService: SmsDataProvider, public storage: Storage) {
  }

  ionViewDidLoad() {
    //this.basicData.Loader();
    console.log('ionViewDidLoad Sms Report Page');
    this.getUserInfo();
    this.dataService.checkUser(this.username, this.password).then(data => {
      this.success = JSON.stringify(data);
      console.log(this.success)
      this.myStr = this.success;
      this.myStr = this.myStr.replace('Success#Promotional:0|Transactoinal:', '')
      console.log(this.myStr);

    }, err => {
      console.log("ERROR : " + err);

    })
    this.storage.get('userType').then((val) => {
      this.userType = val;
    });
  }


  getUserInfo() {
    this.storage.get('name').then((val) => {
      this.name = val;
    });
  }
  home() {
    if (this.userType == 11) {
      this.appCtrl.getRootNav().setRoot(POwnerHomePage)
    }
    else if (this.userType == 12) {
      this.appCtrl.getRootNav().setRoot(PManagerHomePage)
    }
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }
}
