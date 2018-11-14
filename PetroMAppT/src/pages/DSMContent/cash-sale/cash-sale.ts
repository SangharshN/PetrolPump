import { BasicDataProvider } from './../../../providers/basic-data/basic-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, App, ToastController, Platform, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DsmHomePage } from '../dsm-home/dsm-home';
import { FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { CashSale } from '../../../app/cash.sale';
import { Driver } from '../../../app/driver';
import { Product } from '../../../app/product';
import { SalesDataProvider } from '../../../providers/sales-data/sales-data';
@IonicPage()
@Component({
  selector: 'page-cash-sale',
  templateUrl: 'cash-sale.html',
})
export class CashSalePage {
  user: FormGroup;
  other: FormGroup;
  textInput = new FormControl('');
  public cashsale = new CashSale;
  public drivers: Driver[];
  public products: Product[];
  public product = new Product;
  public success: any;
  public error: any;
  public managerId: number;
  public empShiftId: number;
  public selectList: any;
  public noozleList: any;
  public driversList: any[];
  toFix: any;
  showEmpty: boolean;
  public cb_vehicelchanged: boolean = false;;
  hideTakePhotoButton: boolean = false;
  public paymodeList: any[] = [];
  public nozzleList: any[] = [];
  public employeeId: number;
  public nozzleId: number;
  public successfull: any;
  public fuelType: any;
  public username: string;
  public productName:string;
  public showProductboolean:boolean=false;
  public isTotalizer = 0;
  myphoto: any;
  // public amount: number;
  public selectp: Boolean = false;
  public query = '';
  constructor(public navCtrl: NavController,
    public toast: ToastController,
    public platform: Platform,
    public popoverCtrl: PopoverController,
    public basicData: BasicDataProvider,
    public salesData: SalesDataProvider,
    private camera: Camera,
    public appCtrl: App,
    private loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    public storage: Storage) {
    this.cashsale.invoiceNo = "";
    this.cashsale.vehicleNo = "";
    this.textInput
      .valueChanges
      .debounceTime(500)
      .subscribe(value => this.cashsale.quantity = value);
    console.log(this.cashsale.quantity);
    this.user = new FormGroup({
      amount: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      paymode: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      invoiceNo: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      nozzle: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      quantity: new FormControl({ value: '' }, Validators.compose([Validators.required])),

    });
    this.other = new FormGroup({
      vehicleNo: new FormControl({ value: '' }, Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]*')])),
    });
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot(DsmHomePage);
      backAction();
    }, 1)
  }
  ionViewDidLoad() {
    //this.basicData.Loader();
    this.storage.get('pumpId').then((val) => {
      this.cashsale.pumpId = val;
      this.showDrivers();
      this.showProducts();
      this.showRates();
    });
    this.storage.get('employeeId').then((val) => {
      this.employeeId = val;
      this.showPaymode();
    });

    this.storage.get('empShiftId').then((val) => {
      this.empShiftId = val;
    });
    this.storage.get('username').then((val) => {
      this.username = val;
      console.log(this.username);
      this.showNoozle();
    });
    this.storage.get('managerId').then((val) => {
      this.managerId = val;
    });

  }
  onChangeTime() {
    this.textInput
      .valueChanges
      .debounceTime(1000)
      .subscribe(value => this.cashsale.quantity = value);
    this.cashsale.amount = this.cashsale.quantity * this.cashsale.currentRate;
    this.toFix = this.cashsale.amount;
    this.cashsale.amount = this.toFix.toFixed(2);
  }
  onInputTime() {
  }
  onChangeAmount() {
    this.textInput
      .valueChanges
      .debounceTime(1000)
      .subscribe(value => this.cashsale.amount = value);
    this.cashsale.quantity = this.cashsale.amount / this.cashsale.currentRate;
    this.toFix = this.cashsale.quantity;
    this.cashsale.quantity = this.toFix.toFixed(2);

  }
  showRates() {
    this.salesData.getProductRates(this.cashsale.pumpId)
      .subscribe(res => {
        this.fuelType = res;
      }, err => {

        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }
  showDrivers() {
    this.salesData.gelLoyaltyDriver(this.cashsale.pumpId)
      .subscribe(res => {
        this.driversList = res;
        this.drivers = res;
        for (var i = 0; i < this.driversList.length; i++) {
          this.driversList[i] = this.driversList[i].driverMobileNo;
        }
        console.log(res)
      }, err => {

        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }
  showProducts() {
    this.salesData.getProducts(this.cashsale.pumpId)
      .subscribe(res => {
        this.products = res.filter(product => product.category == 'Fuel');
      }, err => {

        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }
  onProductChange(selVal) {
    this.product = this.products.find(p => p.id == selVal);
  }
  addCashSale() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.cb_vehicelchanged == true) {
      if (this.other.valid) {
        // if (this.success == undefined) {
        //   this.basicData.sendErrorNotification("Please Upload image first");
        //   loading.dismiss();
        // }
        if (this.user.valid) {
          this.cashsale.empShiftId = this.empShiftId;
          this.cashsale.DSMId = this.employeeId;
          this.cashsale.updated_by = this.username;
          this.cashsale.vehicleChanged = this.cb_vehicelchanged;
          this.cashsale.vehiclePhoto = this.cashsale.vehicleNo + '.jpg';
          this.cashsale.managerId = this.managerId;
          this.salesData.addCashSale(this.cashsale).
            subscribe(res => {
              //     this.basicData.sendSuccessNotification("Cash Loyality Added Successfully"+res);
              //  this.appCtrl.getRootNav().setRoot(DsmHomePage);
              this.successfull = JSON.stringify(res);
              this.successfull = JSON.parse(this.successfull).error;
              console.log(res)
              if (this.successfull == undefined || this.successfull == null) {
                loading.dismiss();
                this.basicData.sendSuccessNotification("Cash Loyality Added Successfully");
                this.appCtrl.getRootNav().setRoot(DsmHomePage);
              }
              else {
                this.basicData.sendErrorNotification(this.successfull);
                loading.dismiss();
              }
            }, err => {

              this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!" + err);
              loading.dismiss();
            })
        }
        else {
          this.user.controls['amount'].markAsTouched();
          this.user.controls['nozzle'].markAsTouched();
          this.user.controls['invoiceNo'].markAsTouched();
          this.user.controls['paymode'].markAsTouched();
          loading.dismiss();
        }
      }
      else {
        this.other.controls['vehicleNo'].markAsTouched();
        loading.dismiss();
      }
    }
    else {
      if (this.user.valid) {
        this.cashsale.empShiftId = this.empShiftId;
        this.cashsale.DSMId = this.employeeId;
        this.cashsale.vehicleChanged = this.cb_vehicelchanged;

        this.cashsale.updated_by = this.username;
        this.cashsale.managerId = this.managerId;
        console.log(this.cashsale);
        this.salesData.addCashSale(this.cashsale).subscribe
          (res => {
            this.successfull = JSON.stringify(res);
            this.successfull = JSON.parse(this.successfull).error;
            console.log(res)
            if (this.successfull == undefined || this.successfull == null) {
              this.basicData.sendSuccessNotification("Cash Loyality Added Successfully");
              this.appCtrl.getRootNav().setRoot(DsmHomePage);
              loading.dismiss();
            }
            else {
              this.basicData.sendErrorNotification(this.successfull);
              loading.dismiss();
            }
            console.log(res);
          }, err => {

            this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!" + err);
            console.log(err);
            loading.dismiss();

          })
      }
      else {

        this.user.controls['amount'].markAsTouched();
        this.user.controls['nozzle'].markAsTouched();
        this.user.controls['invoiceNo'].markAsTouched();
        this.user.controls['paymode'].markAsTouched();
        loading.dismiss();
      }
    }
  }
  filter() {
    if (this.query !== "") {
      if (this.query.length > 2) {
        this.driversList = this.drivers.filter(function (el) {
          return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
        if (this.driversList.length == 0) {
          this.showEmpty = true;
        }
        else {
          this.showEmpty = false;
        }
      }
    }
    else {
      this.driversList = [];
    }
  }
  select(item) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.query = item;
    this.salesData.getCashDriverRequest(this.cashsale.pumpId, this.query)
      .subscribe(res => {
        loading.dismiss();
        this.query = '';
        this.selectp = true;
        this.selectList = res;
        console.log(res);
        this.cashsale.driverMobileNo = this.selectList.driverMobileNo;
        this.cashsale.pumpId = this.selectList.pumpId;
        this.cashsale.updated_by = this.selectList.updated_by;
        this.cashsale.vehicleNo = this.selectList.vehicleNo;
      }, err => {

        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }
  showPaymode() {
    this.salesData.getPayMode()
      .subscribe(res => {
        this.paymodeList = res;
      }, err => {

        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }
  showNoozle() {
    this.salesData.getDSMNozzles(this.cashsale.pumpId, this.employeeId, this.isTotalizer)
      .subscribe(res => {
        this.nozzleList = res;
      }, err => {

        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }
  selectPaymodeList(id) {
    this.cashsale.payModeId = id;
  }
  selectNozzleList(noozleList) {
    console.log(noozleList);
    this.cashsale.nozzleId = noozleList.nozzleId;
    this.cashsale.empShiftId = noozleList.empShiftId;
    this.cashsale.machineId = noozleList.machineId;
    this.cashsale.DSMId = noozleList.employeeId;
    this.cashsale.unitName = noozleList.unitName;
    this.cashsale.currentRate = noozleList.currentRate;
    this.productName=noozleList.productName;
    this.showProductboolean=true;
  }

  vehcileChanged() {
    if (this.cb_vehicelchanged == false) {
      this.hideTakePhotoButton = false;
    }
    else {
      this.hideTakePhotoButton = true;
    }
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 150,
      targetWidth: 200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {

      this.myphoto = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      // Handle error
    });
  }


  uploadImage() {
    if (this.myphoto == undefined) {
      this.basicData.sendErrorNotification("Please Capture image first");
    }
    else {
      if (this.cashsale.vehicleNo == null || this.cashsale.vehicleNo == undefined) {

        this.basicData.sendErrorNotification("Please Enter vehicle No");
      }
      else {

        let loader = this.loadingCtrl.create({
          content: "Uploading..."
        });
        loader.present();
        //create file transfer object
        const fileTransfer: FileTransferObject = this.transfer.create();
        //random int
        //var random = Math.floor(Math.random() * 100);
        //option transfer
        let options: FileUploadOptions = {

          fileKey: 'photo',
          fileName: "myImage_" + this.cashsale.vehicleNo + ".jpg",
          chunkedMode: false,
          httpMethod: 'post',
          mimeType: "image/jpeg",
          headers: {}
        }

        fileTransfer.upload(this.myphoto, 'http://45.252.188.68/api/loyaltySales/uploadRegNoPhoto', options)
          .then((data) => {
            this.success = data;
            console.log(data);
            this.basicData.sendSuccessNotification("Image uploaded Successfully");
            loader.dismiss();
          }, (err) => {
            console.log(err);
            loader.dismiss();
          });
      }
    }

  }
  home() {
    this.appCtrl.getRootNav().setRoot(DsmHomePage);
  }
  popover(myEvent) {
    let popover = this.popoverCtrl.create('DsmPopPage');
    popover.present({
      ev: myEvent
    });
  }
}
