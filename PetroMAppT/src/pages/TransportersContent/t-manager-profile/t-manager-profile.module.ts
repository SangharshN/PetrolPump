import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TManagerProfilePage } from './t-manager-profile';

@NgModule({
  declarations: [
    TManagerProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(TManagerProfilePage),
  ],
})
export class TManagerProfilePageModule {}
