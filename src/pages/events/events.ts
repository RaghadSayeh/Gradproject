import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController,AlertController} from 'ionic-angular';
import * as firebase from 'firebase';
import { Event } from '../../models/eventDet';
import { AngularFireDatabase } from 'angularfire2/database';
import { WelcomePage } from '../welcome/welcome';
import { HomePage } from '../home/home';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

  event = {} as Event ;


  arrData = [];
  arrDataId ;

  constructor(
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
     public navParams: NavParams,
     public laodctrl: LoadingController,
     public toastctrl:ToastController,
     public myUserProvider:UsersserviceProvider,
     public alertctrl:
  AlertController) {
    this.afDatabase.list("/event/").valueChanges().subscribe(
      _data => {
        this.arrData = _data ; 
        this.arrDataId = this.arrData.length ;
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }


  createE(name,email,desc,type,day,month,year,time,city,location,photo,paid,price,maxnumber){

    this.myUserProvider.setName(name);
    this.myUserProvider.setEmail(email);
    this.myUserProvider.setDesc(desc);
    this.myUserProvider.setType(type);
    this.myUserProvider.setDay(day);
    this.myUserProvider.setMonth(month);
    this.myUserProvider.setYear(year);
    this.myUserProvider.setTime(time);
    this.myUserProvider.setCity(city);
    this.myUserProvider.setLocation(location);
    this.myUserProvider.setPhoto(photo);
    this.myUserProvider.setPrice(price);
    this.myUserProvider.setMaxNo(maxnumber);

  
  /* var that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {*/
        //User is signed in
      //  this.navCtrl.push(HomePage,data);
        
    // } else {
        // User is signed out.
        
    //  }
   
     // });

  }



  
  }