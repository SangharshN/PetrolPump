import { Component } from '@angular/core';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';
import { TransporterReportPage } from '../../TransportersContent/transporter-report/transporter-report';

/**
 * Generated class for the PumwisePaymentsReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pumwise-payments-report',
  templateUrl: 'pumwise-payments-report.html',
})
export class PumwisePaymentsReportPage {

  constructor(public navCtrl: NavController, public basicData: BasicDataProvider, public appCtrl: App, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PumwisePaymentsReportPage');
  }

  home() {
    this.appCtrl.getRootNav().setRoot(TransporterReportPage);
  }

  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  menuClick() {
    this.basicData.checkTransCount();
  }

}
