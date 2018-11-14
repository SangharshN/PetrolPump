import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LostPaymentReportPage } from './lost-payment-report';

@NgModule({
  declarations: [
    LostPaymentReportPage,
  ],
  imports: [
    IonicPageModule.forChild(LostPaymentReportPage),
  ],
})
export class LostPaymentReportPageModule { }
