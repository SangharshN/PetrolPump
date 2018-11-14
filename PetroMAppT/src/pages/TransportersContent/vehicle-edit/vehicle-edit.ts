import { TransporterPage } from './../transporter/transporter';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, App, NavParams, PopoverController, ToastController, Platform, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
import { Vehicle } from '../../../app/vehicle';

@IonicPage()
@Component({
  selector: 'page-vehicle-edit',
  templateUrl: 'vehicle-edit.html',
})
export class VehicleEditPage {
  user: FormGroup;
  public vehicle = new Vehicle;
  public pumpId: any;
  public transporterId: any;
  public username: any;
  public errorMsg;
  public i: number;
  public currentYear: number;
  public driverList = [];
  public VehicleTypeList = [];
  public FuelTypeList = [];
  public vehicleList: any;
  constructor(public navCtrl: NavController,
    public toast: ToastController,
    public platform: Platform,
    public appCtrl: App,
    public loadingCtrl: LoadingController,
    public basicData: BasicDataProvider,
    public popoverCtrl: PopoverController,
    public navParams: NavParams,
    public storage: Storage,
    public transData: TransDataProvider) {
    let backAction = this.platform.registerBackButtonAction(() => {
      console.log("second");
      this.appCtrl.getRootNav().setRoot('VehicleListPage');
      backAction();
    }, 1)
    var currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    console.log(this.currentYear)
    this.user = new FormGroup({
      regNo: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      regYear: new FormControl({ value: '' }, Validators.compose([Validators.required, Validators.max(this.currentYear), Validators.maxLength(4), Validators.minLength(4)])),
      vehicleTypeId: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      // tdriverId: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      blanket: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      fuelType: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      blanketCash: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      blanketFuel: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      unitName: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      capacity: new FormControl({ value: '' }, Validators.compose([Validators.required, Validators.min(1)])),
    });
  }

  ionViewDidLoad() {
    this.storage.get('username').then((val) => {
      this.username = val;
    });

    this.storage.get('pumpId').then((val) => {
      this.pumpId = val;
    });

    this.storage.get('transporterId').then((val) => {
      this.transporterId = val;
      console.log(this.transporterId);
      this.showDriver();
      this.showfuelType();
      this.showvehicleType();
    });
    console.log('ionViewDidLoad VehicleEditPage');
    let id = this.navParams.get('id');
    //console.log("Id= "+id);
    this.showVehicle(id);
    this.vehicle.pumpId = this.pumpId;
    this.vehicle.transporterId = this.transporterId;
    this.vehicle.updated_by = this.username;
  }

  showVehicle(id) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.transData.getVehicle(id)
      .subscribe(response => {
        loading.dismiss();
        this.vehicle = response;
        this.vehicleList = response;
        console.log(this.vehicle);
        console.log("Vehicle==" + this.vehicle.regNo);
      }, err => {
        this.errorMsg = err;
        console.log(this.errorMsg);
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }

  blanketUpdate(blanket) {
    if (!blanket) {
      this.vehicle.blanketCash = 0.00;
      this.vehicle.blanketFuel = 0.00;
    }
  }

  updateVehicle() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    console.log(this.vehicle);
    if (this.user.valid) {
      if (this.vehicle.blanketFuel > this.vehicle.capacity) {
        this.basicData.sendErrorNotification("Blanket Fuel is greater than Capacity");
        loading.dismiss();
        this.vehicle.blanket = null;
      }
      else {
        this.transData.updateVehicle(this.vehicle, this.vehicle.id).subscribe(res => {
          this.vehicle = res;
          this.vehicle.updated_by = this.username;
          this.basicData.sendSuccessNotification("Vehicle updated successfully");
          this.appCtrl.getRootNav().setRoot('VehicleListPage');
          loading.dismiss();
        }, err => {
          this.errorMsg = err;
          console.log(this.errorMsg);
          this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
          loading.dismiss();
        })
      }
    }
    else {
      console.log("ii");
      this.user.controls['regNo'].markAsTouched();
      this.user.controls['regYear'].markAsTouched();
      this.user.controls['vehicleTypeId'].markAsTouched();
      //  this.user.controls['tdriverId'].markAsTouched();
      this.user.controls['fuelType'].markAsTouched();
      this.user.controls['unitName'].markAsTouched();
      this.user.controls['capacity'].markAsTouched();
      loading.dismiss();
    }
  }

  popover(myEvent) {
    let popover = this.popoverCtrl.create('TranspopPage');
    popover.present({
      ev: myEvent
    });
  }
  onChange(reqFuel) {
    console.log(reqFuel);

    for (this.i = 0; this.i < this.FuelTypeList.length; this.i++) {
      if (this.FuelTypeList[this.i].id == reqFuel) {
        console.log(this.FuelTypeList[this.i].id);
        console.log(this.FuelTypeList)
        this.vehicle.unitName = this.FuelTypeList[this.i].unitName;
        this.vehicle.unitId = this.FuelTypeList[this.i].unitId;
        this.vehicle.prodGroupId = this.FuelTypeList[this.i].id
        console.log(this.vehicle.unitId, this.vehicle.unitName);
      }
    }
  }

  showDriver() {
    this.transData.getTDrivers(this.transporterId).subscribe(res => {
      this.driverList = res.filter(v => v.active == 1);
      console.log(this.driverList)
    }, err => {
      this.errorMsg = err;
      console.log(this.errorMsg);
      this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
    });
  }
  showfuelType() {
    this.transData.getFuelType().subscribe(res => {
      this.FuelTypeList = res;
      console.log(this.FuelTypeList)
    }, err => {
      this.errorMsg = err;
      console.log(this.errorMsg);
      this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
    });
  }
  showvehicleType() {
    this.transData.getVehicleType().subscribe(res => {
      this.VehicleTypeList = res.filter(v => v.active == 1);
      console.log(this.VehicleTypeList)
    }, err => {
      this.errorMsg = err;
      console.log(this.errorMsg);
      this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
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
