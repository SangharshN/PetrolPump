import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerAddPage } from './manager-add';

@NgModule({
  declarations: [
    ManagerAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerAddPage),
  ],
})
export class ManagerAddPageModule { }
