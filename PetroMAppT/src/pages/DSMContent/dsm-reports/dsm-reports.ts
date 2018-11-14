import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { DsmHomePage } from '../dsm-home/dsm-home';

/**
 * Generated class for the DsmReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dsm-reports',
  templateUrl: 'dsm-reports.html',
})
export class DsmReportsPage {

  constructor(public navCtrl: NavController,
    public appCtrl:App, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DsmReportsPage');
  }
  DayWiseSale()
  {
    this.appCtrl.getRootNav().setRoot("DayWiseSalePage");
  }
  PaymodewiseSale()
  {
    this.appCtrl.getRootNav().setRoot("PaymodeWiseSalePage");
  }
  home()
  {
    this.appCtrl.getRootNav().setRoot(DsmHomePage);
  }
}
