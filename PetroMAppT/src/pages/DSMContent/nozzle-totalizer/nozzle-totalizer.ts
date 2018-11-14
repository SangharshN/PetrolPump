import { Component } from '@angular/core';
import { IonicPage, NavController, App, NavParams, ToastController, Platform, LoadingController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RegularSale } from '../../../app/regular-sale';
import { SalesDataProvider } from '../../../providers/sales-data/sales-data';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { PumpDataProvider } from '../../../providers/pump-data/pump-data';
import { DsmHomePage } from '../dsm-home/dsm-home';
/**
 * Generated class for the NozzleTotalizerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nozzle-totalizer',
  templateUrl: 'nozzle-totalizer.html',
})
export class NozzleTotalizerPage {
  public employeeId: any;
  public NoozleList: any[];
  public sampleList: any[] = [];
  public regular = new RegularSale;
  public shiftId: number;
  public pumpId: number;
  public empShiftId: number;
  public errorMsg: any;
  public success: any;
  public error: any;
  public show: boolean;
  public hide: boolean;
  public isTotalizer = 1;
  constructor(public navCtrl: NavController,
    public salesData: SalesDataProvider,
    public storage: Storage,
    public toast: ToastController,
    public popoverCtrl:PopoverController,
    public loadingCtrl:LoadingController,
    public platform: Platform,
    public appCtrl: App,
    public basicData: BasicDataProvider,
    public pumpData: PumpDataProvider,
    public navParams: NavParams) {
    let backAction = this.platform.registerBackButtonAction(() => {
      console.log("second");
      this.appCtrl.getRootNav().setRoot(DsmHomePage);
      backAction();
    }, 1)
  }

  ionViewDidLoad() {
    //this.basicData.Loader();
    console.log('ionViewDidLoad NozzleTotalizerPage');
    this.storage.get('employeeId').then((val) => {
      this.employeeId = val;
      console.log(val);

    });
    this.storage.get('shiftId').then((val) => {
      this.shiftId = val;
      console.log(val);
    });
    this.storage.get('empShiftId').then((val) => {
      this.empShiftId = val;
      console.log(val);
    });
    this.storage.get('pumpId').then((val) => {
      this.pumpId = val;
      console.log(val);
      this.showNoozle();
      // this.showPumpShifts();
    });
  }

  showNoozle() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.salesData.getDSMNozzles(this.pumpId, this.employeeId, this.isTotalizer).subscribe(res => {
      console.log(res);
      loading.dismiss();
      this.NoozleList = res;
      console.log(this.NoozleList);
      this.success = JSON.stringify(res);
      this.error = JSON.parse(this.success).errors;
      console.log(this.error);
      if (this.error == undefined || this.error == null || this.NoozleList.length == 0) {
        this.show = true;
        this.hide = false;
      }
      else {
        this.hide = true;
        this.show = false;
        this.basicData.sendErrorNotification("You have already enterd nozzle Totalizer");
      }

    }, err => {
      this.errorMsg = err;
      console.log(this.errorMsg);
      this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
    })
  }

  addTotalReading() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    var count = 0;
    for (var i = 0; i < this.NoozleList.length; i++) {
      if (parseFloat(this.NoozleList[i].startReading) > parseFloat(this.NoozleList[i].endReading) || parseFloat(this.NoozleList[i].minEndReading) > parseFloat(this.NoozleList[i].endReading)){
        this.basicData.sendErrorNotification("End Reading is inValid");
        this.NoozleList[i].endReading=null;
        loading.dismiss();
      }
      else if (this.NoozleList[i].endReading == undefined) {
        this.basicData.sendErrorNotification("Please enter all fields End Reading");
        loading.dismiss();
        break;  
      }
      else {
        this.regular = new RegularSale();
        this.regular.pumpId = this.NoozleList[i].pumpId;
        this.regular.empShiftId = this.NoozleList[i].empShiftId;
        this.regular.DSMId = this.NoozleList[i].employeeId;
        this.regular.machineId = this.NoozleList[i].machineId;
        this.regular.nozzleId = this.NoozleList[i].nozzleId;
        this.regular.startReading = this.NoozleList[i].startReading;
        this.regular.unitName = this.NoozleList[i].unitName;
        this.regular.updated_by = this.NoozleList[i].updated_by;
        this.regular.endReading = this.NoozleList[i].endReading;
        this.sampleList[count] = this.regular;
        count++;
      }

    }
    console.log(this.sampleList);
    if (this.sampleList.length == 0 || this.NoozleList.length!==this.sampleList.length) {

    }
    else {
      const myObjStr = JSON.stringify(this.sampleList);
      console.log(myObjStr);
      this.pumpData.addNozzleTotalizer(myObjStr).subscribe(res => {
        console.log(res);
      
         loading.dismiss();
         this.success = JSON.stringify(res);
         var error = JSON.parse(this.success).error;
         console.log(this.error);
         if(error==undefined)
         {
          this.basicData.sendSuccessNotification("Noozle list added successfully");
          this.appCtrl.getRootNav().setRoot(DsmHomePage);  
         }
         else
         {
           this.basicData.sendErrorNotification(error);
         }
      }, err => {
        this.errorMsg = err;
        console.log(this.errorMsg);
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");  
         loading.dismiss();
      });
    }

  }
  home()
  {
    this.appCtrl.getRootNav().setRoot(DsmHomePage);
 }
 popover(myEvent)
 {
   let popover = this.popoverCtrl.create('DsmPopPage');
   popover.present({
     ev: myEvent
   }); 
 }

}
