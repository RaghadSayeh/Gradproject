import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import { User } from '../../models/user';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireObject }  from 'angularfire2/database';

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
 userData : FirebaseObjectObservable<User>
 uesrEventsData = []
  
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
       this.userData = this.afDatabase.object('user/'+ data.uid).valueChanges();
      //this.uesrEventsData = this.afDatabase.list('user/'+ data.uid+'/RegEvents/').valueChanges();
       console.log(this.userData) ;
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

}
