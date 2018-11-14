import { Storage } from '@ionic/storage';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, PopoverController, Platform } from 'ionic-angular';
import { PumpDataProvider } from '../../../providers/pump-data/pump-data';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';




/**
 * Generated class for the PumpEmployeeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pump-employee-details',
  templateUrl: 'pump-employee-details.html',
})
export class PumpEmployeeDetailsPage {
  info;
  public activate: Boolean;
  userType:number;
  public deactivate: Boolean;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public pumpData: PumpDataProvider,
    public appCtrl: App,
    public storage:Storage,
    public popoverCtrl: PopoverController,
    public platform: Platform,
    public basicData: BasicDataProvider,
    public alertCtrl: AlertController) {
    this.info = this.navParams.get('param1');
    console.log(this.info);
    if (this.info.active == 0) {
      this.activate = true;
      this.deactivate = false;
    }
    else {
      this.deactivate = true;
      this.activate = false;
    }
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot("PumpEmployeePage");
      backAction();
    }, 1)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PumpEmployeeDetailsPage');
    this.storage.get('userType').then((val) => {
      this.userType = val;
    });
  }
  deactEmployee(id) {
    let alert = this.alertCtrl.create({
      message: 'Do you really want to Deactivate?',
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
            this.pumpData.changeStatus(id,this.userType).subscribe(res => {
              var Sucess = JSON.stringify(res);
              var error = JSON.parse(Sucess).error;
              console.log(error);
              if (error == undefined || error == null) {
                this.basicData.sendSuccessNotification("Employee Deactivated Successfully");
                this.appCtrl.getRootNav().setRoot('PumpEmployeePage', {
                  id: 'deact'
                });
              }
              else {
                this.basicData.sendErrorNotification(error);
              }
              
             
            }, err => {
              this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
            })
          }
        }
      ]
    });
    alert.present();

  }
  actEmployee(id) {
    let alert = this.alertCtrl.create({
      // title: 'Confirm purchase',
      message: 'Do you really want to Activate?',
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
            this.pumpData.changeStatus(id,this.userType).subscribe(res => {
              var Sucess = JSON.stringify(res);
              var error = JSON.parse(Sucess).error;
              console.log(error);
              if (error == undefined || error == null) {
                this.basicData.sendSuccessNotification("Employee Activated Successfully");
                this.appCtrl.getRootNav().setRoot('PumpEmployeePage');
              }
              else {
                this.basicData.sendErrorNotification(error);
              }
              
            }, err => {
              this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
            })

          }
        }
      ]
    });
    alert.present();

  }
  home() {
    this.appCtrl.getRootNav().setRoot('PumpEmployeePage');
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }
  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}
