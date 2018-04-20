import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
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
export class ProfilePage {

  userData : FirebaseObjectObservable<User>
  
  constructor ( public navCtrl: NavController,
    private afAuth: AngularFireAuth ,
    private afDatabase: AngularFireDatabase,
     public navParams: NavParams)  { 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
        this.userData = this.afDatabase.object('user/'+ data.uid).valueChanges();
       }
      
      
      }
  );
  }

}
