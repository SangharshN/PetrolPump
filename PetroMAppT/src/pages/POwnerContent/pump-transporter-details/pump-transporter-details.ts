import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
import { Transporter } from '../../../app/transporter';
import { PumpDataProvider } from '../../../providers/pump-data/pump-data';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';

/**
 * Generated class for the PumpTransporterDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pump-transporter-details',
  templateUrl: 'pump-transporter-details.html',
})
export class PumpTransporterDetailsPage {
  public transporterId: any;
  transDetail = new Transporter();
  pumpId: number;
  transCount: number;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public transData: TransDataProvider,
    public alertCtrl: AlertController,
    public basicData: BasicDataProvider,
    public loadingCtrl:LoadingController,
    public appCtrl: App,
    public pumpData: PumpDataProvider,
    public storage: Storage) {
    this.transporterId = this.navParams.get('param');
    console.log(this.transporterId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PumpTransporterDetailsPage');
    this.storage.get('pumpId').then((val) => {
      this.pumpId = val;
      this.showPumpList();
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
            this.pumpData.changeTranspStatus(this.pumpId, id).subscribe(res => {
              this.basicData.sendSuccessNotification("Transporter Deactivated Successfully");
              this.appCtrl.getRootNav().setRoot('PumpTransportersListPage', {
                id: 'deact'
              });
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
            this.pumpData.changeTranspStatus(this.pumpId, id).subscribe(res => {
              this.basicData.sendSuccessNotification("Transporter Activated Successfully");
              this.appCtrl.getRootNav().setRoot('PumpTransportersListPage');
            }, err => {
              this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
            })

          }
        }
      ]
    });
    alert.present();

  }
  defaultEmployee(id) {
    let alert = this.alertCtrl.create({
      message: 'Do you really want to mark as Defaulter?',
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
            this.pumpData.changeTranspDefaulterStatus(this.pumpId, id).subscribe(res => {
              this.basicData.sendSuccessNotification("Transporter marked as defaulter Successfully");
              this.appCtrl.getRootNav().setRoot('PumpTransportersListPage', {
                id: 'default'
              });
            }, err => {
              this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
            })
          }
        }
      ]
    });
    alert.present();

  }
  removeEmployee(id) {
    console.log(id);
    let alert = this.alertCtrl.create({
      message: 'Do you really want to remove Defaulter?',
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
            this.pumpData.changeTranspDefaulterStatus(this.pumpId, id).subscribe(res => {
              this.basicData.sendSuccessNotification("Transporter removed from defaulter Successfully");
              this.appCtrl.getRootNav().setRoot('PumpTransportersListPage');
            }, err => {
              this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
            })
          }
        }
      ]
    });
    alert.present();

  }
  showPumpList() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.transData.getPumpTransporter(this.pumpId, this.transporterId).subscribe(res => {
      console.log(res);
      loading.dismiss();
      this.transDetail = res;
    })
  }
  home() {
    this.appCtrl.getRootNav().setRoot('PumpTransportersListPage');
  }

  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }
}
