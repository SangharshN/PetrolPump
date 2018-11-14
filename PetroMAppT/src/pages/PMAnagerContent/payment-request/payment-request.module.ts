import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentRequestPage } from './payment-request';

@NgModule({
  declarations: [
    PaymentRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentRequestPage),
  ],
})
export class PaymentRequestPageModule { }
