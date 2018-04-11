import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCalenderPage } from './my-calender';

@NgModule({
  declarations: [
    MyCalenderPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCalenderPage),
  ],
})
export class MyCalenderPageModule {}
