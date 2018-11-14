import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, PopoverController, LoadingController } from 'ionic-angular';
import { POwnerHomePage } from '../p-owner-home/p-owner-home';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';

/**
 * Generated class for the PumpTransportersListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pump-transporters-list',
  templateUrl: 'pump-transporters-list.html',
})
export class PumpTransportersListPage {
  public pumpId: number;
  pumpList: any[] = [];
  nondefaulterList: any[] = [];
  defaulterList: any[] = [];
  activePumpList: any[] = [];
  deactivePumpList: any[] = [];
  public categories = "active";
  public activeCount: number;
  public deactiveCount: number;
  public defaulterCount: number;
  public pumpListDeact = [];
  public show: boolean = false;
  public hide: boolean = true;
  public view: boolean = true;
  public nonview: boolean = false;
  public def: boolean = true;
  public nondef: boolean = false;
  public active: number;
  public deactive: number;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public appCtrl: App,
    public basicData:BasicDataProvider,
    public storage: Storage,
    public transData: TransDataProvider,
    public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    this.storage.get('pumpId').then((val) => {
      this.pumpId = val;
      this.showPumpList();
    });
    console.log('ionViewDidLoad PumpListPage');
    let id = this.navParams.get('id');
    if (id == "deact") {
      this.categories = "deactive";
    }
    else if (id == "default") {
      this.categories = "defaulter";
    }
    else if (id == undefined || id == null) {
      this.categories = "active";
    }
  }
  home() {
    this.appCtrl.getRootNav().setRoot(POwnerHomePage);
  }

  showPumpList() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.transData.getTransporters(this.pumpId).subscribe(res => {
      console.log(res);
      loading.dismiss();
      this.pumpList = res;
      console.log(this.pumpList);
      this.nondefaulterList = this.pumpList.filter(v => v.defaulter == 0);
      this.defaulterList = this.pumpList.filter(v => v.defaulter == 1);
      this.activePumpList = this.nondefaulterList.filter(v => v.active == 1);
      this.deactivePumpList = this.nondefaulterList.filter(v => v.active == 0);
      this.activeCount = this.activePumpList.length;
      this.deactiveCount = this.deactivePumpList.length;
      this.defaulterCount = this.defaulterList.length;
      if (this.activePumpList.length == 0) {
        console.log("hi");
        this.show = true;
        this.hide = false;
      }
      if (this.deactivePumpList.length == 0) {
        console.log("else");
        console.log(this.pumpList);
        this.nonview = true;
        this.view = false;
      }
      if (this.defaulterList.length == 0) {
        console.log("else");
        console.log(this.pumpList);
        this.def = false;
        this.nondef = true;
      }
    })
  }
  PumpTransporterDetailsPage(id) {
    console.log(id);
    this.appCtrl.getRootNav().setRoot("PumpTransporterDetailsPage", {
      param: id
    });
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
