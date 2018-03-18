import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollwersPage } from './follwers';

@NgModule({
  declarations: [
    FollwersPage,
  ],
  imports: [
    IonicPageModule.forChild(FollwersPage),
  ],
})
export class FollwersPageModule {}
