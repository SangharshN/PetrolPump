import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleAddPage } from './vehicle-add';

@NgModule({
  declarations: [
    VehicleAddPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleAddPage),
  ],
})
export class VehicleAddPageModule {}
