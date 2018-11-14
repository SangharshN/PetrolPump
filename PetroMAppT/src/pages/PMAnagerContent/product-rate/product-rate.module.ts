import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductRatePage } from './product-rate';

@NgModule({
  declarations: [
    ProductRatePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductRatePage),
  ],
})
export class ProductRatePageModule { }
