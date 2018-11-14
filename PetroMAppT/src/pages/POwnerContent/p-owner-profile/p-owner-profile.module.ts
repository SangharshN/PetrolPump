import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { POwnerProfilePage } from './p-owner-profile';

@NgModule({
  declarations: [
    POwnerProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(POwnerProfilePage),
  ],
})
export class POwnerProfilePageModule {}
