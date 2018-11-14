import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoyaltySummaryPage } from './loyalty-summary';

@NgModule({
  declarations: [
    LoyaltySummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(LoyaltySummaryPage),
  ],
})
export class LoyaltySummaryPageModule {}
