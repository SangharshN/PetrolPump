import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransporterProfilePage } from './transporter-profile';

@NgModule({
  declarations: [
    TransporterProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(TransporterProfilePage),
  ],
})
export class TransporterProfilePageModule {}
