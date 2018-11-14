
import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, PopoverController, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TransporterPage } from '../transporter/transporter';
import { Manager } from '../../../app/manager';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
/**
 * Generated class for the ManagerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manager-list',
  templateUrl: 'manager-list.html',
})
export class ManagerListPage {
  public pumpId;
  public transporterId;
  public manager = new Manager;
  public acti: string;
  public managers = [];
  public deacmanagers = [];
  public errorMsg;
  public active: number;
  public deactive: number;
  public pagingEnabled: boolean = true;
  public show: boolean = false;
  public hide: boolean = false;
  public categories = "active";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public popoverCtrl: PopoverController,
    public storage: Storage,
    public appCtrl: App,
    public platform: Platform,
    public basicData: BasicDataProvider,
    public transData: TransDataProvider) {
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot(TransporterPage);
      backAction();
    }, 1)
  }

  ionViewDidLoad() {
    //this.basicData.Loader();
    this.acti = this.navParams.get('param1');
    if (this.acti == "deac") {
      this.categories = "deactive";
    }
    else if (this.acti == undefined || this.acti == null) {
      this.categories = "active";
    }
    this.storage.get('transporterId').then((val) => {
      this.transporterId = val;
      this.showManagers();


    }, err => {
      this.errorMsg = err;
      this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
    });
  }

  showManagers() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.transData.getManagers(this.transporterId)
      .subscribe(res => {
        loading.dismiss();
        this.managers = res.filter(v => v.active == 1);
        this.deacmanagers = res.filter(v => v.active == 0);
        this.active = this.managers.length;
        this.deactive = this.deacmanagers.length;
        console.log(this.active)
        if (this.managers.length == 0) {
          this.show = true;
          this.hide = false;
        }
        if (this.deacmanagers.length == 0) {
          this.show = false;
          this.hide = true;
        }
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }

  addManager() {
    this.appCtrl.getRootNav().setRoot('ManagerAddPage');
  }

  editManager(id) {
    this.appCtrl.getRootNav().setRoot('ManagerEditPage', {
      param1: id
    });
  }
  viewManager(id) {
    this.appCtrl.getRootNav().setRoot('ManagerDeactivatePage', {
      param1: id
    });
  }

  popover(myEvent) {
    let popover = this.popoverCtrl.create('TranspopPage');
    popover.present({
      ev: myEvent
    });
  }
  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  home() {
    this.navCtrl.push(TransporterPage);
  }
  menuClick() {
    this.basicData.checkTransCount();
  }
}
