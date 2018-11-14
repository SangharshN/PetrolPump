import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SmsReportPage } from './sms-report';

@NgModule({
  declarations: [
    SmsReportPage,
  ],
  imports: [
    IonicPageModule.forChild(SmsReportPage),
  ],
})
export class SmsReportPageModule {}
