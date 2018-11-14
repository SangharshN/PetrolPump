import { TransporterPage } from './../transporter/transporter';
import { Component } from '@angular/core';
import { IonicPage,App, NavController, NavParams, PopoverController, ToastController, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl,  Validators } from '@angular/forms';
import { Manager } from '../../../app/manager';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';


@IonicPage()
@Component({
  selector: 'page-manager-edit',
  templateUrl: 'manager-edit.html',
})
export class ManagerEditPage {
  user: FormGroup;
  other: FormGroup;
  public manager = new Manager;
  public countries = [];
  public regions = [];
  public selectedRegions = [];
  public cities = [];
  public selectedCities = [];
  public id: any;
  public pumpId;
  public transporterId;
  public countryId: number;
  public regionId: number;
  public cityId: number;
  public errorMsg;
  public ValidDateofBirth: any;
  startDate: String;
  start: Date;
  endDate: String;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toast:ToastController,
    public platform:Platform,
    public loadingCtrl:LoadingController,
    public appCtrl:App,
    public popoverCtrl: PopoverController,
    public storage: Storage, public transData: TransDataProvider, public basicData: BasicDataProvider) {
      let backAction =  this.platform.registerBackButtonAction(() => {
        this.appCtrl.getRootNav().setRoot('ManagerListPage');
        backAction();
      },2)
    this.manager.pumpId = this.pumpId;
    this.manager.transporterId = this.transporterId;
    this.manager.active = 1;
    this.manager.updated_by ='';
    this.user = new FormGroup({
      name: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      gender: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      countryId: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      regionId: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      cityId: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      mobileNo: new FormControl({ value: '' }, Validators.compose([Validators.required,  Validators.minLength(10),Validators.maxLength(10)])),
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
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }

  initRegion(countryId) {
    this.basicData.getRegions(countryId)
      .subscribe(res => {
        this.regions = res;
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }

  initCity(regionId) {
    this.basicData.getCities(regionId)
      .subscribe(res => {
        this.selectedCities = res;
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.id = this.navParams.get('param1'); 
    this.transData.getManager(this.id)
      .subscribe(res => {
        this.manager = res;
        loading.dismiss();
        this.initCountry();
        this.initRegion(this.manager.countryId);
        this.initCity(this.manager.regionId);
        if(this.manager.DOJ!=undefined)
        {
          this.getDOJ(this.manager.DOJ);
        }
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }

  editManager(manager: Manager) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if(this.user.valid)
    {
    this.transData.updateManager(this.manager, this.id).subscribe(res => {
      this.manager = res;
      this.basicData.sendSuccessNotification("Manager Updated Successfully");
      this.appCtrl.getRootNav().setRoot('ManagerListPage');
      loading.dismiss();
    }, err => {
      this.errorMsg = err;
      this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!"); loading.dismiss();
    })
    }
      else
      {
       this.user.controls['name'].markAsTouched();
       this.user.controls['gender'].markAsTouched();
       this.user.controls['countryId'].markAsTouched();
       this.user.controls['regionId'].markAsTouched();
       this.user.controls['cityId'].markAsTouched();
       this.user.controls['mobileNo'].markAsTouched(); loading.dismiss();
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
    if (month.length < 2 && day.length <2) {
      var xmonth = '0' + month;
      var xday = '0' + day;
      var xyear =  dateParts[0] - 14;
      this.ValidDateofBirth = xyear + xmonth + xday  ;
    }
    else if (month.length == 2 && day.length ==2)
    {
      var xxmonth =  month;
      var xxday =  day;
      var xxyear =  dateParts[0] - 14;
      this.ValidDateofBirth =  xxyear +"-" + xxmonth  +"-"   + xxday  ;
      console.log(this.ValidDateofBirth)
    }
    else if(month.length == 2 && day.length <2)  {
      var xxxmonth =  month;
      var xxxday =  '0' +day;
      var xxxyear =  dateParts[0] - 14;
      this.ValidDateofBirth =  xxxyear +"-" + xxxmonth  +"-"   +xxxday  ;
      console.log(this.ValidDateofBirth)
      console.log(xmonth);
    }
    else if(month.length < 2 && day.length == 2)
    {
      var xxxxmonth = '0' +month;
      var xxxxday =   day;
      var xxxxyear =  dateParts[0] - 14;

      this.ValidDateofBirth =  xxxxyear +"-" + xxxxmonth  +"-"   +xxxxday  ;
      console.log(this.ValidDateofBirth);
    }
    return tempdate;
  }

  DOJ(selectedDate)
  {
    console.log(selectedDate);
  }

  home()
  {
this.navCtrl.push(TransporterPage);
  }
  menuClick()
  {
    this.basicData.checkTransCount();
  }

}

