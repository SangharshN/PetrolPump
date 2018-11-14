import { DsmHomePage } from './../dsm-home/dsm-home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { LoginPage } from '../../ALLContent/login/login';
/**
 * Generated class for the DsmPopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dsm-pop',
  templateUrl: 'dsm-pop.html',
})
export class DsmPopPage {
public username:any;
public userType:number;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public basicData:BasicDataProvider,
     public alertCtrl:AlertController,
     public viewCtrl:ViewController,
     public appCtrl:App,
    public storage:Storage) {
  }
  ionViewDidLoad() {    

    this.storage.get('username').then((val) => {
      this.username = val;
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
  editProfile()
  {
    console.log('hii')
  this.appCtrl.getRootNav().setRoot('DsmProfilePage');
  this.viewCtrl.dismiss();
  }
  home()
  {
 this.appCtrl.getRootNav().setRoot(DsmHomePage);
 this.viewCtrl.dismiss();
  }

  report()
  {
    this.viewCtrl.dismiss();
  }
  changePassword()
  {
 this.appCtrl.getRootNav().setRoot('ChangePasswordPage');
 this.viewCtrl.dismiss();
  }
}
