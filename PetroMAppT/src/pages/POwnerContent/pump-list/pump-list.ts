import { AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, PopoverController } from 'ionic-angular';
import { Region } from '../../../app/region';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';
import { TransporterPage } from '../../TransportersContent/transporter/transporter';

/**
 * Generated class for the PumpListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pump-list',
  templateUrl: 'pump-list.html',
})
export class PumpListPage {
  public transporterId: number;
  pumpList: any[] = [];
  public stateName: Region[] = [];
  public regions: any;
  public stateNameList: any;
  public selectedRegions: any;
  public showEmpty: boolean;
  public username: string;
  public query = '';
  public state: any;
  regionId: number;
  public PumppumpList: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public loadingCtrl:LoadingController,
    public alert: AlertController,
    public storage: Storage,
    public basicData: BasicDataProvider,
    public transData: TransDataProvider,
    public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    this.storage.get('transporterId').then((val) => {
      this.transporterId = val;
      this.showPumpList();
      this.initRegion();
    });
    console.log('ionViewDidLoad PumpListPage');
  }
  home() {
    this.appCtrl.getRootNav().setRoot(TransporterPage);
  }

  showPumpList() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.transData.getTransporterPumpList(this.transporterId).subscribe(res => {
      console.log(res);
      loading.dismiss();
      this.pumpList = res;
      this.PumppumpList = res;
    })
  }
  initRegion() {
    this.basicData.getRegions(101)
      .subscribe(res => {
        this.regions = res;
        for (var i = 0; i < this.regions.length; i++) {
          this.stateName[i] = this.regions[i].name;
        }
      }, err => {
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }

  filter() {
    if (this.query !== "") {

      if (this.query.length > 1) {
        this.stateNameList = this.stateName.filter(function (el) {
          return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
        if (this.stateNameList.length == 0) {
          this.showEmpty = true;
        }
        else {
          this.showEmpty = false;
        }
      }
    } else {
      this.stateNameList = [];
    }
  }

  select(item) {
    console.log(this.pumpList, this.regions[0].id);
    this.state = item;
    this.query = '';
    this.selectedRegions = this.regions.filter(name => name.name === this.state);
    this.regionId = this.selectedRegions[0].id;
    console.log(this.pumpList, this.regionId);
    this.pumpList = this.pumpList.filter(regionId => regionId.regionId == this.selectedRegions[0].id);
    console.log(this.pumpList);
    if (this.pumpList.length == 0) {
      let alert = this.alert.create({
        title: 'Sorry no pumps are present for this state',
        enableBackdropDismiss: false,
        buttons: ['Ok']
      });
      alert.present();
      this.pumpList = this.PumppumpList;
      this.state = '';
    }

  }

  menuClick() {
    this.basicData.checkTransCount();
  }

}
