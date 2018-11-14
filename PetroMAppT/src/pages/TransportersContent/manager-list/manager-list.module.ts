import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerListPage } from './manager-list';

@NgModule({
  declarations: [
    ManagerListPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerListPage),
  ],
})
export class ManagerListPageModule { }
