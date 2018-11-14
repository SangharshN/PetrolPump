import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleEditPage } from './vehicle-edit';

@NgModule({
  declarations: [
    VehicleEditPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleEditPage),
  ],
})
export class VehicleEditPageModule {}
