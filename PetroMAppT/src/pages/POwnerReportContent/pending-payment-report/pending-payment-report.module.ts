import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingPaymentReportPage } from './pending-payment-report';

@NgModule({
  declarations: [
    PendingPaymentReportPage,
  ],
  imports: [
    IonicPageModule.forChild(PendingPaymentReportPage),
  ],
})
export class PendingPaymentReportPageModule { }
