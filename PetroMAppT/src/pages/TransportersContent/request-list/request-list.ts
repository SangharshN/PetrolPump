import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, PopoverController, ToastController, Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { TransporterPage } from '../transporter/transporter';
import { CreditSale } from '../../../app/credit.sale';
import { BasicDataProvider } from '../../../providers/basic-data/basic-data';
import { SalesDataProvider } from '../../../providers/sales-data/sales-data';
import { TransDataProvider } from '../../../providers/trans-data/trans-data';


@IonicPage()
@Component({
  selector: 'page-request-list',
  templateUrl: 'request-list.html',
})
export class RequestListPage {
  // endDate: String = new Date().toISOString();
  startDate: String;
  start: Date;
  endDate: String;
  public crequests: CreditSale[];
  public errorMsg;
  transList: any;
  categories: any;
  public pending: Boolean = false;
  public progress: Boolean = false;
  public completed: Boolean = false;
  public cancelled: Boolean = false;
  public transporterId: any;
  public canc: number;
  public vehicles: any;
  public drivers: any;
  public transRequestList = [];
  public pendingList = [];
  public inProgressList = [];
  public completedList = [];
  public canceledList = [];
  public pendingCount:number;
  public inProgressCount:number;
  public completedCount:number;
  public canceledCount:number;
  pumpList: any;
  show: boolean = false;
  PumppumpList: any;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl:LoadingController,
    public basicData: BasicDataProvider,
    public toast: ToastController,
    private datePipe: DatePipe,
    public appCtrl: App,
    public saleData: SalesDataProvider,
    public platform: Platform,
    public popoverCtrl: PopoverController,
    public transData: TransDataProvider) {
    this.categories = "Pending";

    let backAction = this.platform.registerBackButtonAction(() => {
      this.appCtrl.getRootNav().setRoot(TransporterPage);
      backAction();
    }, 1)
    //this.load();
  }
  ngOnInit() {

  }
  ionViewDidLoad() {
    ////this.basicData.Loader();
    this.categories = "Pending";
    this.storage.get('transporterId').then((val) => {
      this.transporterId = val;
      this.showRequest();
      this.saleData.getVehicles(this.transporterId)
        .subscribe(res => {
          this.vehicles = res.filter(v => v.active == 1);
          this.showPumps();
        });
      this.transData.getTDrivers(this.transporterId)
        .subscribe(res => {
          this.drivers = res.filter(v => v.active == 1);
        }, err => {

          this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
        });
    },
      err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
    this.endDate = new Date().toISOString();
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 6);
    this.start = currentDate;
    this.startDate = this.start.toISOString();
    this.endDate = this.datePipe.transform(this.endDate, "yyyy-MM-dd");
    this.startDate = this.datePipe.transform(this.startDate, "yyyy-MM-dd");
    console.log(this.endDate, this.startDate)
  }
  showRequest() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.transData.getTransRequests(this.transporterId).subscribe(
      res => {
        loading.dismiss();
        this.transList = res;
        this.transRequestList = res;
        console.log(res);
        if (this.transRequestList.length == 0) {
          this.pending = true;
          this.progress = true;
          this.completed = true;
          this.cancelled = true;
        }
        else {
          this.pendingList = res.filter(p => p.status == 1);
          this.inProgressList = res.filter(p => p.status == 2);
          this.canceledList = res.filter(p => p.status == 4);
          this.completedList = res.filter(p => p.status == 3);
          this.pendingCount=this.pendingList.length;
          this.inProgressCount=this.inProgressList.length;
          this.completedCount=this.completedList.length;
          this.canceledCount=this.canceledList.length;
          if (this.pendingList.length == 0) {
            this.pending = true;
          }
          else {
            this.pending = false;
          }
          if (this.inProgressList.length == 0) {
            this.progress = true;
          }
          else {
            this.progress = false;
          }
          if (this.completedList.length == 0) {
            this.completed = true;
          }
          else {
            this.completed = false;
          }
          if (this.canceledList.length == 0) {
            this.cancelled = true;
          }
          else {
            this.cancelled = false;
          }
        }
      }, err => {
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });

  }
  dateChanged() {
  
    this.endDate = this.datePipe.transform(this.endDate, "yyyy-MM-dd");
    this.startDate = this.datePipe.transform(this.startDate, "yyyy-MM-dd");
    console.log(this.endDate,this.startDate,this.transporterId);
    this.transData.getTransRequestsDate(this.transporterId, this.startDate,this.endDate) .subscribe(
      res => {
        this.transList = res;
        this.transRequestList = res;
        console.log(res)
        this.pendingList = res.filter(p => p.status == 1);
        this.inProgressList = res.filter(p => p.status == 2);
        this.canceledList = res.filter(p => p.status == 4);
        this.canc = this.canceledList.length;
        this.completedList = res.filter(p => p.status == 3);
        this.pendingCount=this.pendingList.length;
        this.inProgressCount=this.inProgressList.length;
        this.completedCount=this.completedList.length;
        this.canceledCount=this.canceledList.length;
        if (this.pendingList.length == 0) {
          this.pending = true;
        }
        else {
          this.pending = false;
        }
        if (this.inProgressList.length == 0) {
          this.progress = true;
        }
        else {
          this.progress = false;
        }
        if (this.completedList.length == 0) {
          this.completed = true;
        }
        else {
          this.completed = false;
        }
        if (this.canceledList.length == 0) {
          this.cancelled = true;
        }
        else {
          this.cancelled = false;
        }
      }, err => {

        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      });
  }
  addRequest() {
    if (this.vehicles.length == 0) {
      this.basicData.sendErrorNotification("Sorry no activated Vehicles found!!!Please add Vehicles First")
    }
    else if (this.drivers.length == 0) {
      this.basicData.sendErrorNotification("Sorry no activated Drivers found!!!Please add driver First")
    }
    else {
      this.appCtrl.getRootNav().setRoot('RequestRaisePage');
    }
  }

  editRequest(id) {
    this.appCtrl.getRootNav().setRoot('RequestEditPage', {
      param1: id
    });
  }

  cancelRequest(id) {
    console.log(id);
    this.appCtrl.getRootNav().setRoot('RequestCancelPage', {
      param1: id
    });
  }

  popover(myEvent) {
    let popover = this.popoverCtrl.create('TranspopPage');
    popover.present({
      ev: myEvent
    });
  }

  popoverCalendar(myEvent) {
    let popover = this.popoverCtrl.create('CalendarPopPage');
    popover.present({
      ev: myEvent
    });
  }
  selectPump(myEvent) {
    console.log(myEvent, this.transRequestList);
    if(myEvent==0)
    {
      console.log(this.transList);
      this.transRequestList=this.transList;
      this.pendingList = this.transRequestList.filter(p => p.status == 1);
      this.inProgressList = this.transRequestList.filter(p => p.status == 2);
      this.canceledList = this.transRequestList.filter(p => p.status == 4);
      this.canc = this.canceledList.length;
      this.completedList = this.transRequestList.filter(p => p.status == 3);
      this.pendingCount=this.pendingList.length;
      this.inProgressCount=this.inProgressList.length;
      this.completedCount=this.completedList.length;
      this.canceledCount=this.canceledList.length;
      if (this.pendingList.length == 0) {
        this.pending = true;
      }
      else {
        this.pending = false;
      }
      if (this.inProgressList.length == 0) {
        this.progress = true;
      }
      else {
        this.progress = false;
      }
      if (this.completedList.length == 0) {
        this.completed = true;
      }
      else {
        this.completed = false;
      }
      if (this.canceledList.length == 0) {
        this.cancelled = true;
      }
      else {
        this.cancelled = false;
      }
    }
    else
    {
    this.transRequestList = this.transList.filter(p => p.pumpId == myEvent.pumpId);
    this.pendingList = this.transRequestList.filter(p => p.status == 1);
    this.inProgressList = this.transRequestList.filter(p => p.status == 2);
    this.canceledList = this.transRequestList.filter(p => p.status == 4);
    this.canc = this.canceledList.length;
    this.completedList = this.transRequestList.filter(p => p.status == 3);
    this.pendingCount=this.pendingList.length;
    this.inProgressCount=this.inProgressList.length;
    this.completedCount=this.completedList.length;
    this.canceledCount=this.canceledList.length;
    if (this.pendingList.length == 0) {
      this.pending = true;
    }
    else {
      this.pending = false;
    }
    if (this.inProgressList.length == 0) {
      this.progress = true;
    }
    else {
      this.progress = false;
    }
    if (this.completedList.length == 0) {
      this.completed = true;
    }
    else {
      this.completed = false;
    }
    if (this.canceledList.length == 0) {
      this.cancelled = true;
    }
    else {
      this.cancelled = false;
    }
  }
  }
  // load()
  // {
  //   Observable.interval(2000 * 60).subscribe(x => {
  //     this.ionViewDidLoad();
  //   });

  // }
  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  home() {
    this.navCtrl.setRoot(TransporterPage);
  }
  showPumps() {
    this.transData.getPumpList(this.transporterId)
      .subscribe(res => {
        this.pumpList = res;
        this.PumppumpList = res;
        console.log(this.pumpList);

      }, err => {
        this.errorMsg = err;
        this.basicData.sendErrorNotification("There is some issue. Please TRY again!!!");
      })
  }
  menuClick()
  {
    this.basicData.checkTransCount();
  }
  onChange(value) {
    console.log(value);
    switch (value) {
      case '1':
        this.startDate = new Date().toISOString();
        this.endDate = new Date().toISOString();
        this.dateChanged();
        this.show = false;
        break;

      case '2':
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.endDate = this.startDate;
        this.dateChanged();
        this.show = false;
        break;
      case '3':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(currentDate.getDate() - 2);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.dateChanged();
        this.show = false;
        break;
      case '4':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(currentDate.getDate() - 6);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.dateChanged();
        this.show = false;
        break;
      case '5':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(currentDate.getDate() - 14);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.dateChanged();
        this.show = false;
        break;
      case '6':
        currentDate = new Date();
        this.endDate = new Date().toISOString();
        currentDate.setDate(1);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        this.dateChanged();
        this.show = false;
        break;
      case '7':
        currentDate = new Date();

        currentDate.setDate(1);
        var currentMonth = currentDate.getMonth() - 1;
        currentDate.setMonth(currentMonth);
        this.start = currentDate;
        this.startDate = this.start.toISOString();
        // var currentDate = new Date();
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var lastDay = new Date(y, m, 0);
        this.start = lastDay;
        this.endDate = this.start.toISOString();
        this.dateChanged();
        break;
      case '8':
        this.show = true;
        console.log(this.show);
        break;
    }
  }

}