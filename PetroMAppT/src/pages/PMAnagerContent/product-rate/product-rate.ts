
import { PManagerHomePage } from './../p-manager-home/p-manager-home';
import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, ToastController, PopoverController, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Time, DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../../../app/product';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { PumpDataProvider } from '../../../providers/pump-data/pump-data';
import { POwnerHomePage } from '../../POwnerContent/p-owner-home/p-owner-home';
import { ReportsProvider } from '../../../providers/reports/reports';
/**
 * Generated class for the ProductRatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-rate',
  templateUrl: 'product-rate.html',
})
export class ProductRatePage {
  user: FormGroup;
  public productId:number=1;
  public products: Product[];
  public product = new Product;
  public effectiveDate: Date;
  currentDate: any;
  currentTime: any;
  public effectiveTime: Time;
  public currentRate: number;
  public productName: string;
  public pumpId: number;
  productsList:any;
  oldProductList:any[]=[];
  public driverId: number;
  public errorMsg;
  public productSuccess: any;
  public username: string;
  public userType: number;
  public i: any;
  constructor(public navCtrl: NavController,
    public toast: ToastController,
    public popoverCtrl: PopoverController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public appCtrl: App,
    public datepipe: DatePipe,
    public reportData:ReportsProvider,
    public basicData: BasicDataProvider,
    public storage: Storage, public navParams: NavParams,
    public pumpData: PumpDataProvider) {
    let backAction = this.platform.registerBackButtonAction(() => {
      if (this.userType == 11) {
        this.appCtrl.getRootNav().setRoot(POwnerHomePage)
      }
      else if (this.userType == 12) {
        this.appCtrl.getRootNav().setRoot(PManagerHomePage)
      }
      backAction();
    }, 1)
    this.currentDate = new Date().toLocaleDateString();;
    this.currentTime = this.currentDate;
    this.currentDate = this.datepipe.transform(this.currentDate, "yyyy-MM-dd");
    this.currentTime = this.datepipe.transform(this.currentTime, "hh:mm");
    console.log(this.currentDate, this.currentTime);
    this.user = new FormGroup({
      nextDate: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      nextTime: new FormControl({ value: '' }, Validators.compose([Validators.required])),
    });

  }

  ionViewDidLoad() {     //this.basicData.Loader();
    this.storage.get('pumpId').then((val) => {
      this.pumpId = val;
      this.showProducts();
    
    });
    this.storage.get('username').then((val) => {
      this.username = val;
    });
    this.storage.get('userType').then((val) => {
      this.userType = val;
    });
  }

  showProducts() {
    
    this.pumpData.getProducts(this.pumpId)
      .subscribe(res => {
        // this.products = res.filter(product => product.category=='Fuel');;
        this.products = res;
        this.productsList=res;
        console.log(res);
        this.productId=this.productsList[0].productId;
        this.showOldProduct();
        
      }, err => {

        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }

  addProductRate() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.user.valid) {
      if (this.effectiveDate == undefined || this.effectiveTime == undefined) {
        this.basicData.sendErrorNotification("Please add effective Date and time");
        loading.dismiss();
      }
      else {
        for (this.i = 0; this.i < this.products.length; this.i++) {
          if (this.products[this.i].newRate == undefined) {
            this.products[this.i].newRate = this.products[this.i].currentRate;
          }
          else {
            this.products[this.i].newRate = this.products[this.i].newRate;
          }

          this.products[this.i].updated_by = this.username;
          this.products[this.i].effectiveDate = this.effectiveDate;
          this.products[this.i].effectiveTime = this.effectiveTime;

        }

        const myObjStr = JSON.stringify(this.products);
        console.log(myObjStr, this.products);
        this.pumpData.addProductRate(myObjStr, this.pumpId).subscribe(res => {
          this.productSuccess = JSON.stringify(res);
          var error = JSON.parse(this.productSuccess).errors;
          if (error == undefined || error == null) {
            this.basicData.sendSuccessNotification("Rates Changed successfully,will be effective from next cycle");
            loading.dismiss();
            if (this.userType == 11) {
              this.appCtrl.getRootNav().setRoot(POwnerHomePage)
            }
            else if (this.userType == 12) {
              this.appCtrl.getRootNav().setRoot(PManagerHomePage)
            }
          }
          else {
            this.basicData.sendErrorNotification("" + error);
            this.effectiveTime = null;
            loading.dismiss();
          }
        }, err => {
          this.errorMsg = err;
          this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
          loading.dismiss();
        })
      }
    }
    else {
      loading.dismiss();
      this.user.controls['nextDate'].markAsTouched();
      this.user.controls['nextTime'].markAsTouched();
    }
  }

  public onProductChange(selVal): void {
    this.product = this.products.find(p => p.id == selVal);
    this.currentRate = this.product.currentRate;
  }

  updateProductRate() {

  }

  trackByIndex(index: number, value: number) {
    return index;
  }

  home() {
    if (this.userType == 11) {
      this.appCtrl.getRootNav().setRoot(POwnerHomePage)
    }
    else if (this.userType == 12) {
      this.appCtrl.getRootNav().setRoot(PManagerHomePage)
    }
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }

  showOldProduct()
  {    let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();
    console.log(this.pumpId,this.productId)
    this.reportData.getOldProductRates(this.pumpId,this.productId).subscribe(res=>{
      console.log(res);
      loading.dismiss();
      this.oldProductList=res;
    });
  }
  ProductSelect(value){
    console.log(value);
    this.productId=value;
   this.showOldProduct();
  }
}
