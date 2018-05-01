import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireObject }  from 'angularfire2/database';
import { AngularFireDatabase} from 'angularfire2/database';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  userData : AngularFireObject<User> ;
  item : Observable<User>;
  itemRef : AngularFireObject<any>;
  noti = []
  
  constructor(public navCtrl: NavController,
    private afAuth: AngularFireAuth ,
     private afDatabase: AngularFireDatabase,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');

    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
        this.userData = this.afDatabase.object('user/'+ data.uid);
        this.item = this.userData.valueChanges();
        this.afDatabase.list('/user/'+ data.uid+'/notifications/').valueChanges().subscribe(
          _data => {
            this.noti = _data ; 
            this.noti = this.noti.reverse();
            
          }
        );
        }
      }
      );
       }
      
   

}
