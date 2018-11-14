
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { resetPassword } from '../../../app/resetPassword';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { POwnerHomePage } from '../../POwnerContent/p-owner-home/p-owner-home';
import { PManagerHomePage } from '../../PMAnagerContent/p-manager-home/p-manager-home';
import { DsmHomePage } from '../../DSMContent/dsm-home/dsm-home';
import { TransporterPage } from '../../TransportersContent/transporter/transporter';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  public userInfo = new resetPassword;
  user: FormGroup;
  public username: string;
  public password: string;
  public userType: any;
  public opassword: any = '';
  public npassword: any = '';
  public cpassword: any = '';
  public success: any;
  public changePassword: any;
  public show: boolean = true;
  password_type: string = 'password';
  password_type1: string = 'password';
  password_type2: string = 'password';
  constructor(public navCtrl: NavController,
    public storage: Storage,
    public appCtrl:App,
    public platform:Platform,
    public loadingCtrl:LoadingController,
    public basicData: BasicDataProvider,
    public navParams: NavParams) {
    this.user = new FormGroup({
      opassword: new FormControl({ value: '' }, Validators.compose([Validators.required,])),
      npassword: new FormControl({ value: '' }, Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$])(?=.{8,20})/)])),
      cpassword: new FormControl({ value: '' }, Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$])(?=.{8,20})/)])),
    });
    
  }

  ionViewDidLoad() {
    this.changePassword = this.navParams.get('userInfo');
    console.log(this.changePassword);
    this.storage.get('userType').then((val) => {
      this.userType = val;
    });
    if (this.changePassword !== undefined) {
      this.show = false;
    }
    this.storage.get('username').then((val) => {
      this.username = val;
    });
    this.storage.get('password').then((val) => {
      this.password = val;
    });
  

  }
  home()
  {
    if (this.changePassword == undefined || this.changePassword == null) 
    {
      console.log(this.userType)
      switch (this.userType) {
        case '11':
       this.appCtrl.getRootNav().setRoot(POwnerHomePage);
          break;
        case '12':
       this.appCtrl.getRootNav().setRoot(PManagerHomePage);
          break;
        case '13':
       this.appCtrl.getRootNav().setRoot(DsmHomePage);
          break;
        case '21':
       this.appCtrl.getRootNav().setRoot(TransporterPage);
          break;
        case '22':
       this.appCtrl.getRootNav().setRoot(TransporterPage);
          break;
      }
    }
else
{
this.appCtrl.getRootNav().setRoot(LoginPage);
}
  }
  submit() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.changePassword == undefined || this.changePassword == null) {
      if (this.user.valid) {
        if (this.password = this.opassword) {
          if (this.cpassword == this.npassword)
            if (this.npassword == this.opassword) {
              this.basicData.sendErrorNotification("New Password cannot be same as your current password. Please choose a different password.")
           loading.dismiss();
            }
            else {
              this.userInfo.username = this.username;
              //  this.userInfo.userType = this.userType;
              this.userInfo.password = this.npassword;
              console.log(this.userInfo)
              this.basicData.verifyOtp(this.userInfo).subscribe(res => {
                this.success = JSON.stringify(res);
                this.success = JSON.parse(this.success).error;
                console.log(this.success)
                if (this.success == undefined || this.success == null) {
                  loading.dismiss();
                  this.basicData.sendSuccessNotification("Password Change Successfully");
               this.appCtrl.getRootNav().setRoot(LoginPage);
       
                }
                else {
                  this.basicData.sendSuccessNotification("" + this.success);
                  loading.dismiss();
                }
              })
            }
          else {
            this.basicData.sendErrorNotification("Password doesn't Match");
            loading.dismiss();
          }
        }
        else {
          this.basicData.sendErrorNotification("Old password is not correct");
          loading.dismiss();
        }
      }
    }
    else {
      this.resetPassword();
      loading.dismiss();
    }
  }
  togglePasswordMode() {
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }
  togglePasswordMode1() {
    this.password_type1 = this.password_type1 === 'text' ? 'password' : 'text';
  }
  togglePasswordMode2() {
    this.password_type2 = this.password_type2 === 'text' ? 'password' : 'text';
  }
  resetPassword() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.cpassword == this.npassword) {
      this.userInfo.username = this.changePassword.username;
      this.userInfo.mobileNo = this.changePassword.mobileNo;
      this.userInfo.password = this.npassword;
      console.log(this.userInfo)
      this.basicData.verifyOtp(this.userInfo).subscribe(res => {
        this.success = JSON.stringify(res);
        this.success = JSON.parse(this.success).error;
        if (this.success == undefined || this.success == null) {
          loading.dismiss();
          this.basicData.sendSuccessNotification("Password Change Successfully");
       this.appCtrl.getRootNav().setRoot(LoginPage);
    
        }
        else {
          this.basicData.sendSuccessNotification("" + this.success);
          loading.dismiss();
        }
      })
    }
    else {
      this.basicData.sendErrorNotification("Password doesn't Match")
      loading.dismiss();
    }
  }

}
