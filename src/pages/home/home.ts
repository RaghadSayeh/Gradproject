import { Component } from '@angular/core';
import { NavController,App,IonicPage, LoadingController, ToastController,NavParams, MenuController, AlertController } from 'ionic-angular';
import {EventDetailPage} from '../event-detail/event-detail';
import * as firebase from 'firebase';
import {AngularFireAuth} from "angularfire2/auth";
import { WelcomePage } from '../welcome/welcome';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireObject } from 'angularfire2/database';
import { User } from '../../models/user';
import { Event } from '../../models/eventDet';
import { LoginPage } from '../login/login';
import { min } from 'moment';
import { DISABLED } from '@angular/forms/src/model';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-home',
  templateUrl : 'home.html',
 
})
export class HomePage {
  user = {} as User;
  //eventData :FirebaseObjectObservable<Event>
  
  USerserviceProvider: any;
  arrData = [] 
  userID ;
  sts=true ;
  isDisabled: boolean = false ;
  userData : AngularFireObject<User>
 item1 : Observable<User>;
  itemRef : AngularFireObject<any>;
  userfname : string ;
  userlname : string;


  constructor (
    public myUserProvider:UsersserviceProvider,
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth ,
    private alertCtrl: AlertController,
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
    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
        this.userData = this.afDatabase.object('user/'+ data.uid);
       this.item1 = this.userData.valueChanges();
       this.userID = data.uid ;
       this.itemRef = this.afDatabase.object('user/' + data.uid);
       this.itemRef.snapshotChanges().subscribe(action => {
       //this.userPhoto = action.payload.val().photo;  
       this.userfname = action.payload.val().firstname;
       this.userlname = action.payload.val().lastname; 
      // this.pri = action.payload.val().private;    
       });
       
       }
     
      });

  }


openPrice(item : Event , s:number){
  
  let prompt = this.alertCtrl.create({
    title: 'Register in the Event :)',
    
    inputs: [
      {
        name: 'eventName',
        placeholder: item.name,
        value: item.name

      },
      {
        name: 'name',
        placeholder: 'your full name'
      },

      {
        name: 'email',
        placeholder: 'your email',
        type : 'email'
      },

      {
        name: 'cardNum',
        placeholder: 'your card number',
        type :'number',
        min :'100' 
        

      },
      {
        name: 'price',
        value :item.price 
    
      } ,
    ],
   
    buttons: [
      {
        text: "purchase you ticket" ,
        
        handler: data => {
          this.afAuth.authState.subscribe(auth =>{
            this.afDatabase.object('user/'+ this.userID+'/RegEvents/'+item.name).set(data)
            this.afDatabase.object('event/'+ item.name + '/regNames/'  + auth.uid ).set({email : auth.email , name : this.userfname + " "+ this.userlname })
            this.afDatabase.object('event/'+item.name).update({"regnumber" : item.regnumber+1})
            .then(() => this.navCtrl.setRoot(HomePage))
          }) 
        }
      },

      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  prompt.present();
}

openFree(item : Event , s:number){
  let prompt = this.alertCtrl.create({
    title: 'Register in the Event :)',
    
    inputs: [
      {
        name: 'eventName',
        placeholder: item.name,
        value: item.name

      },
      {
        name: 'name',
        placeholder: 'your full name'
      },

      {
        name: 'email',
        placeholder: 'your email',
        type : 'email'
      },

      {
        name: 'cardNum',
        placeholder: 'your card number',
        type :'number',
        min :'100' 
        

      },
      {
        name: 'price',
        placeholder :'Free' 
    
      } ,
    ],
   
    buttons: [
      {
        text: "purchase you ticket" ,
        handler: data => {
          this.afAuth.authState.subscribe(auth =>{
            this.afDatabase.object('user/'+ auth.uid+'/RegEvents/'+item.name).set(data)
            .then(() => this.navCtrl.setRoot(HomePage))
            this.afDatabase.object('event/'+ s + '/regNames/' + auth.uid  ).set(auth.email)
          this.afDatabase.object('event/'+s).update({"regnumber" : item.regnumber+1})
          console.log('Saved clicked')
          })
          
        }
      },

      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  prompt.present();
}
  

Logout(){
  this.afAuth.auth.signOut();
 this.navCtrl.setRoot(WelcomePage);
}

showLocation(locate : string ){

}

}
