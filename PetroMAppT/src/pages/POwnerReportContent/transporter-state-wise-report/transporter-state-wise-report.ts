import { Storage } from '@ionic/storage';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, PopoverController, App, Platform, LoadingController } from "ionic-angular";
import { ReportsProvider } from '../../../providers/reports/reports';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { Region } from '../../../app/region';



/**
 * Generated class for the TransporterStateWiseReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-transporter-state-wise-report",
  templateUrl: "transporter-state-wise-report.html"
})
export class TransporterStateWiseReportPage {
  public regions: any;
  public stateName: Region[] = [];
  public stateNameList: any;
  public transporterList: any;
  public state: string;
  count:number;
  public regionId: number;
  public pumpId: number;
  public selectedRegions: any;
  public showView:boolean;
  public showEmpty: boolean = false;
  public query = '';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public popoverCtrl: PopoverController,
    public storage: Storage,
    public appCtrl: App,
    public platform: Platform,
    public reportData: ReportsProvider,
    public basicData: BasicDataProvider) {
    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot("CreditSalesReportPage");
      backAction();
    }, 1);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TransporterStateWiseReportPage");
    this.initRegion();
    this.storage.get('pumpId').then((val) => {
      this.pumpId = val;
      console.log(this.pumpId)
    });
  }
  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  initRegion() {
    this.basicData.getRegions(101)
      .subscribe(res => {
        this.regions = res;
        for (var i = 0; i < this.regions.length; i++) {
          this.stateName[i] = this.regions[i].name;
        }
        console.log(this.regions);
      }, err => {
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }
  filter() {
    if (this.query !== "") {
      console.log(this.stateName);
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
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    console.log(item);
    this.state = item;
    this.query = '';
    this.selectedRegions = this.regions.filter(name => name.name === item);
    this.regionId = this.selectedRegions[0].id;

    this.reportData.getTransporterStatwise(this.pumpId, this.regionId).subscribe(res => {
      console.log(res);
      loading.dismiss();
      this.transporterList = res;
    this.count=this.transporterList.length;
      if (this.transporterList.length == 0) {
        this.showEmpty = true;
        this.showView=false;
      }
      else {
        this.showEmpty = false;
        this.showView=true;
      }

    })

  }

  home() {
    this.appCtrl.getRootNav().setRoot("CreditSalesReportPage")
  }
  menuClick() {
    this.basicData.checkPumpCount();
  }
}
