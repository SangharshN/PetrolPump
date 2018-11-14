import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';

/**
 * Generated class for the TankDipReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tank-dip-report',
  templateUrl: 'tank-dip-report.html',
})
export class TankDipReportPage {

  constructor(public navCtrl: NavController, public basicData: BasicDataProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TankDipReportPage');
  }

  menuClick() {
    this.basicData.checkPumpCount();
  }

}
