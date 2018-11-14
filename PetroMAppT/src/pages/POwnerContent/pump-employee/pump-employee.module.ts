import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PumpEmployeePage } from './pump-employee';

@NgModule({
  declarations: [
    PumpEmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(PumpEmployeePage),
  ],
})
export class PumpEmployeePageModule {}
