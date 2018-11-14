import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OilPurchasePage } from './oil-purchase';

@NgModule({
  declarations: [
    OilPurchasePage,
  ],
  imports: [
    IonicPageModule.forChild(OilPurchasePage),
  ],
})
export class OilPurchasePageModule {}
