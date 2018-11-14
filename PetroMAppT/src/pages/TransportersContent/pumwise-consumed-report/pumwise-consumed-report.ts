import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { TransporterReportPage } from '../../TransportersContent/transporter-report/transporter-report';

/**
 * Generated class for the PumwiseConsumedReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pumwise-consumed-report',
  templateUrl: 'pumwise-consumed-report.html',
})
export class PumwiseConsumedReportPage {

  constructor(public navCtrl: NavController, public basicData: BasicDataProvider, public appCtrl: App, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PumwiseConsumedReportPage');
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
