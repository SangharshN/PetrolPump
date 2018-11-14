import { TransporterPage } from './../transporter/transporter';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, App, NavParams, Platform, PopoverController, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vehicle } from '../../../app/vehicle';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';


@IonicPage()
@Component({
  selector: 'page-vehicle-add',
  templateUrl: 'vehicle-add.html',
})
export class VehicleAddPage {
  user: FormGroup;
  public vehicle = new Vehicle;
  public driverList = [];
  public VehicleTypeList = [];
  public FuelTypeList = [];
  startDate: String;
  vehicleCount: number;
  currentYear: number;
  start: Date;
  endDate: String;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public platform: Platform,
    public basicData: BasicDataProvider,
    public toast: ToastController,
    public loadingCtrl: LoadingController,
    public appCtrl: App,
    public popoverCtrl: PopoverController,
    public transData: TransDataProvider) {
    let backAction = this.platform.registerBackButtonAction(() => {
      console.log("second");
      this.appCtrl.getRootNav().setRoot('VehicleListPage');
      backAction();
    }, 2)
    var currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    console.log(this.currentYear)
    this.vehicle.regNo = '';
    this.user = new FormGroup({
      regNo: new FormControl({ value: '' }, Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]*')])),
      regYear: new FormControl({ value: '' }, Validators.compose([Validators.required, Validators.max(this.currentYear), Validators.maxLength(4), Validators.minLength(4)])),
      vehicleTypeId: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      blanket: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      fuelType: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      blanketCash: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      blanketFuel: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      unitName: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      capacity: new FormControl({ value: '' }, Validators.compose([Validators.required, Validators.min(1)])),
    });

    this.storage.get('username').then((val) => {
      this.vehicle.updated_by = val;
    });

    this.storage.get('pumpId').then((val) => {
      this.vehicle.pumpId = val;
    });

    this.storage.get('transporterId').then((val) => {
      this.vehicle.transporterId = val;
      // this.showDriver();
      this.showfuelType();
      this.showvehicleType();
    });
    this.vehicle.active = 1;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehicleAddPage');
    this.storage.get('vehicleCount').then((val) => {
      this.vehicleCount = val;
    });
  }

  blanketUpdate(blanket) {
    if (!blanket) {
      this.vehicle.blanketCash = 0.00;
      this.vehicle.blanketFuel = 0.00;
    }
  }
  // showDriver() {
  //   this.transData.getTDrivers(this.vehicle.transporterId).subscribe(res => {
  //     this.driverList = res.filter(v => v.active == 1)
  //     console.log(this.driverList)
  //   }, err => {
  //     this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
  //   });
  // }
  showfuelType() {
    this.transData.getFuelType().subscribe(res => {
      this.FuelTypeList = res;
      console.log(this.FuelTypeList)
    }, err => {
      this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
    });
  }
  showvehicleType() {
    this.transData.getVehicleType().subscribe(res => {
      this.VehicleTypeList = res;
      console.log(res)
    }, err => {
      this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
    });
  }

  addVehicle() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.user.valid) {
      console.log(this.vehicle);
      if (parseFloat(this.vehicle.blanketFuel) > parseFloat(this.vehicle.capacity)) {
        this.basicData.sendErrorNotification("Blanket Fuel is greater than Capacity");
        this.vehicle.blanketFuel = null;
        loading.dismiss();
      }
      else {
        this.vehicle.active = 1;
        console.log(this.vehicle);
        this.transData.addVehicle(this.vehicle).subscribe(res => {
          this.vehicle = res;
          this.basicData.sendSuccessNotification("Vehicle Added Successfully");
          this.appCtrl.getRootNav().setRoot('VehicleListPage');
          loading.dismiss();
        }, err => {
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
      this.user.controls['fuelType'].markAsTouched();
      this.user.controls['unitName'].markAsTouched();
      this.user.controls['capacity'].markAsTouched();
      loading.dismiss();
    }
  }


  onChange(reqFuel) {
    console.log(reqFuel);

    for (var i = 0; i < this.FuelTypeList.length; i++) {
      if (this.FuelTypeList[i].id == reqFuel) {
        console.log(this.FuelTypeList[i].id);
        this.vehicle.unitName = this.FuelTypeList[i].unitName;
        this.vehicle.unitId = this.FuelTypeList[i].unitId;
        this.vehicle.prodGroupId = this.FuelTypeList[i].id;
        console.log(this.vehicle.unitId, this.vehicle.unitName);
      }
    }
  }


  home() {
    this.appCtrl.getRootNav().setRoot(TransporterPage);
  }
  menuClick() {
    this.basicData.checkTransCount();
  }
}
