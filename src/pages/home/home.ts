import { Component } from '@angular/core';
import { NavController,App} from 'ionic-angular';
import {EventDetailPage} from '../event-detail/event-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public app: App) {

  }
  /*logout(){
    // Remove API token 
    //const root = this.app.getRootNav();
    //root.popToRoot();
    this.navCtrl.push(WelcomePage);
}*/

openEventPage(){
  this.navCtrl.push(EventDetailPage);
}
}
