import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegularCashPage } from './regular-cash';

@NgModule({
  declarations: [
    RegularCashPage,
  ],
  imports: [
    IonicPageModule.forChild(RegularCashPage),
  ],
})
export class RegularCashPageModule {}
