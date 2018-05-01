import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import { User } from '../../models/user';
import { Event } from '../../models/eventDet';
//import { FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireObject }  from 'angularfire2/database';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  
  
  constructor ( public navCtrl: NavController,
    private afAuth: AngularFireAuth ,
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
       this.afDatabase.list('/user/'+ data.uid+'/RegEvents/').valueChanges().subscribe(
        _data => {
          this.uesrEventsData = _data ; 
          console.log(this.uesrEventsData) ;
        }
      );

      this.afDatabase.object('user/'+ data.uid+'/RegEvents/'+ item1.name).remove()
      //this.afDatabase.object('user/'+ auth.uid+'/following/').set(this.uesrFollowing.length - 1)
      this.afDatabase.object('event/'+ x +'/regNames/'+ data.uid).remove()
     this.afDatabase.object('event/'+ x +'/regnumber/').set(item1.regnumber - 1)
       }
      });

      this.navCtrl.push(HomePage);


  }

}
