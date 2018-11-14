import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CashDispensePage } from './cash-dispense';

@NgModule({
  declarations: [
    CashDispensePage,
  ],
  imports: [
    IonicPageModule.forChild(CashDispensePage),
  ],
})
export class CashDispensePageModule { }
