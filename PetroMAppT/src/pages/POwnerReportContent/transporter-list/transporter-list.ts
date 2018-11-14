import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';

/**
 * Generated class for the TransporterListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transporter-list',
  templateUrl: 'transporter-list.html',
})
export class TransporterListPage {

  constructor(public navCtrl: NavController,
    public basicData:BasicDataProvider, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransporterListPage');
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }

}
