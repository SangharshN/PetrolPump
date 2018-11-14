import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PumpTransportersListPage } from './pump-transporters-list';

@NgModule({
  declarations: [
    PumpTransportersListPage,
  ],
  imports: [
    IonicPageModule.forChild(PumpTransportersListPage),
  ],
})
export class PumpTransportersListPageModule {}
