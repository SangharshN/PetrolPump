import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TDriverListPage } from './tdriver-list';

@NgModule({
  declarations: [
    TDriverListPage,
  ],
  imports: [
    IonicPageModule.forChild(TDriverListPage),
  ],
})
export class TDriverListPageModule {}
