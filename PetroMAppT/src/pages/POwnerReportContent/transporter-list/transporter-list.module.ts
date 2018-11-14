import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransporterListPage } from './transporter-list';

@NgModule({
  declarations: [
    TransporterListPage,
  ],
  imports: [
    IonicPageModule.forChild(TransporterListPage),
  ],
})
export class TransporterListPageModule {}
