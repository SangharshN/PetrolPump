import { TransporterPage } from './../transporter/transporter';
import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, PopoverController, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransporterProfile } from '../../../app/transporterProfile';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
/**
 * Generated class for the TransporterProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transporter-profile',
  templateUrl: 'transporter-profile.html',
})
export class TransporterProfilePage {
  other: FormGroup;
  public tprofile = new TransporterProfile;
  public transporterId;
  public tprofile1: any;
  public countryId: number;
  public regionId: number;
  public cityId: number;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
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
    public appCtrl: App,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public basicData: BasicDataProvider,
    public transData: TransDataProvider,
    public popoverCtrl: PopoverController,
  ) {
    this.other = new FormGroup({
      email: new FormControl({ value: '' }, Validators.compose([Validators.pattern(this.emailPattern)])),
      pincode: new FormControl({ value: '' }, Validators.compose([Validators.minLength(6), Validators.maxLength(6)])),

    });
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot(TransporterPage);
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

  ionViewDidLoad() {     //this.basicData.Loader();
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.storage.get('transporterId').then((val) => {
      this.transporterId = val;
      console.log(this.transporterId);
      this.transData.getTransporterProfile(this.transporterId)
        .subscribe(res => {
          console.log(res);
          this.tprofile = res;
          loading.dismiss();

          console.log(this.tprofile);
          console.log(this.tprofile.countryId);
          this.initCountry();
          this.initRegion(this.tprofile.countryId);
          this.initCity(this.tprofile.regionId);
        }, err => {

          this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
        })
    });
    this.storage.get('username').then((val) => {
      this.username = val;
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
    let popover = this.popoverCtrl.create('TranspopPage');
    popover.present({
      ev: myEvent
    });
  }
  editTProfile() {
    this.tprofile.updated_by = this.username;
    console.log(this.tprofile);
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    {
      this.transData.updateTransporterProfile(this.tprofile, this.transporterId).subscribe(res => {
        this.tprofile = res;
        this.basicData.sendSuccessNotification("Transporter Updated Successfully");
        this.appCtrl.getRootNav().setRoot(TransporterPage);
        loading.dismiss();
      }, err => {

        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
        loading.dismiss();
      })
    }
  }
  home() {
    this.navCtrl.setRoot(TransporterPage);
  }
  menuClick() {
    this.basicData.checkTransCount();
  }
}
