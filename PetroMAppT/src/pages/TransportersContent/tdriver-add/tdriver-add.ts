import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController, Platform, App, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TDriver } from '../../../app/tdriver';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';


@IonicPage()
@Component({
  selector: 'page-tdriver-add',
  templateUrl: 'tdriver-add.html',
})
export class TdriverAddPage {
  user: FormGroup;
  public tdriver = new TDriver;
  public transporterId: any;
  public username: any;
  public driverCount: any;
  public success: any;
  public errorMsg: any;
  public addDriverSuccess: any;
  constructor(public navCtrl: NavController,
    public transData: TransDataProvider,
    public popoverCtrl: PopoverController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public basicData: BasicDataProvider,
    public platform: Platform,
    public appCtrl: App,
    public toast: ToastController,
    public navParams: NavParams) {
    this.tdriver.name = '';

    this.user = new FormGroup({
      name: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      mobileNo: new FormControl({ value: '' }, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
    });
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot('TDriverListPage');
      backAction();
    }, 1)
  }

  ionViewDidLoad() {
    //this.basicData.Loader();
    this.storage.get('transporterId').then((val) => {
      this.transporterId = val;
    });
    this.storage.get('username').then((val) => {
      this.username = val;
    });
    this.storage.get('driverCount').then((val) => {
      this.driverCount = val;
    });
  }

  addDriver() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.user.valid) {
      this.tdriver.updated_by = this.username;
      this.tdriver.transporterId = this.transporterId;
      this.transData.addTDriver(this.tdriver)
        .subscribe(status => {
          this.success = JSON.stringify(status);
          var sample = JSON.parse(this.success).error;
          if (sample == undefined || sample == null) {
            this.appCtrl.getRootNav().setRoot('TDriverListPage');
            this.addDriverSuccess = JSON.stringify(status);
            this.basicData.sendSuccessNotification("Driver Added Successfully");
            this.appCtrl.getRootNav().setRoot('TDriverListPage')
            loading.dismiss();
          }
          else {
            this.basicData.sendErrorNotification("" + JSON.parse(this.success).error);
            loading.dismiss();
          }
        }, err => {
          this.errorMsg = err;
          this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
          loading.dismiss();
        });
    }
    else {
      this.user.controls['name'].markAsTouched();
      this.user.controls['mobileNo'].markAsTouched();
      loading.dismiss();
    }

  }
  doRefresh(refresher) {
    this.tdriver.name = '';
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  menuClick() {
    this.basicData.checkTransCount();
  }
  home(){
    this.appCtrl.getRootNav().setRoot('TDriverListPage');
  }
}
