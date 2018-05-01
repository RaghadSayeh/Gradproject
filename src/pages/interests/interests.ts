import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseObjectObservable  } from 'angularfire2/database';
import { AngularFireObject }  from 'angularfire2/database';
import { AngularFireDatabase} from 'angularfire2/database';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-interests',
  templateUrl: 'interests.html',
})
export class InterestsPage {
  userData : FirebaseObjectObservable<User>
 // removeitems : FirebaseObjectObservable<User>
  interestData = []
  uesrInteresrData = []
  constructor(public navCtrl: NavController, public navParams: NavParams , private afAuth: AngularFireAuth ,
    private afDatabase: AngularFireDatabase,) {
   //   this.removeitems=this.afDatabase.list('/user/interests');
      this.afDatabase.list("/user/").valueChanges().subscribe(
        _data => {
          this.interestData = _data ; 
          console.log(this.interestData) ;
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterestsPage');

    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
       this.userData = this.afDatabase.object('user/'+ data.uid).valueChanges();
       console.log(this.userData) ;
       this.afDatabase.list('/user/'+ data.uid+'/interests/').valueChanges().subscribe(
        _data => {
          this.uesrInteresrData = _data ; 
          console.log(this.uesrInteresrData) ;
        }
      );
       }

      }
  );

  }

  Unfollow(idItem){
    //this.afDatabase.list('/user').remove(this.uesrInteresrData[idItem]);
    
  }

}
