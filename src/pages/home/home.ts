import { Component } from '@angular/core';
import { NavController,App,IonicPage, LoadingController, ToastController,NavParams, MenuController } from 'ionic-angular';
import {EventDetailPage} from '../event-detail/event-detail';
import * as firebase from 'firebase';
import {AngularFireAuth} from "angularfire2/auth";
import { WelcomePage } from '../welcome/welcome';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { AngularFireDatabase } from 'angularfire2/database';
//import { FirebaseObjectObservable } from 'angularfire2/database';
import { User } from '../../models/user';
import { Event } from '../../models/eventDet';
import { EventsPage } from '../events/events';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
 
})
export class HomePage{
    name;
    email;
    desc;
    type;
    day;
    month;
    year;
    time;
    city;
    location;
    photo;
    paid;
    price;
    maxNo;

     
  USerserviceProvider: any;
arrData = []
newArray: Array<any> = [];
  constructor (
    public myUserProvider:UsersserviceProvider,
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth ,
    public menuCtrl : MenuController,
    public navCtrl : NavController,
    public navParams:NavParams,
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
    this.name=this.myUserProvider.getName();
    this.email=this.myUserProvider.getEmail();
    this.desc=this.myUserProvider.getDesc();
    this.type=this.myUserProvider.getType();
    this.day=this.myUserProvider.getDay();
    this.month=this.myUserProvider.getMonth();
    this.year=this.myUserProvider.getYear();
    this.time=this.myUserProvider.getTime();
    this.city=this.myUserProvider.getCity();
    this.location=this.myUserProvider.getLocation();
    this.photo=this.myUserProvider.getPhoto();
    this.price=this.myUserProvider.getPrice();
    this.maxNo=this.myUserProvider.getMaxNo();


    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
     //   this.userData = this.afDatabase.object('user/'+ data.uid).valueChanges();
       
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
