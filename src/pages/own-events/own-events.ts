import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { ShowEventPage } from '../show-event/show-event';

/**
 * Generated class for the OwnEventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-own-events',
  templateUrl: 'own-events.html',
})
export class OwnEventsPage {

  userEvents = []
 userData : AngularFireObject<User>
 item1 : Observable<User>;
  itemRef : AngularFireObject<any>;

  constructor(public navCtrl: NavController,
    private afAuth: AngularFireAuth ,
    private afDatabase: AngularFireDatabase,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OwnEventsPage');
    
    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
       this.userData = this.afDatabase.object('user/'+ data.uid);
       this.item1 = this.userData.valueChanges();

       
       this.afDatabase.list('/user/'+ data.uid+'/ownEvents/').valueChanges().subscribe(
        _data => {
          this.userEvents = _data ; 
          
        }
      );
       }
      
      
      }
  );
  }

  delete(seqN : string){
    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
      this.afDatabase.object('user/'+ data.uid+'/ownEvents/'+ seqN).remove()
      this.afDatabase.object('event/'+ seqN ).remove()
       }
      });

  }

  show(seqN : string){
    this.navCtrl.push(ShowEventPage , {'eventName' : seqN });

  }

}
