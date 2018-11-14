import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
import { Transporter } from '../../../app/transporter';
import { SalesDataProvider } from '../../../providers/sales-data/sales-data';

/**
 * Generated class for the PaymentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-detail',
  templateUrl: 'payment-detail.html',
})
export class PaymentDetailPage {
id:number;
amount:any;
updated_by:any;
PaymentDetail=new Transporter;
paymodeList:any[]=[];
  constructor(public navCtrl: NavController,
    public basicData:BasicDataProvider,
    public salesData:SalesDataProvider,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public transData:TransDataProvider, 
    public navParams: NavParams) {
      this.id = this.navParams.get('param');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentDetailPage');
    this.showBillDetail();
    this.showPaymode();
    this.storage.get('username').then((val) => {
      this.updated_by = val;
    });
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }
  showBillDetail()
  {    let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();
    this.transData.getBillDetails(this.id).subscribe(res=>{
      console.log(res);
      loading.dismiss();
      this.PaymentDetail=res;
      this.PaymentDetail.creditBillId=res.id;
    })
  }
  showPaymode() {
      this.salesData.getPayMode()
        .subscribe(res => {
          this.paymodeList = res;
          this.PaymentDetail.payModeId=res[0].id;
        }, err => {
  
          this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
        })
    }
    selectPaymodeList(id)
    {
console.log(id);
this.PaymentDetail.payModeId=id;
    }
    updateBill()
    {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      if(this.PaymentDetail.payModeId==undefined)
      {
        this.PaymentDetail.payModeId=this.paymodeList [0].id;
      }
      var payAmount=parseFloat(this.PaymentDetail.billAmount);
      if(this.amount>payAmount)
      {
        this.basicData.sendErrorNotification("Please enter valid amount");
        this.amount=null;
        loading.dismiss();
      }
      else
      {
        this.PaymentDetail.amount=this.amount;
   
      this.PaymentDetail.updated_by=this.updated_by;
      this.transData.updateBillPayment(this.PaymentDetail).subscribe(res=>{
        console.log(res);
        this.basicData.sendSuccessNotification("Payment Entry Done Successfully");
        this.navCtrl.setRoot("PaymentEntryPage");
        loading.dismiss();
      })
    }
    }
    home() {
      this.navCtrl.setRoot("PaymentEntryPage");
    }
    doRefresh(refresher) {
      this.ionViewDidLoad();
      setTimeout(() => {
        refresher.complete();
      }, 2000);
    }
}
