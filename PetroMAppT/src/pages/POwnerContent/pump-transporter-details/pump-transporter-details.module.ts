import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PumpTransporterDetailsPage } from './pump-transporter-details';

@NgModule({
  declarations: [
    PumpTransporterDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PumpTransporterDetailsPage),
  ],
})
export class PumpTransporterDetailsPageModule {}
