import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, ToastController, Platform, AlertController, LoadingController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import { Keyboard } from '@ionic-native/keyboard';
import { DsmHomePage } from '../dsm-home/dsm-home';
import { RegularSale } from '../../../app/regular-sale';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { SalesDataProvider } from '../../../providers/sales-data/sales-data';
import { PumpDataProvider } from '../../../providers/pump-data/pump-data';


@IonicPage()
@Component({
  selector: 'page-regular-cash',
  templateUrl: 'regular-cash.html',
})
export class RegularCashPage {
  textInput = new FormControl('');
  public regular = new RegularSale;
  public sampleList: any[] = [];
  public credit: number;
  public loyality: number;
  public regularCash: any;
  public loySale: any;
  toFix: any;
  pendingAmount: number;
  showPending: boolean;
  public pumpId: any;
  public employeeId: any;
  public managerId: number;
  public username: any;
  public activeCS:number;
  public activeLS:number;
  public totalCashPayable: any;
  public cashDifference: any;
  public loyalitySale: any[] = [];
  public payModeList: any[];
  public payMentList: any[];
  public amount: any;
  public empShiftId: any;
  public totalSales: any;
  public loyaltyHide: boolean;
  public total: number;
  public shiftId: any;
  public balanceAmount: number;
  public totalBalance: number;
  public sample = 0;
  public saleType = 2;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toast: ToastController,
              public keyboard: Keyboard,
              public popoverCtrl: PopoverController,
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public appCtrl: App,
              public alertCtrl: AlertController,
              public basicData: BasicDataProvider,
              public platform: Platform,
              public salesData: SalesDataProvider,
              public pumpData: PumpDataProvider) {
    this.totalCashPayable;
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot(DsmHomePage);
      backAction();
    }, 2)
  }

  ionViewDidLoad() {
    this.storage.get('pumpId').then((val) => {
      this.pumpId = val;
    });
    this.storage.get('empShiftId').then((val) => {
      this.empShiftId = val;
    });

    this.storage.get('employeeId').then((val) => {
      this.employeeId = val;
    });

    this.storage.get('managerId').then((val) => {
      this.managerId = val;
    });
    this.storage.get('activeCS').then((val) => {
      this.activeCS = val;
    });
    this.storage.get('activeLS').then((val) => {
      this.activeLS = val;
    });

    this.storage.get('username').then((val) => {
      this.username = val;
    });

    this.storage.get('shiftId').then((val) => {
      this.shiftId = val;
      this.showTotalSales();
      this.showPaymode();
      this.showPaymodeLoyality();
    });
  }

  setListSero() {
    var i;
    this.payMentList = [];
    for (i = 0; i < this.payModeList.length; i++) {
      this.payMentList[i];
    }
  }

  onChangeAmount() {
    // var amount = event;
    var totalAmount = 0;
    var i = 0;
    var count = 0;
    for (i = 0; i < this.payModeList.length; i++) {

      if (this.payMentList[i] == undefined) {
        console.log(totalAmount);
      }
      else {
        totalAmount += parseFloat(this.payMentList[i]);
        count = i;
      }

    }
    if (this.regularCash === undefined) {

      this.regularCash = 0;
      console.log(this.regularCash);
    }
    this.sample = this.totalBalance - totalAmount;
    if (this.sample < 0) {
      let alert = this.alertCtrl.create({
        message: 'Enter valid regular entry',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
            handler: () => {

            }
          }
        ]
      });
      alert.present();

    }

    else {
      console.log(this.totalBalance, totalAmount);
      this.totalCashPayable = parseFloat(this.regularCash) + parseFloat(this.payMentList[0]);
      console.log(this.totalBalance, totalAmount);
      this.balanceAmount = this.totalBalance - totalAmount;
      this.toFix = this.balanceAmount;
      this.balanceAmount = this.toFix.toFixed(2);

      console.log(this.balanceAmount, this.totalCashPayable, this.regularCash, this.payMentList[0]);
    }

  }

  onInputTime() {
  }

  showPaymode() {
    this.salesData.getPayMode().subscribe(res => {
      this.payModeList = res;
      this.setListSero();
    }, err => {

      this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
    });
  }

  showPaymodeLoyality() {
    this.salesData.getPayModeLoyality(this.pumpId, this.employeeId, this.empShiftId, this.saleType).subscribe(res => {
      this.loyalitySale = res;
      this.loySale = res;
      if (this.loyalitySale.length == 0) {
        this.loyaltyHide = false;
      }
      else {
        this.loyaltyHide = true;
      }
      var i = 0;
      for (i = 0; i < this.loyalitySale.length; i++) {
        if (this.loyalitySale[i].id == 1) {
          this.regularCash = this.loyalitySale[i].totalAmount;
        }
      }
      this.totalCashPayable = this.regularCash
    }, err => {

      this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
    });
  }

  showTotalSales() {
    console.log(this.pumpId, this.empShiftId, this.employeeId);
    this.salesData.getTotalSales(this.pumpId, this.empShiftId, this.employeeId).subscribe(res => {
      this.totalSales = res;
      console.log(res);
      this.total = this.totalSales.totalAmount;
      this.credit = this.totalSales.totalCreditAmount;
      this.loyality = this.totalSales.totalLoyaltyAmount;
      this.managerId = this.totalSales.managerId;
      this.totalBalance = this.total - (this.credit + this.loyality)
      this.balanceAmount = this.total - (this.credit + this.loyality)
      this.pendingAmount = this.totalSales.pendingAmount;
      if (this.pendingAmount == 0) {
        this.showPending = false;
      }
      else {
        this.showPending = true;
      }
      console.log("credit:" + this.credit, "loyality" + this.loyality, "total" + this.total, "tBalance:" + this.balanceAmount)
    }, err => {

      this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
    })
  }

  actual(event) {
    this.cashDifference = this.totalCashPayable - event;

  }

  submit() {
    console.log(":")
    if (this.sample < 0) {
      let alert = this.alertCtrl.create({
        message: 'Enter valid Regular Entry',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
            handler: () => {

            }
          }
        ]
      });
      console.log(":")
      alert.present();
    }
    else if (this.cashDifference < 0) {
      let alert = this.alertCtrl.create({
        message: 'Enter valid Cash to be paid',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
            handler: () => {

            }
          }
        ]
      });
      alert.present();
      console.log(":")
    }
    else {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      console.log(this.balanceAmount);
      if (this.balanceAmount == 0) {
        console.log("hii");
        for (var i = 0; i < this.payMentList.length; i++) {
          this.regular = new RegularSale();
          this.regular.balanceAmount = this.balanceAmount;
          this.regular.pumpId = this.pumpId;
          this.regular.empShiftId = this.empShiftId;
          this.regular.DSMId = this.employeeId;
          this.regular.managerId = this.managerId;
          this.regular.payModeId = this.payModeList[i].id;
          this.amount = this.payMentList[i];
          if (this.amount == undefined) {
            this.regular.amount = 0;
          }
          else {
            this.regular.amount = this.amount;
          }
          console.log(this.regular.amount);
          //  this.regular.cashSubmitted = this.actualCash;
          // this.regular.cashDifference = this.cashDifference;
          this.regular.updated_by = this.username;
          this.sampleList[i] = this.regular;
        }
        const myObjStr = JSON.stringify(this.sampleList);
        console.log(myObjStr);
        this.pumpData.addRegularCash(myObjStr).subscribe(res => {
          this.basicData.sendSuccessNotification("Regular Sale Entry Submitted Successfully");
          this.appCtrl.getRootNav().setRoot(DsmHomePage);
          loading.dismiss();
        }, err => {
          this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
          loading.dismiss();
        });
      }
      else {
        loading.dismiss();
        console.log("hii");
        this.basicData.sendErrorNotification("Please pay all Balance Amount");
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