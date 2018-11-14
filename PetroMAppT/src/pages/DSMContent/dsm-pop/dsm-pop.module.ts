import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DsmPopPage } from './dsm-pop';

@NgModule({
  declarations: [
    DsmPopPage,
  ],
  imports: [
    IonicPageModule.forChild(DsmPopPage),
  ],
})
export class DsmPopPageModule {}
