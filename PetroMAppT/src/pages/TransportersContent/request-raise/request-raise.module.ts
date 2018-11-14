import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestRaisePage } from './request-raise';

@NgModule({
  declarations: [
    RequestRaisePage,
  ],
  imports: [
    IonicPageModule.forChild(RequestRaisePage),
  ],
})
export class RequestRaisePageModule {}
