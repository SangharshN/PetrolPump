import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, Platform, PopoverController } from 'ionic-angular';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { TransporterPage } from '../../TransportersContent/transporter/transporter';


@IonicPage()
@Component({
  selector: 'page-transporter-report',
  templateUrl: 'transporter-report.html',
})
export class TransporterReportPage {

  constructor(public navCtrl: NavController, public basicData: BasicDataProvider, public appCtrl: App, public platform: Platform, public popoverCtrl: PopoverController, public navParams: NavParams) {
    let backAction = this.platform.registerBackButtonAction(() => {
      console.log("second");
      this.appCtrl.getRootNav().setRoot(TransporterPage);
      backAction();
    }, 1)
  }

  ionViewDidLoad() {
    //this.basicData.Loader();
    console.log('ionViewDidLoad TransporterReportPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewDidLoad();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  home() {
    this.appCtrl.getRootNav().setRoot(TransporterPage);
  }

  PumwiseConsumedReportPage() {
    this.appCtrl.getRootNav().setRoot("PumwiseConsumedReportPage");
  }

  PumwisePaymentsReportPage() {
    this.appCtrl.getRootNav().setRoot("PumwisePaymentsReportPage");
  }

  VehicleWiseReportPage() {
    this.appCtrl.getRootNav().setRoot("VehicleWiseReportPage");
  }

  menuClick() {
    this.basicData.checkPumpCount();
  }

}
