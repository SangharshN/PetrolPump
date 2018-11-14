import { DateTime, ToastController, Platform, LoadingController, PopoverController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { DsmHomePage } from '../dsm-home/dsm-home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { CreditSale } from '../../../app/credit.sale';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { SalesDataProvider } from '../../../providers/sales-data/sales-data';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
@IonicPage()
@Component({
  selector: 'page-credit-sale',
  templateUrl: 'credit-sale.html',
})
export class CreditSalePage {
  user: FormGroup;
  public payModeId: number;
  public driverName: string;
  public crequest = new CreditSale
  public crequests: CreditSale[];
  public pumpList = [];
  public DSMList: any;
  public nozzleList = [];
  public paymodeList = [];
  public man: any;
  public pumpId: number;
  public username: string;
  public Detail: any;
  public employeeId: number;
  public transporterId: number;
  public transporterName: string;
  public fuelRequested: number;
  public cashRequested: number;
  public created_at: DateTime;
  public errorMsg;
  public managerId: number;
  public tdriverList: any;
  public pumpListFilter: any;
  public success: any;
  public prodRate: any;
  public prodRateList: any;
  public nozzleId: any;
  public fuelActual: any;
  public transporterdriver: boolean;
  public unit: boolean = false;
  public unitName: boolean = true;
  public totalizer = 0;
  public mobileNo: number;
  nozzleListFilter: any;
  toFix: any;
  myphoto: any;
  showEmpty: boolean;
  descending: boolean = false;
  transporter: boolean = false;
  greeting: string;
  public successfull: any;
  Blanket: any;
  shiftId: any;
  i: any;
  public query = '';
  countries = [];
  search = '';
  currentDate: string = new Date().toLocaleDateString();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    public platform: Platform,
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    public basicData: BasicDataProvider,
    public salesData: SalesDataProvider,
    public storage: Storage,
    public popoverCtrl: PopoverController,
    public transData: TransDataProvider,
    public appCtrl: App) {
    this.user = new FormGroup({
      invoiceNo: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      fuelActual: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      nozzle: new FormControl({ value: '' }, Validators.compose([Validators.required])),
    });
    this.crequest.requestComplete = 'N';
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot(DsmHomePage);
      backAction();
    }, 1)
  }
  ionViewDidLoad() {
    this.storage.get('pumpId').then((val) => {
      this.pumpId = val;
      this.showRequests();
      this.showPaymode();
      this.showRates();
    });
    this.storage.get('employeeId').then((val) => {
      this.employeeId = val;
    });
    this.storage.get('username').then((val) => {
      this.username = val;
    });
    this.storage.get('shiftId').then((val) => {
      this.shiftId = val;
      this.showNoozle();
    });
    this.storage.get('managerId').then((val) => {
      this.managerId = val;
      this.showNoozle();
    });
  }
  showRequests() {
    this.salesData.getRequests(this.pumpId)
      .subscribe(res => {
        this.crequests = res.filter(v => v.status == 1);
        for (this.i = 0; this.i < this.crequests.length; this.i++) {
          this.pumpList[this.i] = this.crequests[this.i].regNo;
        }
        console.log(this.pumpList)
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });

  }
  showPaymode() {
    this.salesData.getPayMode()
      .subscribe(res => {
        this.paymodeList = res;
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }
  showNoozle() {
    this.salesData.getDSMNozzles(this.pumpId, this.employeeId, this.totalizer)
      .subscribe(res => {
        this.nozzleList = res;
        this.crequest.nozzleId = this.nozzleList[0].nozzleId;
        this.crequest.empShiftId = this.nozzleList[0].empShiftId;
        this.crequest.machineId = this.nozzleList[0].machineId;
        this.crequest.DSMId = this.nozzleList[0].employeeId;
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }
  public onChange3(selVal): void {
    this.crequest.nozzleId = selVal.nozzleId;
    this.crequest.empShiftId = selVal.empShiftId;
    this.crequest.machineId = selVal.machineId;
    this.crequest.DSMId = selVal.employeeId;
  }
  public onRequestChange(selVal): void {
    this.crequest = this.crequests.find(vehicle => vehicle.regNo = selVal);
    this.transporterName = this.crequest.transporterName;
    this.created_at = this.crequest.created_at;

  }
  onCancelSearch(): void {

  }

  showDrivers() {
    this.transData.getTDrivers(this.transporterId)
      .subscribe(res => {
        this.tdriverList = res;
        this.tdriverList = res.filter(tdriver => tdriver.active == 1);

      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }

  filter() {
    if (this.query !== "") {
      if (this.query.length > 2) {
        this.pumpListFilter = this.pumpList.filter(function (el) {
          return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
        if (this.pumpListFilter.length == 0) {
          this.showEmpty = true;
        }
        else {
          this.showEmpty = false;
        }
      }

    } else {
      this.pumpListFilter = [];
    }
  }

  select(item) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.query = item;
    this.crequest.regNo = this.query;
    this.salesData.getDSMRequest(this.pumpId, item)
      .subscribe(res => {
        loading.dismiss();
        var success = JSON.stringify(res);
        var error = JSON.parse(success).errors;
        if (error == undefined || error == null) {
     
        this.query = '';
        this.DSMList = res;
        this.Blanket = 'Non Blanket';
        this.man = res;
        console.log(this.DSMList);
        this.nozzleListFilter = this.nozzleList.filter(v => v.productId == this.man.productId);
        this.crequest.managerId = this.man.managerId;
        this.crequest.requestId = this.man.id;
        this.crequest.transporterId = this.man.transporterId;
        this.crequest.pumpId=this.man.pumpId;
        this.crequest.fuelRequested = parseFloat(this.man.fuelRequested);
        this.prodRate = this.prodRateList.filter(v => v.id == this.man.productId)
        console.log(this.prodRate, this.nozzleListFilter.length);
        var success = JSON.stringify(res);
        var error = JSON.parse(success).errors;

        this.crequest.fuelRequested = parseFloat(this.man.fuelRequested);
      
        if (this.man.requestType == 2) {
          console.log(this.prodRate[0].currentRate)
          this.crequest.fuelRequested = this.crequest.fuelRequested / this.prodRate[0].currentRate;
          this.toFix = this.crequest.fuelRequested;
          this.crequest.fuelRequested = this.toFix.toFixed(2);
          console.log(this.crequest.fuelRequested);
          this.transporter = true;
          this.unit = true;
          this.unitName = false;
        }
        if (this.nozzleListFilter.length == 0) {
          this.transporter = false;
          this.basicData.sendErrorNotification("You don't have valid Nozzle to fill this vehicle");
        }
        else {
          this.transporter = true;
        }
        
      }
      else {
        this.query = '';
        this.basicData.sendErrorNotification(error);
      } 
    },err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      }); 
     
    }

  sendOtp() {
    console.log(this.crequest.tdriverId, this.mobileNo, this.driverName);
    this.salesData.sendOTPForBlanket(this.pumpId, this.crequest.tdriverId, this.man.regNo).subscribe(res => {
      console.log(res);
    })
  }
  public onChange2(selVal2): void {
    this.crequest.tdriverId = selVal2.id;
    this.mobileNo = selVal2.mobileNo;
    this.driverName = selVal2.name;
  }
  getBlanket(regNo) {
    this.crequest.regNo = regNo;
    this.salesData.getDSMBlanketRequest(this.pumpId, regNo, this.username, this.crequest.DSMId)
      .subscribe(res => {
        this.query = '';
        this.DSMList = res;
        this.Blanket = 'Blanket';
        this.man = res;
        this.crequest.managerId = this.man.managerId;
        this.crequest.requestId = this.man.id;
        this.transporterId = this.man.transporterId;
        this.crequest.transporterId = this.man.transporterId;
        this.crequest.pumpId=this.man.pumpId;
        console.log(this.man);
        var success = JSON.stringify(res);
        var error = JSON.parse(success).errors;

        this.crequest.fuelRequested = parseFloat(this.man.fuelRequested);
        if (error == undefined || error == null) {
          console.log("hii")
          this.transporter = true;
          this.transporterdriver = true;
          this.showDrivers();
        }
        else {
          this.basicData.sendErrorNotification(error);
        }
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("Please Enter Valid Blanket Reg No");
      });
  }


  selectNozzleList(id) {
    this.Detail = id;
    this.crequest.nozzleId = this.Detail.nozzleId;
    this.crequest.empShiftId = this.Detail.empShiftId;
    this.crequest.machineId = this.Detail.machineId;
    this.crequest.DSMId = this.Detail.employeeId;
  }
  addRequest() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.user.valid) {
      if (this.crequest.regNo == undefined || this.crequest.regNo == null) {
        this.basicData.sendErrorNotification("Please select the RegNo. First");
        loading.dismiss();
      }
      else {
        if (this.crequest.fuelActual > this.crequest.fuelRequested) {
          this.basicData.sendErrorNotification("Fuel is greater than Fuel Requested");
          this.crequest.fuelActual = null;
          this.crequest.invoiceNo = null;
          loading.dismiss();
        }
        else if (this.crequest.fuelActual < 0) {
          this.basicData.sendErrorNotification("Enter valid Fuel");
          this.crequest.fuelActual = null;
          loading.dismiss();
        }
        else {
          if (this.myphoto !== undefined && this.success == undefined) {
            this.basicData.sendErrorNotification("Upload Image First");
            loading.dismiss();
          }
          else {
            this.crequest.updated_by = this.username;
            this.crequest.managerId = this.managerId;
            console.log(this.crequest);
            if (this.success == undefined || this.success == null) {
              console.log(this.crequest.requestId);
              this.salesData.getFuelDispense(this.crequest.requestId, this.crequest).
                subscribe(res => {
                  console.log(res);
                  this.successfull = JSON.stringify(res);
                  this.successfull = JSON.parse(this.successfull).error;

                  if (this.successfull == undefined || this.successfull == null) {
                    this.basicData.sendSuccessNotification("Fuel Dispense sent successfully");
                    this.appCtrl.getRootNav().setRoot(DsmHomePage);
                    loading.dismiss();
                  }
                  else {
                    this.basicData.sendErrorNotification(this.successfull);
                    loading.dismiss();
                  }

                }, err => {
                  this.errorMsg = err;
                  this.basicData.sendErrorNotification(err);
                  loading.dismiss();
                })
            } else {
              this.crequest.invoicePhoto = this.crequest.invoiceNo + '.jpg';
              console.log(this.crequest);
              this.salesData.getFuelDispense(this.crequest.requestId, this.crequest).
                subscribe(res => {
                  this.successfull = JSON.stringify(res);
                  this.successfull = JSON.parse(this.successfull).error;

                  if (this.successfull == undefined || this.successfull == null) {
                    this.basicData.sendSuccessNotification("Fuel Dispense sent successfully");
                    this.appCtrl.getRootNav().setRoot(DsmHomePage);
                    loading.dismiss();
                  }
                  else {
                    this.basicData.sendErrorNotification(this.successfull);
                    loading.dismiss();
                  }

                }, err => {
                  this.errorMsg = err;
                  this.basicData.sendErrorNotification(err);
                  loading.dismiss();
                })
            }
          }
        }
      }
    }
    else {
      this.user.controls['invoiceNo'].markAsTouched();
      this.user.controls['nozzle'].markAsTouched();
      this.user.controls['fuelActual'].markAsTouched();
      loading.dismiss();
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
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      // Handle error
    });
  }

  showRates() {
    this.salesData.getProductRates(this.pumpId)
      .subscribe(res => {
        this.prodRateList = res;
        console.log(this.prodRateList);
      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }

  uploadImage() {
    if (this.myphoto == undefined) {
      this.basicData.sendErrorNotification("Please Capture image first");
    }
    else {
      //Show loading
      let loader = this.loadingCtrl.create({
        content: "Uploading..."
      });
      loader.present();
      //create file transfer object
      const fileTransfer: FileTransferObject = this.transfer.create();
      //random int
      // var random = Math.floor(Math.random() * 100);
      //option transfer
      let options: FileUploadOptions = {

        fileKey: 'photo',
        fileName: "myImage_" + this.crequest.invoiceNo + ".jpg",
        chunkedMode: false,
        httpMethod: 'post',
        mimeType: "image/jpeg",
        headers: {}
      }


      fileTransfer.upload(this.myphoto, 'http://45.252.188.68/api/creditSales/uploadInvoicePhoto', options)
        .then((data) => {
          this.success = data;
          this.basicData.sendSuccessNotification("Image Uploaded successfully");
          loader.dismiss();
        }, (err) => {
          console.log(err);

          loader.dismiss();
        });
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
