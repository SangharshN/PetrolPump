import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController, Platform, App, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TDriver } from '../../../app/tdriver';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';

@IonicPage()
@Component({
  selector: 'page-tdriver-edit',
  templateUrl: 'tdriver-edit.html',
})
export class TdriverEditPage {
  user: FormGroup;
  public tdriver = new TDriver;
  id: any;
  public EditSuccess: any;
  public tdriverDetail: any;
  public errorMsg: any;
  constructor(public navCtrl: NavController,
    public transData: TransDataProvider,
    public storage: Storage,
    public appCtrl: App,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    public toast: ToastController,
    public basicData: BasicDataProvider,
    public platform: Platform,
    public navParams: NavParams) {
    this.id = navParams.get('param1');
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
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.transData.getTDriver(this.id).subscribe(res => {
      this.tdriver = res;
      loading.dismiss();
      var Suc = JSON.stringify(res);
      this.tdriver= JSON.parse(Suc).tdriver;
    }, err => {
      this.errorMsg = err;
      this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
    });

  }
  EditDriver(id) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.transData.updateTDriver(this.tdriver, this.id).subscribe(res => {
      this.EditSuccess = res;
      this.basicData.sendSuccessNotification("Driver updated successfully");
      this.appCtrl.getRootNav().setRoot('TDriverListPage');
      loading.dismiss();
    }, err => {
      this.errorMsg = err;
      this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      loading.dismiss();
    });

  }

  menuClick() {
    this.basicData.checkTransCount();
  }
  home()
  {
    this.appCtrl.getRootNav().setRoot('TDriverListPage');
  }
}
