import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, PopoverController, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TransporterPage } from '../transporter/transporter';
import { Vehicle } from '../../../app/vehicle';
import { SalesDataProvider } from '../../../providers/sales-data/sales-data';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';

/**
 * Generated class for the VehicleListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vehicle-list',
  templateUrl: 'vehicle-list.html',
})
export class VehicleListPage {
  public pumpId: any;
  public transporterId: any;
  public vehicle = new Vehicle;
  public vehicles = [];
  public deacVehicle = [];
  public errorMsg;
  public show: boolean = false;
  public hide: boolean = true;
  public view: boolean = true;
  public nonview: boolean = false;
  public categories = "active";
  public active: number;
  public deactive: number;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public appCtrl: App,
    public loadingCtrl:LoadingController,
    public popoverCtrl: PopoverController,
    public saleData: SalesDataProvider,
    public platform: Platform,
    public basicData: BasicDataProvider,
    public transData: TransDataProvider) {

    let backAction = this.platform.registerBackButtonAction(() => {
      console.log("second");
      this.appCtrl.getRootNav().setRoot(TransporterPage);
      backAction();
    }, 1)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehiclesPage');
    this.storage.get('pumpId').then((val) => {
      this.pumpId = val;
    });
    console.log('ionViewDidLoad VehicleEditPage');
    let id = this.navParams.get('id');
    console.log(id);
    if (id == "deact") {
      this.categories = "deactive";
    }
    else if (id == undefined || id == null) {
      this.categories = "active";
    }
    this.storage.get('transporterId').then((val) => {
      this.transporterId = val;
      this.getVehicles();
    });

  }
  getVehicles() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    console.log(this.pumpId, this.transporterId);
    this.saleData.getVehicles(this.transporterId)
      .subscribe(res => {
        loading.dismiss();
        this.vehicles = res.filter(v => v.active == 1);
        this.deacVehicle = res.filter(v => v.active == 0);
        console.log(res);
        this.active = this.vehicles.length;
        this.deactive = this.deacVehicle.length;
        if (this.deacVehicle.length == 0) {
          this.show = true;
          this.hide = false;
        }
        if (this.vehicles.length == 0) {
          this.nonview = true;
          this.view = false;
        }
        // else{
        //   this.view=true;
        //   this.nonview=false;
        // }
      }, err => {
        this.errorMsg = err;
        console.log(this.errorMsg);
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }

  addVehicle() {
    this.appCtrl.getRootNav().setRoot("VehicleAddPage");
  }

  editVehicle(id) {
    //console.log("id: "+id);
    this.appCtrl.getRootNav().setRoot("VehicleEditPage", { 'id': id });
  }

  deleteVehicle(id) {

  }

  viewVehicle(id) {
    this.appCtrl.getRootNav().setRoot('VehicleDeactivatePage', {
      param1: id
    });

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
