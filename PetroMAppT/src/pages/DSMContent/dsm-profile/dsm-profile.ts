import { EmployeeProfile } from './../../../app/employeeProfile';
import { Platform, LoadingController } from 'ionic-angular';
import { DsmHomePage } from './../dsm-home/dsm-home';
import { Component } from '@angular/core';
import { IonicPage, NavController, App, NavParams, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportsProvider } from '../../../providers/reports/reports';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';

/**
 * Generated class for the PumpProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dsm-profile',
  templateUrl: 'dsm-profile.html',
})
export class DsmProfilePage {
  other: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public profile = new EmployeeProfile;
  public transporterId;
  public countryId: number;
  public regionId: number;
  public cityId: number;
  public userType: any;
  public countries = [];
  public regions = [];
  public selectedRegions = [];
  public cities = [];
  public selectedCities = [];
  public username;
  public errorMsg;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public reportData: ReportsProvider,
    public basicData: BasicDataProvider,
    public platform: Platform,
    public appCtrl: App,
    public transData: TransDataProvider,
    public popoverCtrl: PopoverController, ) {
    this.other = new FormGroup({
      email: new FormControl({ value: '' }, Validators.compose([Validators.pattern(this.emailPattern)])),
      pincode: new FormControl({ value: '' }, Validators.compose([Validators.minLength(6), Validators.maxLength(6)])),

    });
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot(DsmHomePage);
      backAction();
    }, 1)
  }
  initCountry() {
    this.basicData.getCountries()
      .subscribe(res => {
        this.countries = res;
      }, err => {

        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }

  initRegion(countryId) {
    this.basicData.getRegions(countryId)
      .subscribe(res => {
        this.regions = res;
      }, err => {

        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }

  initCity(regionId) {
    this.basicData.getCities(regionId)
      .subscribe(res => {
        this.selectedCities = res;
      }, err => {

        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.storage.get('employeeId').then((val) => {
      this.transporterId = val;
      console.log(this.transporterId);
      this.reportData.getEmployeeProfile(this.transporterId)
        .subscribe(res => {
          console.log(res);
          loading.dismiss();
          this.profile = res;

          console.log(this.profile);
          console.log(this.profile.countryId);
          this.initCountry();
          this.initRegion(this.profile.countryId);
          this.initCity(this.profile.regionId);
        }, err => {

          this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
        })
    });
    this.storage.get('username').then((val) => {
      this.username = val;
    });
    this.storage.get('userType').then((val) => {
      this.userType = val;
    });
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
    let popover = this.popoverCtrl.create('DsmPopPage');
    popover.present({
      ev: myEvent
    });
  }
  editTProfile() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.profile.updated_by = this.username;
    console.log(this.profile);
    {
      this.reportData.updateEmployeeProfile(this.profile, this.transporterId).subscribe(res => {
        this.profile = res;
        this.basicData.sendSuccessNotification("Employee Updated Successfully");
        this.appCtrl.getRootNav().setRoot(DsmHomePage);
        loading.dismiss();
      }, err => {
        loading.dismiss();
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
    }
  }

}
