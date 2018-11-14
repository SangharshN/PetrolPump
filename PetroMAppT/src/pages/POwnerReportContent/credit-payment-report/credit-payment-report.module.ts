import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreditPaymentReportPage } from './credit-payment-report';

@NgModule({
  declarations: [
    CreditPaymentReportPage,
  ],
  imports: [
    IonicPageModule.forChild(CreditPaymentReportPage),
  ],
})
export class CreditPaymentReportPageModule { }
