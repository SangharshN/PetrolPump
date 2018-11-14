import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreditSalesReportPage } from './credit-sales-report';

@NgModule({
  declarations: [
    CreditSalesReportPage,
  ],
  imports: [
    IonicPageModule.forChild(CreditSalesReportPage),
  ],
})
export class CreditSalesReportPageModule {}
