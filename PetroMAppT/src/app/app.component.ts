import { LoginPage } from './../pages/ALLContent/login/login';
import { TransporterPage } from './../pages/TransportersContent/transporter/transporter';
import { PManagerHomePage } from './../pages/PMAnagerContent/p-manager-home/p-manager-home';
import { POwnerHomePage } from './../pages/POwnerContent/p-owner-home/p-owner-home';
import { DsmHomePage } from './../pages/DSMContent/dsm-home/dsm-home';
import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, App, Events } from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';
import { BasicDataProvider } from '../providers/basic-data/basic-data';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
  badgeCount: any;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public userType: any;
  appMenuItems11: Array<MenuItem>;
  appMenuItems111:Array<MenuItem>;
  appMenuItems12: Array<MenuItem>;
  appMenuItems13: Array<MenuItem>;
  appMenuItems21: Array<MenuItem>;
  appMenuItems22: Array<MenuItem>;
  public rootPage: any;
  public password: any;
  public transporterId: number;
  public username: string;
  public name: string;
  public empCount: number;
  public transCount: number;
  public sample: any;
  public imgLink:any;
  driverCount: number;
  activeCS:number;
  userPhoto:any;
  same: boolean;
  mgrCount: number;
  pumpCount: number;
  reqCount: number;
  vehicleCount: number;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public appCtrl: App,
    public basicData:BasicDataProvider,
    public events: Events,
    public network: Network,
    public networkProvider: NetworkProvider,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public storage: Storage,
  ) {
    this.initializeApp();
  }

  public initializeApp() {


    this.events.subscribe('user:created', (user) => {
      console.log("img:"+user);
      this.userType = user.userType;
      this.empCount = user.allCount.empCount;
      this.transCount = user.allCount.transCount;
      this.driverCount = user.allCount.driverCount;
      this.userPhoto=user.photo;
      this.reqCount=user.allCount.reqCount;
      this.mgrCount = user.allCount.mgrCount;
      this.vehicleCount = user.allCount.vehicleCount;
      this.pumpCount = user.allCount.pumpCount;
      this.name = user.name;
      this.activeCS=user.activeCS;
      this.imgLink="http://45.252.188.68/storage/users/"+this.userPhoto;
      console.log("img:"+this.imgLink);
      this.appMenuItems11 = [
        { title: 'Home', component: POwnerHomePage, icon: 'home', badgeCount: '' },
        { title: 'Employees', component: "PumpEmployeePage", icon: 'ios-people', badgeCount: this.empCount },
        { title: 'Transporters', component: "PumpTransportersListPage", icon: 'md-car', badgeCount: this.transCount },
        { title: 'Product Rates', component: "ProductRatePage", icon: 'md-pricetags', badgeCount: '' },
        { title: 'Payment Reminder', component: "PaymentRequestPage", icon: 'ios-notifications', badgeCount: '' },
        { title: 'Payment Confirmation', component: "PaymentConfirmationPage", icon: 'ios-notifications', badgeCount: '' },
        { title: 'SMS Reports', component: "SmsReportPage", icon: 'ios-mail', badgeCount: '' },
        { title: 'Reports', component: "PumpReportPage", icon: 'md-paper', badgeCount: '' },
        { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
      ];
      this.appMenuItems111 = [
        { title: 'Home', component: POwnerHomePage, icon: 'home', badgeCount: '' },
        { title: 'Employees', component: "PumpEmployeePage", icon: 'ios-people', badgeCount: this.empCount },
       // { title: 'Transporters', component: "PumpTransportersListPage", icon: 'md-car', badgeCount: this.transCount },
        { title: 'Product Rates', component: "ProductRatePage", icon: 'md-pricetags', badgeCount: '' },
        { title: 'Payment Reminder', component: "PaymentRequestPage", icon: 'ios-notifications', badgeCount: '' },
        { title: 'SMS Reports', component: "SmsReportPage", icon: 'ios-mail', badgeCount: '' },
        { title: 'Reports', component: "PumpReportPage", icon: 'md-paper', badgeCount: '' },
        { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
      ];
      this.appMenuItems12 = [
        { title: 'Home', component: PManagerHomePage, icon: 'home', badgeCount: '' },
        { title: 'Employees', component: "PumpEmployeePage", icon: 'ios-people', badgeCount: this.empCount },
        { title: 'Cash Dispense', component: "CashDispensePage", icon: 'md-cash', badgeCount: '' },
        { title: 'Product Rates', component: "ProductRatePage", icon: 'md-pricetags', badgeCount: '' },
        { title: 'Payment Reminder', component: "PaymentRequestPage", icon: 'ios-notifications', badgeCount: '' },
        { title: 'Payment Confirmation', component: "PaymentConfirmationPage", icon: 'ios-notifications', badgeCount: '' },
        { title: 'Tank Dips', component: "TankDipsPage", icon: 'ios-thermometer-outline', badgeCount: '' },
        { title: 'Reports', component: "PumpReportPage", icon: 'md-paper', badgeCount: '' },
        { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
      ];

      this.appMenuItems13 = [
        { title: 'Home', component: DsmHomePage, icon: 'home', badgeCount: '' },
        { title: 'DSM Reports', component: "DsmReportsPage", icon: 'md-paper', badgeCount: '' },
        { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
      ];

      this.appMenuItems21 = [
        { title: 'Home', component: TransporterPage, icon: 'home', badgeCount: '' },
        { title: 'My Requests', component: "RequestListPage", icon: 'md-git-pull-request', badgeCount:this.reqCount},
        { title: 'My Managers', component: "ManagerListPage", icon: 'ios-people', badgeCount: this.mgrCount },
        { title: 'My Vehicles', component: "VehicleListPage", icon: 'md-car', badgeCount: this.vehicleCount },
        { title: 'My Drivers', component: "TDriverListPage", icon: 'ios-people', badgeCount: this.driverCount },
        { title: 'Payment Entry', component: "PaymentEntryPage", icon: 'md-cash', badgeCount: '' },
        { title: 'My Reports', component: "TransporterReportPage", icon: 'md-paper', badgeCount: '' },
        { title: 'My Pumps', component: "PumpListPage", icon: 'md-barcode', badgeCount: this.pumpCount },
        { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
      ];

      this.appMenuItems22 = [
        { title: 'Home', component: TransporterPage, icon: 'home', badgeCount: '' },
        { title: 'My Requests', component: "RequestListPage", icon: 'md-git-pull-request', badgeCount:this.reqCount },
        { title: 'My Vehicles', component: "VehicleListPage", icon: 'md-car', badgeCount: this.vehicleCount },
        { title: 'My Drivers', component: "TDriverListPage", icon: 'ios-people', badgeCount: this.driverCount },
        { title: 'Payment Entry', component: "PaymentEntryPage", icon: 'md-cash', badgeCount: '' },
        { title: 'My Reports', component: "TransporterReportPage", icon: 'md-paper', badgeCount: '' },
        { title: 'My Pumps', component: "PumpListPage", icon: 'md-barcode', badgeCount: this.pumpCount },
        { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
      ];
    });


    this.events.subscribe('user:updated', (user) => {
      console.log('Welcome', user);
      user = user;
      console.log(user);
      this.empCount = user.empCount;
      this.transCount = user.transCount

      this.appMenuItems11 = [
        { title: 'Home', component: POwnerHomePage, icon: 'home', badgeCount: '' },
        { title: 'Employees', component: "PumpEmployeePage", icon: 'ios-people', badgeCount: this.empCount },
        { title: 'Transporters', component: "PumpTransportersListPage", icon: 'md-car', badgeCount: this.transCount },
        { title: 'Product Rates', component: "ProductRatePage", icon: 'md-pricetags', badgeCount: '' },
        { title: 'Payment Reminder', component: "PaymentRequestPage", icon: 'ios-notifications', badgeCount: '' },
        { title: 'Payment Confirmation', component: "PaymentConfirmationPage", icon: 'md-cash', badgeCount: '' },
        { title: 'SMS Reports', component: "SmsReportPage", icon: 'ios-mail', badgeCount: '' },
        { title: 'Reports', component: "PumpReportPage", icon: 'md-paper', badgeCount: '' },
        { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
      ];
      this.appMenuItems111 = [
        { title: 'Home', component: POwnerHomePage, icon: 'home', badgeCount: '' },
        { title: 'Employees', component: "PumpEmployeePage", icon: 'ios-people', badgeCount: this.empCount },
       // { title: 'Transporters', component: "PumpTransportersListPage", icon: 'md-car', badgeCount: this.transCount },
        { title: 'Product Rates', component: "ProductRatePage", icon: 'md-pricetags', badgeCount: '' },
        { title: 'Payment Reminder', component: "PaymentRequestPage", icon: 'ios-notifications', badgeCount: '' },
        { title: 'SMS Reports', component: "SmsReportPage", icon: 'ios-mail', badgeCount: '' },
        { title: 'Reports', component: "PumpReportPage", icon: 'md-paper', badgeCount: '' },
        { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
      ];
      this.appMenuItems12 = [
        { title: 'Home', component: PManagerHomePage, icon: 'home', badgeCount: '' },
        { title: 'Employees', component: "PumpEmployeePage", icon: 'ios-people', badgeCount: this.empCount },
        { title: 'Cash Dispense', component: "CashDispensePage", icon: 'md-cash', badgeCount: '' },
        { title: 'Product Rates', component: "ProductRatePage", icon: 'md-pricetags', badgeCount: '' },
        { title: 'Payment Reminder', component: "PaymentRequestPage", icon: 'ios-notifications', badgeCount: '' },
        { title: 'Payment Confirmation', component: "PaymentConfirmationPage", icon: 'md-cash', badgeCount: '' },
        { title: 'Tank Dips', component: "TankDipsPage", icon: 'ios-thermometer-outline', badgeCount: '' },
        { title: 'Reports', component: "PumpReportPage", icon: 'md-paper', badgeCount: '' },
        { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
      ];
    });


    this.events.subscribe('user:updated1', (user) => {
      console.log('Welcome', user);
      this.driverCount = user.driverCount;
      this.mgrCount = user.mgrCount;
      this.vehicleCount = user.vehicleCount;
      this.pumpCount = user.pumpCount;

      this.appMenuItems21 = [
        { title: 'Home', component: TransporterPage, icon: 'home', badgeCount: '' },
        { title: 'My Requests', component: "RequestListPage", icon: 'md-git-pull-request', badgeCount:this.reqCount },
        { title: 'My Managers', component: "ManagerListPage", icon: 'ios-people', badgeCount: this.mgrCount },
        { title: 'My Vehicles', component: "VehicleListPage", icon: 'md-car', badgeCount: this.vehicleCount },
        { title: 'My Drivers', component: "TDriverListPage", icon: 'ios-people', badgeCount: this.driverCount },
        { title: 'Payment Entry', component: "PaymentEntryPage", icon: 'md-cash', badgeCount: '' },
        { title: 'My Reports', component: "TransporterReportPage", icon: 'md-paper', badgeCount: '' },
        { title: 'My Pumps', component: "PumpListPage", icon: 'md-barcode', badgeCount: this.pumpCount },
        { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
      ];

      this.appMenuItems22 = [
        { title: 'Home', component: TransporterPage, icon: 'home', badgeCount: '' },
        { title: 'My Requests', component: "RequestListPage", icon: 'md-git-pull-request', badgeCount: this.reqCount },
        { title: 'My Vehicles', component: "VehicleListPage", icon: 'md-car', badgeCount: this.vehicleCount },
        { title: 'My Drivers', component: "TDriverListPage", icon: 'ios-people', badgeCount: this.driverCount },
        { title: 'Payment Entry', component: "PaymentEntryPage", icon: 'md-cash', badgeCount: '' },
        { title: 'My Reports', component: "TransporterReportPage", icon: 'md-paper', badgeCount: '' },
        { title: 'My Pumps', component: "PumpListPage", icon: 'md-barcode', badgeCount: this.pumpCount },
        { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
      ];
    });

    
    this.platform.ready().then(() => {
  //     this.networkProvider.initializeNetworkEvents();

  //     // Offline event
  //  this.events.subscribe('network:offline', () => {
  //      this.basicData.sendErrorNotification('Check Connection you are offline');    
  //  });

  //  // Online event
  //  this.events.subscribe('network:online', () => {
  //   this.basicData.sendErrorNotification('Check Connection you are online');          
  //  });

      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.keyboard.disableScroll(true);
      this.storage.get('username').then((val) => {
        this.username = val;
      });
      this.storage.get('name').then((val) => {
        this.name = val;
      });
      this.storage.get('empCount').then((val) => {
        this.empCount = val;
        console.log(this.empCount);
      });
      this.storage.get('transCount').then((val) => {
        this.transCount = val;
      });
      this.storage.get('driverCount').then((val) => {
        this.driverCount = val;
      });
      this.storage.get('mgrCount').then((val) => {
        this.mgrCount = val;
      });
      this.storage.get('pumpCount').then((val) => {
        this.pumpCount = val;
      });
      this.storage.get('reqCount').then((val) => {
        this.reqCount = val;
      });
       this.storage.get('vehicleCount').then((val) => {
        this.vehicleCount = val;
      });
      this.storage.get('photo').then((val) => {
        this.userPhoto = val;
        console.log("photo"+val);
        this.imgLink="http://45.252.188.68/storage/users/"+this.userPhoto;
console.log("img:"+this.imgLink);
      });
      this.storage.get('activeCS').then((val) => {
        this.activeCS = val;
      });
      this.storage.get('userType').then((val) => {
        this.userType = val;
        console.log(val);
        if (this.userType == undefined || this.userType == null) {
          this.rootPage = LoginPage;
        }
        else {
          switch (this.userType) {

            case '11':
              this.rootPage = POwnerHomePage;
              break;
            case '12':
              this.rootPage = PManagerHomePage
              break;
            case '13':
              this.rootPage = DsmHomePage;
              break;
            case '21':
              this.rootPage = TransporterPage
              break;
            case '22':
              this.rootPage = TransporterPage;
              break;
          }
          this.appMenuItems11 = [
            { title: 'Home', component: POwnerHomePage, icon: 'home', badgeCount: '' },
            { title: 'Employees', component: "PumpEmployeePage", icon: 'ios-people', badgeCount: this.empCount },
            { title: 'Transporters', component: "PumpTransportersListPage", icon: 'md-car', badgeCount: this.transCount },
            { title: 'Product Rates', component: "ProductRatePage", icon: 'md-pricetags', badgeCount: '' },
            { title: 'Payment Reminder', component: "PaymentRequestPage", icon: 'ios-notifications', badgeCount: '' },
            { title: 'Payment Confirmation', component: "PaymentConfirmationPage", icon: 'md-cash', badgeCount: '' },
            { title: 'SMS Reports', component: "SmsReportPage", icon: 'ios-mail', badgeCount: '' },
            { title: 'Reports', component: "PumpReportPage", icon: 'md-paper', badgeCount: '' },
            { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
          ];
          this.appMenuItems111 = [
            { title: 'Home', component: POwnerHomePage, icon: 'home', badgeCount: '' },
            { title: 'Employees', component: "PumpEmployeePage", icon: 'ios-people', badgeCount: this.empCount },
           // { title: 'Transporters', component: "PumpTransportersListPage", icon: 'md-car', badgeCount: this.transCount },
            { title: 'Product Rates', component: "ProductRatePage", icon: 'md-pricetags', badgeCount: '' },
            { title: 'Payment Reminder', component: "PaymentRequestPage", icon: 'ios-notifications', badgeCount: '' },
            { title: 'SMS Reports', component: "SmsReportPage", icon: 'ios-mail', badgeCount: '' },
            { title: 'Reports', component: "PumpReportPage", icon: 'md-paper', badgeCount: '' },
            { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
          ];
          this.appMenuItems12 = [
            { title: 'Home', component: PManagerHomePage, icon: 'home', badgeCount: '' },
            { title: 'Employees', component: "PumpEmployeePage", icon: 'ios-people', badgeCount: this.empCount },
            { title: 'Cash Dispense', component: "CashDispensePage", icon: 'md-cash', badgeCount: '' },
            { title: 'Product Rates', component: "ProductRatePage", icon: 'md-pricetags', badgeCount: '' },
            { title: 'Payment Reminder', component: "PaymentRequestPage", icon: 'ios-notifications', badgeCount: '' },
            { title: 'Payment Confirmation', component: "PaymentConfirmationPage", icon: 'md-cash', badgeCount: '' },
            { title: 'Tank Dips', component: "TankDipsPage", icon: 'ios-thermometer-outline', badgeCount: '' },
            { title: 'Reports', component: "PumpReportPage", icon: 'md-paper', badgeCount: '' },
            { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
          ];

          this.appMenuItems13 = [
            { title: 'Home', component: DsmHomePage, icon: 'home', badgeCount: '' },
            { title: 'DSM Reports', component: "DsmReportsPage", icon: 'md-paper', badgeCount: '' },
            { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
          ];

          this.appMenuItems21 = [
            { title: 'Home', component: TransporterPage, icon: 'home', badgeCount: '' },
            { title: 'My Requests', component: "RequestListPage", icon: 'md-git-pull-request', badgeCount:this.reqCount },
            { title: 'My Managers', component: "ManagerListPage", icon: 'ios-people', badgeCount: this.mgrCount },
            { title: 'My Vehicles', component: "VehicleListPage", icon: 'md-car', badgeCount: this.vehicleCount },
            { title: 'My Drivers', component: "TDriverListPage", icon: 'ios-people', badgeCount: this.driverCount },
            { title: 'Payment Entry', component: "PaymentEntryPage", icon: 'md-cash', badgeCount: '' },
            { title: 'My Reports', component: "TransporterReportPage", icon: 'md-paper', badgeCount: '' },
            { title: 'My Pumps', component: "PumpListPage", icon: 'md-barcode', badgeCount: this.pumpCount },
            { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
          ];

          this.appMenuItems22 = [
            { title: 'Home', component: TransporterPage, icon: 'home', badgeCount: '' },
            { title: 'My Requests', component: "RequestListPage", icon: 'md-git-pull-request', badgeCount:this.reqCount},
            { title: 'My Vehicles', component: "VehicleListPage", icon: 'md-car', badgeCount: this.vehicleCount },
            { title: 'My Drivers', component: "TDriverListPage", icon: 'ios-people', badgeCount: this.driverCount },
            { title: 'Payment Entry', component: "PaymentEntryPage", icon: 'md-cash', badgeCount: '' },
            { title: 'My Reports', component: "TransporterReportPage", icon: 'md-paper', badgeCount: '' },
            { title: 'My Pumps', component: "PumpListPage", icon: 'md-barcode', badgeCount: this.pumpCount },
            { title: 'Change Password', component: "ChangePasswordPage", icon: 'key', badgeCount: '' }
          ];
        }
      });
    });

  }

  openPage(page) {
    this.appCtrl.getRootNav().setRoot(page.component);
    console.log("this.userType");
  }
editProfile(){
  switch (this.userType) {
    case '11':
    this.appCtrl.getRootNav().setRoot("POwnerProfilePage");
      break;
    case '12':
    this.appCtrl.getRootNav().setRoot("PumpProfilePage");
      break;
    case '13':
    this.appCtrl.getRootNav().setRoot("DsmProfilePage");
      break;
    case '21':
    this.appCtrl.getRootNav().setRoot("TransporterProfilePage");
      break;
    case '22':
    this.appCtrl.getRootNav().setRoot("TManagerProfilePage");
      break;
  }
}
  logout() {
    this.appCtrl.getRootNav().setRoot(LoginPage);
    this.storage.clear();
  }

}
