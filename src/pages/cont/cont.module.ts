import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContPage } from './cont';

@NgModule({
  declarations: [
    ContPage,
  ],
  imports: [
    IonicPageModule.forChild(ContPage),
  ],
  exports: [
    ContPage
  ]
})
export class ContPageModule {}
