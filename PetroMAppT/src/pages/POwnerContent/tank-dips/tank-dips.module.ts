import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TankDipsPage } from './tank-dips';

@NgModule({
  declarations: [
    TankDipsPage,
  ],
  imports: [
    IonicPageModule.forChild(TankDipsPage),
  ],
})
export class TankDipsPageModule {}
