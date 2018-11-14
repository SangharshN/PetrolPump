import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, ToastController, PopoverController, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TransporterPage } from '../transporter/transporter';
import { PaymentEntry } from '../../../app/paymentEntry';
import { Region } from '../../../app/region';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { CreditDataProvider } from '../../../providers/credit-data/credit-data';
import { SalesDataProvider } from '../../../providers/sales-data/sales-data';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';

/**
 * Generated class for the PaymentEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payment-entry',
  templateUrl: 'payment-entry.html',
})
export class PaymentEntryPage {
  public payment = new PaymentEntry;
  public transporterId: number;
  public query = '';
  public pumpList: any;
  public regions: any;
  public billType: number;
  public state: any;
  public username: string;
  public creditBills: any;
  public amount: number;
  public categories: any;
  public paymodeList: any;
  //public sample:any;
  public pumpCashList:any[]=[];
  public pumpFuelList:any[]=[];
  public stateNameList: any[];
  public selectedRegions: any[];
  public selectp: boolean = false;
  public stateName: Region[] = [];
  constructor
    (public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public basicData: BasicDataProvider,
    public creditData: CreditDataProvider,
    public salesData: SalesDataProvider,
    public toast: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public appCtrl: App,
    public transData: TransDataProvider,
    public popoverCtrl: PopoverController
    ) {

    this.categories = "paymentCash";
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot(TransporterPage);
      backAction();
    }, 1)
  }

  ionViewDidLoad() {     //this.basicData.Loader();
    this.payment.payModeId = 1;
    this.storage.get('transporterId').then((val) => {
      this.transporterId = val;
      this.showPumps();
    });
    this.storage.get('username').then((val) => {
      this.username = val;
    });
  }

  showPumps() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.transData.getCreditBillList(this.transporterId)
      .subscribe(res => {
        loading.dismiss();
        this.pumpList = res;
        this.pumpCashList=res.filter(v=>v.billType==1);
        this.pumpFuelList=res.filter(v=>v.billType==2);
        console.log(this.pumpCashList,this.pumpFuelList);
      }, err => {

        this.basicData.sendErrorNotification("There is some iasssue. Please TRY again!!!");
      })
   }


  popover(myEvent) {
    let popover = this.popoverCtrl.create('TranspopPage');
    popover.present({
      ev: myEvent
    });
  }
  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  home() {
    this.navCtrl.setRoot(TransporterPage);
  }

  PaymentDetailPage(id) {
    this.navCtrl.setRoot("PaymentDetailPage",{
      param:id
    });
  }
  menuClick() {
    this.basicData.checkTransCount();
  }
}
