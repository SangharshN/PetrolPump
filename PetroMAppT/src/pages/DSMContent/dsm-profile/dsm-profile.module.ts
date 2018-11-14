import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DsmProfilePage } from './dsm-profile';

@NgModule({
  declarations: [
    DsmProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(DsmProfilePage),
  ],
})
export class DsmProfilePageModule {}
