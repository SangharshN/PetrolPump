
import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, ToastController, PopoverController, AlertController, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TransporterPage } from '../transporter/transporter';
import { CreditSale } from '../../../app/credit.sale';
import { Vehicle } from '../../../app/vehicle';
import { Region } from '../../../app/region';
import { TDriver } from '../../../app/tdriver';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
import { SalesDataProvider } from '../../../providers/sales-data/sales-data';


@IonicPage()
@Component({
  selector: 'page-request-raise',
  templateUrl: 'request-raise.html',
})
export class RequestRaisePage {
  user: FormGroup;
  public crequest = new CreditSale;
  public vehicles: Vehicle[];
  public stateName: Region[] = [];
  public vehicle: Vehicle;
  public stateNameList: any;
  public selectedRegions: any;
  public tdriverList: TDriver[];
  public tdriver: TDriver;
  public tdriverId: any;
  public state: any;
  public PumppumpList: any;
  public error: any;
  // public pumpId:any;
  public pumpList: any;
  public productList: any;
  public fuelList: any;
  public regions: any;
  public regNo: string;
  public fuelName: string;
  public unitName: string;
  public raiseSucess: any;
  public companyId: any;
  public transporterId: number;
  public capacity: number;
  public errorMsg;
  public pumpId:number;
  public prodGroupId: any;
  public transRequestList: any;
  public show: boolean = false;
  public showEmpty: boolean;
  public username: string;
  public FuelName:string;
  public query = '';
  public reqCount: number;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public appCtrl: App,
    public toast: ToastController,
    public alert: AlertController,
    public loadingCtrl: LoadingController,
    public basicData: BasicDataProvider,
    public popoverCtrl: PopoverController,
    public platform: Platform,
    public transData: TransDataProvider,
    public salesData: SalesDataProvider) {

    this.crequest.unitName = "₹";
    this.crequest.requestType = 2;

    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot(TransporterPage);
      backAction();
    }, 1)

    this.user = new FormGroup({
      // cashRequested: new FormControl('', [Validators.required]),
      // fuelRequested: new FormControl('', [Validators.required]),
      //requestType: new FormControl('', [Validators.required]),
    //  productId: new FormControl('', [Validators.required]),
      tdriver: new FormControl('', [Validators.required]),
      vehicle: new FormControl('', [Validators.required]),
      pump: new FormControl('', [Validators.required]),
    });
  }

  ionViewDidLoad() {
    this.storage.get('transporterId').then((val) => {
      this.transporterId = val;
      this.showPumps();
      this.showFuel();
      this.initRegion();
      this.showRequest();

    });

    this.storage.get('username').then((val) => {
      this.username = val;
    });
    this.storage.get('reqCount').then((val) => {
      this.reqCount = val;
    });
  }

  initRegion() {
    this.basicData.getRegions(101)
      .subscribe(res => {
        this.regions = res;
        for (var i = 0; i < this.regions.length; i++) {
          this.stateName[i] = this.regions[i].name;
        }
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }

  filter() {
    if (this.query !== "") {

      if (this.query.length > 1) {
        this.stateNameList = this.stateName.filter(function (el) {
          return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
        if (this.stateNameList.length == 0) {
          this.showEmpty = true;
        }
        else {
          this.showEmpty = false;
        }
      }
    } else {
      this.stateNameList = [];
    }
  }

  select(item) {
    console.log(this.pumpList, this.regions[0].id);
    this.state = item;
    this.query = '';
    this.selectedRegions = this.regions.filter(name => name.name === this.state);
    this.crequest.regionId = this.selectedRegions[0].id;
    console.log(this.pumpList, this.crequest.regionId);
    this.pumpList = this.pumpList.filter(regionId => regionId.regionId == this.selectedRegions[0].id);
    console.log(this.pumpList);
    if (this.pumpList.length == 0) {
      let alert = this.alert.create({
        title: 'Sorry no pumps are present for this state',
        enableBackdropDismiss: false,
        buttons: ['Ok']
      });
      alert.present();
      this.pumpList = this.PumppumpList;
      this.state = '';
    }
    else {
      this.show = true;
    }
  }

  showVehicles() {
    this.salesData.getVehicles(this.transporterId)
      .subscribe(res => {
        console.log(res,this.prodGroupId);
        this.vehicles = res.filter(vehicle => vehicle.blanket == 0);
        this.vehicles = this.vehicles.filter(vehicle => vehicle.active == 1);
         for (var i = 0; i < this.transRequestList.length; i++) {
           console.log(this.vehicles,this.transRequestList[i].regNo);
           this.vehicles = this.vehicles.filter(vehicle => vehicle.regNo!==this.transRequestList[i].regNo);
         }
       console.log(this.vehicles);
        if (this.vehicles.length == 0) {
          this.basicData.sendErrorNotification("Sorry No vehicles are present to raise request");

          this.appCtrl.getRootNav().setRoot(TransporterPage);
        }
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }
  // showRequest() {
  //   this.transData.getTransRequests(this.transporterId).subscribe(
  //     res => {
  //       this.transRequestList = res;
  //       console.log(this.transRequestList)
  //     });
  //   }
  showPumps() {
    this.transData.getPumpList(this.transporterId)
      .subscribe(res => {
        this.pumpList = res;
        this.PumppumpList = res;
        console.log(this.pumpList);
        if(this.pumpList.length==0)
        {
          this.basicData.sendErrorNotification("Sorry..!!! no pumps present to raise request");
          this.appCtrl.getRootNav().setRoot('RequestListPage');
        }

      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }

  showDrivers() {
    this.transData.getTDrivers(this.transporterId)
      .subscribe(res => {
        this.tdriverList = res;
        this.tdriverList = res.filter(tdriver => tdriver.active == 1);
         for (var i = 0; i < this.transRequestList.length; i++) {
       //   console.log(this.transRequestList,this.tdriverList);
           this.tdriverList = this.tdriverList.filter(driver => driver.id!==this.transRequestList[i].tdriverId);
         }
         if (this.tdriverList.length == 0) {
          this.basicData.sendErrorNotification("Sorry No Driver are present for this pump to raise request");
          this.appCtrl.getRootNav().setRoot('RequestListPage');
        }
      //  console.log(this.transRequestList,this.tdriverList)
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }

  showFuel() {
    this.transData.getFuel(this.transporterId)
      .subscribe(res => {
        this.fuelList = res;
        console.log(this.fuelList)
        if (this.fuelList.length == 0) {
          this.basicData.sendErrorNotification("Please select valid vehicle and its respective pump");
          this.showPumps();
        }
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }

  public selectVehicle(selVal): void {
    if (this.crequest.pumpId == undefined || this.crequest.pumpId == null) {
      let alert = this.alert.create({
        title: 'Please select first Pump',
        enableBackdropDismiss: false,
        buttons: ['Ok']
      });
      alert.present();
    }
    else {
      this.crequest.regNo = selVal.regNo;
      this.prodGroupId = selVal.prodGroupId;
      this.unitName = selVal.unitName;
      this.capacity = this.vehicle.capacity;
      this.FuelName=this.vehicle.fuelName;
      this.vehicle = this.vehicles.find(v => v.regNo == this.regNo);
      this.productList = this.fuelList.filter(pump => pump.pumpId == this.crequest.pumpId);
      this.productList = this.productList.filter(vehicle => vehicle.prodGroupId == this.prodGroupId);
      if (this.productList.length == 0) {
        this.basicData.sendErrorNotification("Sorry the pump  doen't conatins "+this.FuelName+" fuel type");
      }
      else {
        this.crequest.productId = this.productList[0].productId;
      }
    }
  }

  public selectPump(selVal1): void {
    this.crequest.pumpId = selVal1.pumpId;
    this.companyId = selVal1.companyId;
    this.pumpList = this.PumppumpList;
    this.prodGroupId=selVal1.prodGroupId;
    console.log(selVal1);
    this.transRequestList = this.transRequestList.filter(v => v.pumpId== selVal1.pumpId);

    this.showVehicles();
    this.showDrivers();
    if(selVal1.defaulter==1){
      this.basicData.sendErrorNotification("Your payment is already due for this pump please pay to raise request for this pump");
      this.appCtrl.getRootNav().setRoot('RequestListPage');
    }

  }

  public onChange2(selVal2): void {
    this.crequest.tdriverId = selVal2.id;
  }

  public onChange3(selVal3): void {
    
    this.crequest.productId = this.user.controls['productId'].value;
  }

  addRequest() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.user.valid) {
      switch (this.crequest.requestType) {
        case '1':
          this.crequest.unitName = this.unitName;
          this.crequest.fuelRequested = this.capacity;
          break;
        case '2':
          this.crequest.unitName = "₹";
          break;
        case '3':
          this.crequest.unitName = this.unitName;
          break;
      }
      this.crequest.updated_by = this.username;
      this.crequest.transporterId = this.transporterId;
      this.transData.getRaiseRequest(this.crequest)
        .subscribe(status => {
          this.raiseSucess = JSON.stringify(status);
          this.error = JSON.parse(this.raiseSucess).errors;
          if (this.error == undefined || this.error == null) {
            this.basicData.sendSuccessNotification("Raised request successfully");
            if (this.crequest.fuelRequested == 0 || this.crequest.fuelRequested == null || this.crequest.fuelRequested == undefined) {

            }
            else {
              this.reqCount = this.reqCount + 1;
              this.storage.set('reqCount', this.reqCount);
            }
            this.appCtrl.getRootNav().setRoot('RequestListPage');
            loading.dismiss();
          }
          else {
            this.basicData.sendErrorNotification("" + this.error);
            this.crequest.cashRequested = null;
            loading.dismiss();
          }

        }, err => {
          this.errorMsg = err;
          this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
          loading.dismiss();
        });
    }

    else {
      loading.dismiss();
      this.user.controls['productId'].markAsTouched();
      this.user.controls['tdriver'].markAsTouched();
      this.user.controls['vehicle'].markAsTouched();
      this.user.controls['pump'].markAsTouched();
    }
  }

  popover(myEvent) {
    let popover = this.popoverCtrl.create('TranspopPage');
    popover.present({
      ev: myEvent
    });
  }

  requestType(sel) {
    this.crequest.requestType = sel;
  }
  showRequest() {
    this.transData.getTransRequests(this.transporterId).subscribe(
      res => {
        this.transRequestList = res;
        this.transRequestList = res.filter(v => v.status !== 3);
        this.transRequestList = this.transRequestList.filter(v => v.status !== 4);
        console.log(this.transRequestList);
      

      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }
  home() {
    this.appCtrl.getRootNav().setRoot('RequestListPage');
  }
  menuClick() {
    this.basicData.checkTransCount();
  }
}
