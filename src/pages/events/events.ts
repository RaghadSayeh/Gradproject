import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController,AlertController} from 'ionic-angular';
import * as firebase from 'firebase';
import { Event } from '../../models/eventDet';
import { AngularFireDatabase} from 'angularfire2/database';
import { WelcomePage } from '../welcome/welcome';
import { HomePage } from '../home/home';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { forEach } from '@firebase/util/dist/esm/src/obj';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

  event = {} as Event ;
  arrUsers = [] ;
  arrData = [];
  arrDataId ;
  arrIDs = []

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

    this.afDatabase.list("/user/").valueChanges().subscribe(
      _data => {
        this.arrUsers = _data ; 
      }
    );
    this.afDatabase.list("/IDS/").valueChanges().subscribe(
      _data => {
        this.arrIDs = _data ; 
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }


  createE(event: Event){
    event.regnumber = 0 ;

    for(let per of this.arrUsers)
    {
      for(let ev of per.interests){
        if(ev == event.type)
        {
          for(let yy of this.arrIDs){
            if(per.email == yy.IDemail){
              this.afDatabase.object('user/'+ yy.ID +'/notifications/'+ this.arrDataId).set({uphoto : event.photo , message : "New Event is added : "+ event.name + " , of type " + event.type , time : Date()})
            }
          }

        }
      }
    }
    this.afDatabase.object('event/'+this.arrDataId).set(this.event).then(()=>this.navCtrl.push(WelcomePage))
    
    
    
  }



  
  }