import { Component } from '@angular/core';
import { NavController,App,IonicPage, LoadingController, ToastController,NavParams, MenuController } from 'ionic-angular';
import {EventDetailPage} from '../event-detail/event-detail';
import * as firebase from 'firebase';
import {AngularFireAuth} from "angularfire2/auth";
import { WelcomePage } from '../welcome/welcome';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
 
})
export class HomePage {
  USerserviceProvider: any;

  constructor(private afAuth: AngularFireAuth ,
    private toast: ToastController,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
     public app: App
    ) {

  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
      this.toast.create(
        {
          message: 'Welcome to Evento, ${data.email}',
          duration: 3000
        }).present();
       }
      
       else{
        this.toast.create(
          {
            message: 'Could not find authentication details ',
            duration: 3000
          }).present();
       }
      }
  );
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
