import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PumpProfilePage } from './pump-profile';

@NgModule({
  declarations: [
    PumpProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(PumpProfilePage),
  ],
})
export class PumpProfilePageModule {}
