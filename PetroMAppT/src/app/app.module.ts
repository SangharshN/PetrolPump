
import { SalesDataProvider } from './../providers/sales-data/sales-data';
import { TransDataProvider } from './../providers/trans-data/trans-data';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Platform, AlertController } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { MyApp } from "./app.component";
import { BasicDataProvider } from '../providers/basic-data/basic-data';
import { PumpDataProvider } from '../providers/pump-data/pump-data';
import { CreditDataProvider } from '../providers/credit-data/credit-data';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ReportsProvider } from '../providers/reports/reports';
import { DatePipe } from '@angular/common';
import { Network } from '../../node_modules/@ionic-native/network';
import { SmsDataProvider } from '../providers/sms-data/sms-data';
import { Camera} from '@ionic-native/camera';
import { FileTransfer} from '@ionic-native/file-transfer';
import { ReactiveFormsModule } from '@angular/forms';
import { TransporterReportProvider } from '../providers/transporter-report/transporter-report';
import { DsmReportsProvider } from '../providers/dsm-reports/dsm-reports';
import { POwnerHomePage } from '../pages/POwnerContent/p-owner-home/p-owner-home';
import { PManagerHomePage } from '../pages/PMAnagerContent/p-manager-home/p-manager-home';
import { DsmHomePage } from '../pages/DSMContent/dsm-home/dsm-home';
import { LoginPage } from '../pages/ALLContent/login/login';
import { TransporterPage } from '../pages/TransportersContent/transporter/transporter'
import { NetworkProvider } from '../providers/network/network';
@NgModule({
  declarations: [
    MyApp,
    POwnerHomePage,
    PManagerHomePage,
    DsmHomePage,
    LoginPage,
    TransporterPage,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      // scrollAssist: true,
      // autoFocusAssist: false
      ReactiveFormsModule,
      scrollAssist: false, autoFocusAssist: false 
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    POwnerHomePage,
    PManagerHomePage,
    DsmHomePage,
    LoginPage,
    TransporterPage,
  ],
  providers: [
    Network,
    StatusBar,
    DatePipe,
    SplashScreen,
    Keyboard,
    BasicDataProvider,
    PumpDataProvider,
    TransDataProvider,
    SalesDataProvider,
    CreditDataProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ReportsProvider,
    SmsDataProvider,
    Camera,FileTransfer,
    TransporterReportProvider,
    DsmReportsProvider,
    NetworkProvider,
  ]
})

export class AppModule {
  constructor (
    private network: Network,
    private platform: Platform,
    private alertCtrl: AlertController,
  ) {
    platform.ready().then(() => {
      this.listenConnection();
    })
  }

  private listenConnection(): void {
    this.network.onDisconnect()
      .subscribe(() => {
        this.showAlert();
      });
  }

  private showAlert(): void {
    // omitted;
    let alert = this.alertCtrl.create({
      title: "Internet Connection Problem",
      subTitle:"Please Check Your Network connection",
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.platform.exitApp();
        }
      }]
    });
    alert.present();
  
}
}
