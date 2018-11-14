
import { Component } from "@angular/core";
import { NavController, AlertController, App, ToastController, MenuController, Platform, Events } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { User } from "../../../app/user";
import { BasicDataProvider } from "../../../providers/basic-data/basic-data";
import { POwnerHomePage } from "../../POwnerContent/p-owner-home/p-owner-home";
import { PManagerHomePage } from "../../PMAnagerContent/p-manager-home/p-manager-home";
import { DsmHomePage } from "../../DSMContent/dsm-home/dsm-home";
import { TransporterPage } from "../../TransportersContent/transporter/transporter";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: FormGroup;
  public users = new User;
  public userType: any;
  public success: any;
  public empCount: any;
  public token: any;
  public username: any;
  photo:any;
  public error: any;
  driverCount: number;
  mgrCount: number;
  pumpCount: number;
  reqCount: number;
  vehicleCount: number;
  public activeCS: number;
  public activeLS: number;
  public rememberMe: boolean = false;
  public shiftId: number;
  public pumpId: string;
  public transporterId: string;
  public transCount: any;
  public employeeId: number;
  public managerId: number;
  public empShiftId: number;
  public password: any;
  public name: string;
  password_type: string = 'password';
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public storage: Storage,
    public appCtrl: App,
    public events:Events,
    public platform: Platform,
    public modalCtrl: ModalController,
    public toast: ToastController,
    public formBuilder: FormBuilder,
    public basicData: BasicDataProvider,
  ) {
    this.menu.swipeEnable(false);
    this.user = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    let backAction = this.platform.registerBackButtonAction(() => {
      // omitted;
      let alert = this.alertCtrl.create({
        // title: 'Confirm purchase',
        message: 'Do you really want to exit?',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.appCtrl.getRootNav().setRoot(LoginPage);
            }
          },
          {
            text: 'Ok',
            handler: () => {
              platform.exitApp();

            }
          }
        ]
      });
      alert.present();
      backAction();
    }, 1)
  }
  ionViewDidLoad() {
    // //this.basicData.Loader();
    this.storage.get('rememberMe').then((val) => {
      this.rememberMe = val;
      console.log(this.rememberMe);
      if (this.rememberMe == true) {
        this.storage.get('username').then((val) => {
          this.username = val;
        })
        this.storage.get('password').then((val) => {
          this.password = val;
        })
      }
    }, err => {
      this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
    });
  }
  login() {
    if (this.rememberMe) {
      console.log("hi");
      this.storage.set('rememberMe', this.rememberMe);
      this.storage.set('password', this.password);
      console.log(this.password)
    }
    this.users.username = this.user.controls['username'].value;
    this.users.password = this.user.controls['password'].value;

    if (this.user.valid) {
      this.basicData.loginCheck(this.users)
        .subscribe(status => {

          this.success = JSON.stringify(status);
          this.error = JSON.parse(this.success).error;
          var string = this.password;
          string.toLowerCase();
          console.log(string);
          if (this.error == "Unauthorised") {
            this.basicData.sendErrorNotification("Not valid user/password");
          }
          else {
            if (string === 'welcome') {
              console.log(string);
              this.navCtrl.setRoot('ChangePasswordPage');
              this.storage.set('username', this.users.username);
            }
            else {
              console.log(status);
              this.events.publish('user:created', status);
              this.empCount = status.allCount.empCount;
              this.transCount = status.allCount.transCount;
              this.driverCount = status.allCount.driverCount;
              this.mgrCount = status.allCount.mgrCount;
              this.pumpCount = status.allCount.pumpCount;
              this.reqCount = status.allCount.reqCount;
              this.vehicleCount = status.allCount.vehicleCount;
              this.token = JSON.parse(this.success).token;
              this.userType = JSON.parse(this.success).userType;
              this.pumpId = JSON.parse(this.success).pumpId;
              this.transporterId = JSON.parse(this.success).transporterId;
              this.employeeId = JSON.parse(this.success).employeeId;
              this.managerId = JSON.parse(this.success).managerId;
              this.empShiftId = JSON.parse(this.success).empShiftId;
              this.shiftId = JSON.parse(this.success).shiftId;
              this.name = JSON.parse(this.success).name;
              this.photo=JSON.parse(this.success).photo;
              this.activeCS = JSON.parse(this.success).activeCS;
              this.activeLS = JSON.parse(this.success).activeLS;
              this.storage.set('driverCount', this.driverCount);
              this.storage.set('mgrCount', this.mgrCount);
              this.storage.set('pumpCount', this.pumpCount);
              this.storage.set('reqCount', this.reqCount);
              this.storage.set('vehicleCount', this.vehicleCount);
              this.storage.set('empCount', this.empCount);
              this.storage.set('transCount', this.transCount);
              this.storage.set('username', this.users.username);
              this.storage.set('userType', this.userType);
              this.storage.set('pumpId', this.pumpId);
              this.storage.set('transporterId', this.transporterId);
              this.storage.set('employeeId', this.employeeId);
              this.storage.set('managerId', this.managerId);
              this.storage.set('empShiftId', this.empShiftId);
              this.storage.set('shiftId', this.shiftId);
              this.storage.set('name', this.name);
              this.storage.set('activeCS', this.activeCS);
              this.storage.set('activeLS', this.activeLS);
              this.storage.set('photo', this.photo);
              console.log("phot"+this.photo)
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
          }

        }, err => {
          this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
        });
    }
    else {
      this.user.controls['username'].markAsTouched();
      this.user.controls['password'].markAsTouched();
      this.user.controls['remeberMe'].markAsTouched();
    }
  }

  forgotPass() {
    this.navCtrl.setRoot('ForgetPasswordPage');
  }

  // showAlert(title, subTitle) {
  //   let myalert = this.alertCtrl.create({
  //     title: title,
  //     subTitle: subTitle,
  //     buttons: ['ok']
  //   });
  //   myalert.present();
  // }

  togglePasswordMode() {
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }
  set() {

  }
}
