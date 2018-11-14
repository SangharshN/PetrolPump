import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { resetPassword } from '../../../app/resetPassword';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {
  public userInfo = new resetPassword;
  public sendOtp: boolean = true;
  public enterOtp: boolean = false;
  public show: boolean = true;
  public hide: boolean = false;
  public isReadonly:boolean=false;
  public username: string;
  public success:any;
  public mobileNo: number;
  public otp: number;
  buttonName: string = "Send Otp";
  user: FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public basicData: BasicDataProvider) {
    this.userInfo.username = '';
    this.user = new FormGroup({
      username: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      mobileNo: new FormControl({ value: '' }, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
    });
  }

  ionViewDidLoad() {    
   // //this.basicData.Loader();
    console.log('ionViewDidLoad ForgetPasswordPage');
  }
  Submit() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.user.valid) {
      this.basicData.sendOtp(this.userInfo)
        .subscribe(res => {
          console.log(res);
          this.userInfo.userType=res.userType;
          this.userInfo.otp=res.otp;
          this.success = JSON.stringify(res);
          this.success=JSON.parse(this.success).error;
          console.log("4")
          if(this.success==undefined || this.success==null)
          {
          this.enterOtp = true;
          this.hide=true;
          this.show=false;
          this.isReadonly=true;
          loading.dismiss();
          }
          else
          {

            this.basicData.sendErrorNotification(""+this.success);
            loading.dismiss();
          }

        }, err => {
          this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
loading.dismiss();
        });
    }
    else {
      this.user.controls['username'].markAsTouched();
      this.user.controls['mobileNo'].markAsTouched();
      loading.dismiss();
    }
}
resetpassword()
{
  if(this.otp==this.userInfo.otp)
  {
this.navCtrl.setRoot('ChangePasswordPage', {
  userInfo:this.userInfo
} );

  }
console.log(this.userInfo);
}
}
