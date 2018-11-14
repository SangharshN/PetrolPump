import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentEntryPage } from './payment-entry';

@NgModule({
  declarations: [
    PaymentEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentEntryPage),
  ],
})
export class PaymentEntryPageModule {}
