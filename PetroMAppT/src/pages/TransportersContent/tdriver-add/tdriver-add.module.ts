import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TdriverAddPage } from './tdriver-add';

@NgModule({
  declarations: [
    TdriverAddPage,
  ],
  imports: [
    IonicPageModule.forChild(TdriverAddPage),
  ],
})
export class TdriverAddPageModule {}
