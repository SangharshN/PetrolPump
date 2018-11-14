import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PumpEmployeeDetailsPage } from './pump-employee-details';

@NgModule({
  declarations: [
    PumpEmployeeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PumpEmployeeDetailsPage),
  ],
})
export class PumpEmployeeDetailsPageModule {}
