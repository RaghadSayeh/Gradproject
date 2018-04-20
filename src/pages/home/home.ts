import { Component } from '@angular/core';
import { NavController,App,IonicPage, LoadingController, ToastController,NavParams, MenuController } from 'ionic-angular';
import {EventDetailPage} from '../event-detail/event-detail';
import * as firebase from 'firebase';
import {AngularFireAuth} from "angularfire2/auth";
import { WelcomePage } from '../welcome/welcome';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { User } from '../../models/user';
import { Event } from '../../models/eventDet';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
 
})
export class HomePage{
  //user = {} as User;
  //eventData :FirebaseObjectObservable<Event>
  userData : FirebaseObjectObservable<User>
  USerserviceProvider: any;
arrData = []
newArray: Array<any> = [];
  constructor (
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth ,
    //private toast: ToastController,
    public menuCtrl : MenuController,
    public navCtrl : NavController,
     public app: App
    ) { 

      this.afDatabase.list("/event/").valueChanges().subscribe(
        _data => {
          this.arrData = _data ; 
          console.log(this.arrData) ;
        }
      );

  }

  ionViewWillLoad() {
    
    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
        this.userData = this.afDatabase.object('user/'+ data.uid).valueChanges();
       
       }
     
      });

     

     /* for (var i = 0; i < this.arrData.length; i++) {
        for (var j = 0; j < this.userData.interests.length; j++) {
            if (this.arrData[i].type == this.userData.interests[j]) {
            
            this.newArray.push(this.arrData[i]);
          }
        }
      }
      console.log(this.newArray);*/
    
  }


openEventPage(){
  this.navCtrl.push(EventDetailPage);
  
}
Logout(){
    this.afAuth.auth.signOut();
   this.navCtrl.setRoot(WelcomePage);
 }
 


}
