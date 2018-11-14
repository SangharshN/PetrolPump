import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TankDipReportPage } from './tank-dip-report';

@NgModule({
  declarations: [
    TankDipReportPage,
  ],
  imports: [
    IonicPageModule.forChild(TankDipReportPage),
  ],
})
export class TankDipReportPageModule {}
