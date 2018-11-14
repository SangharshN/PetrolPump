import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PumpReportPage } from './pump-report';

@NgModule({
  declarations: [
    PumpReportPage,
  ],
  imports: [
    IonicPageModule.forChild(PumpReportPage),
  ],
})
export class PumpReportPageModule {}
