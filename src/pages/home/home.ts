import { Component } from '@angular/core';
import { NavController,App,IonicPage, LoadingController, ToastController,NavParams } from 'ionic-angular';
import {EventDetailPage} from '../event-detail/event-detail';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import * as firebase from 'firebase';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UsersserviceProvider]
})
export class HomePage {

  constructor(public navCtrl: NavController, public app: App,public USerserviceProvider : UsersserviceProvider) {

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
Logout(){
  this.USerserviceProvider.logoutService().then(()=>{
    this.navCtrl.setRoot(WelcomePage);
  }

  );
 
}
}
