import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DsmReportsPage } from './dsm-reports';

@NgModule({
  declarations: [
    DsmReportsPage,
  ],
  imports: [
    IonicPageModule.forChild(DsmReportsPage),
  ],
})
export class DsmReportsPageModule {}
