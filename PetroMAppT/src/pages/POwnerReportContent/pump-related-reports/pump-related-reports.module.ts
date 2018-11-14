import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PumpRelatedReportsPage } from './pump-related-reports';

@NgModule({
  declarations: [
    PumpRelatedReportsPage,
  ],
  imports: [
    IonicPageModule.forChild(PumpRelatedReportsPage),
  ],
})
export class PumpRelatedReportsPageModule {}
