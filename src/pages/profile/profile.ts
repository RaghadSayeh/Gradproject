import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import { User } from '../../models/user';
import { Event } from '../../models/eventDet';
import { AngularFireObject }  from 'angularfire2/database';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs/Observable';



@IonicPage()
@Component({
  selector: 'page-profile' ,
  templateUrl : 'profile.html',
})
export class ProfilePage{
eventData = []
 userData : AngularFireObject<User>
 uesrEventsData = []
 item1 : Observable<User>;
  itemRef : AngularFireObject<any>;
  createdCode = null ;
  userfname : string ;
  userlname : string ;
  qrData = null ;
  
  
  constructor ( public navCtrl: NavController,
    private afAuth: AngularFireAuth ,
    private alertCtrl: AlertController,
    private afDatabase: AngularFireDatabase,
     public navParams: NavParams){ 

      this.afDatabase.list("/event/").valueChanges().subscribe(
        _data => {
          this.eventData = _data ; 
          console.log(this.eventData) ;
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
       this.userData = this.afDatabase.object('user/'+ data.uid);
       this.item1 = this.userData.valueChanges();
       this.itemRef = this.afDatabase.object('user/' + data.uid);
       this.itemRef.snapshotChanges().subscribe(action => { 
       this.userfname = action.payload.val().firstname;
       this.userlname = action.payload.val().lastname; 
       });

       
       this.afDatabase.list('/user/'+ data.uid+'/RegEvents/').valueChanges().subscribe(
        _data => {
          this.uesrEventsData = _data ; 
          console.log(this.uesrEventsData) ;
        }
      );
       }
      
      
      }
  );
  }


  unRegister(item1 : Event , x:number){

    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
      this.afDatabase.object('user/'+ data.uid+'/RegEvents/'+ item1.name).remove()
      //this.afDatabase.object('user/'+ auth.uid+'/following/').set(this.uesrFollowing.length - 1)
      this.afDatabase.object('event/'+ x +'/regNames/'+ data.uid).remove()
     this.afDatabase.object('event/'+ x +'/regnumber/').set(item1.regnumber - 1)
       }
      });

      this.navCtrl.push(ProfilePage);


  }

  createCode(){
    this.qrData = this.userfname + this.userlname ; 
    this.createdCode = this.qrData ;
  
  }

}
