import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TotalSalesReportPage } from './total-sales-report';

@NgModule({
  declarations: [
    TotalSalesReportPage,
  ],
  imports: [
    IonicPageModule.forChild(TotalSalesReportPage),
  ],
})
export class TotalSalesReportPageModule {}
