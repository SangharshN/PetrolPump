
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ToastController, Platform, App, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Manager } from '../../../app/manager';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';

@IonicPage()
@Component({
  selector: 'page-manager-add',
  templateUrl: 'manager-add.html',
})
export class ManagerAddPage {
  user: FormGroup;
  other: FormGroup;
  mgrCount: number;
  public manager = new Manager;
  public countries = [];
  public regions = [];
  public selectedRegions = [];
  public cities = [];
  public selectedCities = [];
  public success: any;
  public pumpId;
  public transporterId;
  public isReadonly: boolean = true;
  public countryId: number;
  public regionId: number;
  public cityId: number;
  public username = 'Super Admin';
  public errorMsg;
  currentDate: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public dateofJoining: Date;
  public ValidDateofBirth: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    public platform: Platform,
    public popoverCtrl: PopoverController,
    public datepipe: DatePipe,
    public loadingCtrl: LoadingController,
    public appCtrl: App,
    public storage: Storage,
    public transData: TransDataProvider,
    public basicData: BasicDataProvider) {
    let backAction = this.platform.registerBackButtonAction(() => {
      console.log("second");
      this.appCtrl.getRootNav().setRoot('ManagerListPage');
      backAction();
    }, 2)


    this.manager.pumpId = this.pumpId;
    this.manager.transporterId = this.transporterId;
    this.manager.active = 1;
    this.manager.updated_by = this.username;
    this.manager.name = '';
    this.manager.address = '';
    this.manager.PINCode = '';
    this.manager.email = '';
    this.manager.mobileNo;
    this.manager.username = '';

    this.user = new FormGroup({
      name: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      gender: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      countryId: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      regionId: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      cityId: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      mobileNo: new FormControl({ value: '' }, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
    });
    this.other = new FormGroup({
      email: new FormControl({ value: '' }, Validators.compose([Validators.pattern(this.emailPattern)])),
      pincode: new FormControl({ value: '' }, Validators.compose([Validators.minLength(6), Validators.maxLength(6)])),

    });

  }

  initCountry() {
    this.basicData.getCountries()
      .subscribe(res => {
        this.countries = res;
        console.log(this.countries)

      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }

  initRegion(countryId) {
    this.basicData.getRegions(countryId)
      .subscribe(res => {
        this.regions = res;
        console.log(this.regions)
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }

  initCity(regionId) {
    this.basicData.getCities(regionId)
      .subscribe(res => {
        this.selectedCities = res;
        console.log(this.selectedCities)
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }

  ionViewDidLoad() {
    //this.basicData.Loader();
    this.currentDate = new Date().toLocaleDateString();
    console.log(this.currentDate);

    this.storage.get('pumpId').then((val) => {
      this.manager.pumpId = val;
    });
    this.storage.get('mgrCount').then((val) => {
      this.mgrCount = val;
    });
    this.storage.get('transporterId').then((val) => {
      this.manager.transporterId = val;
      this.initCountry();
      this.initRegion(101);
      this.initCity(22);
      this.manager.countryId = 101;
      this.manager.regionId = 22;
      this.manager.cityId = 2763;

    }, err => {
      this.errorMsg = err;
      this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
    });
  }

  addManager() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.user.valid) {
      if (this.other.valid) {
        console.log(this.manager);
        this.transData.addManager(this.manager).subscribe(res => {
          console.log(res);
          this.success = JSON.stringify(res);
          this.success = JSON.parse(this.success).error;
          if (this.success == undefined) {
            this.basicData.sendSuccessNotification("Manager added Successfully");
            this.appCtrl.getRootNav().setRoot('ManagerListPage');
            loading.dismiss();
          }
          else {
            this.basicData.sendErrorNotification("" + this.success);
            loading.dismiss();
          }
        }, err => {
          this.errorMsg = err;
          loading.dismiss();
        })
      }
      else {
        this.other.controls['pincode'].markAsTouched();
        this.other.controls['email'].markAsTouched();
        loading.dismiss();
      }
    }
    else {
      this.user.controls['name'].markAsTouched();
      this.user.controls['gender'].markAsTouched();
      this.user.controls['countryId'].markAsTouched();
      this.user.controls['regionId'].markAsTouched();
      this.user.controls['cityId'].markAsTouched();
      this.user.controls['mobileNo'].markAsTouched();
      loading.dismiss();
    }
  }

  onCountryChange(countryId) {
    this.initRegion(countryId);
  }

  onRegionChange(regionId) {
    this.initCity(regionId);
  }

  onCityChange(cityId) {
  }

  popover(myEvent) {
    let popover = this.popoverCtrl.create('TranspopPage');
    popover.present({
      ev: myEvent
    });
  }

  getDOJ(date) {
    console.log(date);
    var dateParts = date.split("-");
    var tempdate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    var month = dateParts[1];
    var day = dateParts[2];
    if (month.length < 2 && day.length < 2) {
      var xmonth = '0' + month;
      var xday = '0' + day;
      var xyear = dateParts[0] - 14;
      this.ValidDateofBirth = xyear + xmonth + xday;
    }
    else if (month.length == 2 && day.length == 2) {
      var xxmonth = month;
      var xxday = day;
      var xxyear = dateParts[0] - 14;
      this.ValidDateofBirth = xxyear + "-" + xxmonth + "-" + xxday;
      console.log(this.ValidDateofBirth)
    }
    else if (month.length == 2 && day.length < 2) {
      var xxxmonth = month;
      var xxxday = '0' + day;
      var xxxyear = dateParts[0] - 14;
      this.ValidDateofBirth = xxxyear + "-" + xxxmonth + "-" + xxxday;
      console.log(this.ValidDateofBirth)
      console.log(xmonth);
    }
    else if (month.length < 2 && day.length == 2) {
      var xxxxmonth = '0' + month;
      var xxxxday = day;
      var xxxxyear = dateParts[0] - 14;
      this.ValidDateofBirth = xxxxyear + "-" + xxxxmonth + "-" + xxxxday;
      console.log(this.ValidDateofBirth);
    }
    return tempdate;
  }

  DOJ(selectedDate) {
    console.log(selectedDate);
    if (this.manager.DOJ == undefined) {
      this.basicData.sendErrorNotification("Please Enter first Date of Joining");
    }
  }

  menuClick() {
    this.basicData.checkTransCount();
  }
}
