
import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, PopoverController, Platform, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PManagerHomePage } from '../p-manager-home/p-manager-home';
import { EmployeeProfile } from '../../../app/employeeProfile';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { ReportsProvider } from '../../../providers/reports/reports';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
import { POwnerHomePage } from '../../POwnerContent/p-owner-home/p-owner-home';
/**

/**
 * Generated class for the PumpProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pump-profile',
  templateUrl: 'pump-profile.html',
})
export class PumpProfilePage {
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
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public appCtrl: App,
    public basicData: BasicDataProvider,
    public reportData: ReportsProvider,
    public transData: TransDataProvider,
    public popoverCtrl: PopoverController, ) {
    this.other = new FormGroup({
      email: new FormControl({ value: '' }, Validators.compose([Validators.pattern(this.emailPattern)])),
      pincode: new FormControl({ value: '' }, Validators.compose([Validators.minLength(6), Validators.maxLength(6)])),

    });
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot(PManagerHomePage);
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
    loading.present();  //this.basicData.Loader();
    this.storage.get('pumpId').then((val) => {
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
        this.appCtrl.getRootNav().setRoot(POwnerHomePage);
        loading.dismiss();
      }, err => {

        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
        loading.dismiss();
      })
    }
  }

  home() {
    this.appCtrl.getRootNav().setRoot(PManagerHomePage)
  }

  menuClick() {
    this.basicData.checkPumpCount();
  }
}
