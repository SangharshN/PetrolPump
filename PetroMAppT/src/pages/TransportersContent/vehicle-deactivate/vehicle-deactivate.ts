import { Storage } from '@ionic/storage';
import { TransporterPage } from './../transporter/transporter';
import { Component } from '@angular/core';
import { IonicPage, NavController, App, NavParams, PopoverController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { Vehicle } from '../../../app/vehicle';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';

@IonicPage()
@Component({
  selector: 'page-vehicle-deactivate',
  templateUrl: 'vehicle-deactivate.html',
})
export class VehicleDeactivatePage {
  id: any;
  public activate: Boolean;
  public deactivate: Boolean;
  public view: Boolean;
  vehicleCount: number;
  error1:any;
  public vehicle = new Vehicle;
  public errorMsg: any;
  constructor(public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public platform: Platform,
    public appCtrl: App,
    public loadingCtrl:LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public transData: TransDataProvider,
    public basicData: BasicDataProvider,
    public navParams: NavParams) {
    let backAction = this.platform.registerBackButtonAction(() => {
      console.log("second");
      this.appCtrl.getRootNav().setRoot('VehicleListPage');
      backAction();
    }, 1)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehicleDeactivatePage');
    this.id = this.navParams.get('param1');
    console.log(this.id);
    this.showVehicle(this.id);
    this.storage.get('vehicleCount').then((val) => {
      this.vehicleCount = val;
    });
  }
  showVehicle(id) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.transData.getVehicle(id)
      .subscribe(response => {
        console.log(response);
    loading.dismiss();
        var Suc = JSON.stringify(response);
        this.vehicle = JSON.parse(Suc).vehicle;
        this.error1 = JSON.parse(Suc).error;
        console.log(this.error1);
   
          console.log(this.vehicle);
          if (this.vehicle.active == 0) {
            this.activate = true;
            this.deactivate = false;
            console.log("hii");
          }
          else {
            this.deactivate = true;
            this.activate = false;
            console.log("no");
          }
          if (this.vehicle.blanket == 1) {
            console.log("no");
            this.view = true;
          }
       
      }, err => {
        this.errorMsg = err;
        console.log(this.errorMsg);
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });

  }
  deactVehicle(id) {
    console.log("hi");
    if(this.error1=1)
    {
      this.basicData.sendErrorNotification("There is pending request for this vehicle you cannot deactivate it");
    }
    else
    {
    {
      let alert = this.alertCtrl.create({
        // title: 'Confirm purchase',
        message: 'Do you really want to Deactivate?',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Ok',
            handler: () => {

              this.transData.getVehicleDeactivate(id)
                .subscribe(res => {
                  console.log(res);
                  var Sucess = JSON.stringify(res);
                  var error = JSON.parse(Sucess).error;
                  console.log(error);
                  if (error == undefined || error == null) {
                    this.basicData.sendSuccessNotification("Deactivated Vehicle successfully");
                    this.appCtrl.getRootNav().setRoot('VehicleListPage', {
                      id: 'deact'
                    });
                  }
                  else {
                    this.basicData.sendErrorNotification(error);
                  }

                }, err => {
                  this.errorMsg = err;
                  console.log(this.errorMsg);
                  this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
                })
            }
          }
        ]
      });
      alert.present();

    }
  }
  }
  actVehicle(id) {
    let alert = this.alertCtrl.create({
      // title: 'Confirm purchase',
      message: 'Do you really want to Activate?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log("hi");
            this.transData.getVehicleActivate(id)
              .subscribe(res => {
                console.log(res);
                var Sucess = JSON.stringify(res);
                var error = JSON.parse(Sucess).error;
                console.log(error);
                if (error == undefined || error == null) {
                  this.basicData.sendSuccessNotification("Activated Vehicle successfully");
                  this.appCtrl.getRootNav().setRoot('VehicleListPage');
                }
                else {
                  this.basicData.sendErrorNotification(error);
                }

              }, err => {
                this.errorMsg = err;
                console.log(this.errorMsg);
                this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
              })
          }
        }
      ]
    });
    alert.present();

  }

  editPage(id) {
    if (this.error1=0) {
      this.appCtrl.getRootNav().setRoot('VehicleEditPage', {
        id: id
      });
    }
    else
    {
this.basicData.sendErrorNotification("There is pending request for this vehicle you cannot edit it");
    }
   
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewDidLoad();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  home() {
    this.appCtrl.getRootNav().setRoot(TransporterPage);
  }
  menuClick() {
    this.basicData.checkTransCount();
  }
}
