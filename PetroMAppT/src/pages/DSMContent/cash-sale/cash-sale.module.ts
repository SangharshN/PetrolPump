import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CashSalePage } from './cash-sale';

@NgModule({
  declarations: [
    CashSalePage,
  ],
  imports: [
    IonicPageModule.forChild(CashSalePage),
  ],
})
export class CashSalePageModule { }
