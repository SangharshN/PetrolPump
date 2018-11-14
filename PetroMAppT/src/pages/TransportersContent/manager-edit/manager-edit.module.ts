import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerEditPage } from './manager-edit';

@NgModule({
  declarations: [
    ManagerEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerEditPage),
  ],
})
export class ManagerEditPageModule { }
