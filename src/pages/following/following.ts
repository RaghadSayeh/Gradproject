import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the FollowingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-following',
  templateUrl: 'following.html',
})
export class FollowingPage {

  arrFollowings = []
  arrUsers = []

  constructor(public navCtrl: NavController,
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth ,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowingPage');

    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
       this.afDatabase.list('/user/'+ data.uid+'/followingArray/').valueChanges().subscribe(
        _data => {
          this.arrFollowings = _data ; 
          console.log(this.arrFollowings) ;
        }
      );

      this.afDatabase.list('/user/').valueChanges().subscribe(
        _data => {
          this.arrUsers = _data ; 
        }
      );
      
       }
  });
  }

}
