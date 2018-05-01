import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController,AlertController} from 'ionic-angular';
import * as firebase from 'firebase';
import { Event } from '../../models/eventDet';
import { AngularFireDatabase} from 'angularfire2/database';
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

  constructor (
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


  createE(event: Event){
    event.regnumber = 0 ;
    this.afDatabase.object('event/'+this.arrDataId).set(this.event).then(()=>this.navCtrl.push(WelcomePage))
    //this.afDatabase.list("/event/").push(this.event).then(()=>this.navCtrl.push(WelcomePage));
    
  }



  
  }