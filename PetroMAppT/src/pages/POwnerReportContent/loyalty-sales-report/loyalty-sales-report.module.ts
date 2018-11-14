import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoyaltySalesReportPage } from './loyalty-sales-report';

@NgModule({
  declarations: [
    LoyaltySalesReportPage,
  ],
  imports: [
    IonicPageModule.forChild(LoyaltySalesReportPage),
  ],
})
export class LoyaltySalesReportPageModule {}
