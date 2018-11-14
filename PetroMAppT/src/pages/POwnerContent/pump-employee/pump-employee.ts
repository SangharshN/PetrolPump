import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, PopoverController, Platform, LoadingController } from 'ionic-angular';
import { POwnerHomePage } from '../p-owner-home/p-owner-home';
import { PumpDataProvider } from '../../../providers/pump-data/pump-data';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';

/**
 * Generated class for the PumpEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pump-employee',
  templateUrl: 'pump-employee.html',
})
export class PumpEmployeePage {
  public pumpId: number;
  pumpList: any[] = [];
  public categories = "active";
  public pumpListDeact = [];
  public show: boolean = false;
  public hide: boolean = true;
  public view: boolean = true;
  public nonview: boolean = false;
  public active: number;
  public username:string;
  public deactive: number;
  constructor(public navCtrl: NavController,
    public appCtrl: App,
    public loadingCtrl:LoadingController,
    public storage: Storage,
    public laodingCtrl:LoadingController,
    public basicData:BasicDataProvider,
    public platform: Platform,
    public popoverCtrl: PopoverController,
    public navParams: NavParams,
    public pumpData: PumpDataProvider) {
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot(POwnerHomePage);
      backAction();
    }, 1)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PumpEmployeePage');
    this.storage.get('pumpId').then((val) => {
      this.pumpId = val;
    
    });
    this.storage.get('username').then((val) => {
      this.username = val;
      this.getEmployeeList();
    });
    let id = this.navParams.get('id');
    if (id == "deact") {
      this.categories = "deactive";
    }
    else if (id == undefined || id == null) {
      this.categories = "active";
    }
  }

  PumpEmployeeDetailsPage(event) {
    console.log(event);
    this.appCtrl.getRootNav().setRoot('PumpEmployeeDetailsPage', {
      param1: event
    });
  }
  getEmployeeList() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.pumpData.getEmployeeList(this.pumpId,this.username).subscribe(res => {
      console.log(res);
      loading.dismiss();
      this.pumpList = res;
      this.pumpList = res.filter(v => v.active == 1);
      this.pumpListDeact = res.filter(v => v.active == 0);
      console.log(this.pumpList);
      this.active = this.pumpList.length;
      this.deactive = this.pumpListDeact.length;
      if (this.pumpList.length == 0) {
        console.log("hi");
        this.show = true;
        this.hide = false;
      }
      if (this.pumpListDeact.length == 0) {
        console.log("else");
        console.log(this.pumpList);
        this.nonview = true;
        this.view = false;
      }
    })
  }
  home() {
    this.appCtrl.getRootNav().setRoot(POwnerHomePage);
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
