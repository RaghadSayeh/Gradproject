import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { EventDetailPage } from '../event-detail/event-detail';
import { User } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchQuery: string = '';
  items: string[];
  arrUsers = []
  arrIDs = []
  userID :string ;
  userEm: string ;
  uesrFollowing= []
  followdisable :boolean = false;
  unfollowdisable :boolean = true ;

  constructor(public navCtrl: NavController,
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth ,
     public navParams: NavParams) {

    this.afDatabase.list("/user/").valueChanges().subscribe(
      _data => {
        this.arrUsers = _data ; 
        console.log(this.arrUsers) ;
      }
    );

    this.afDatabase.list("/IDS/").valueChanges().subscribe(
      _data => {
        this.arrIDs = _data ; 
      }
    );

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');

    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
       this.userEm = data.email ;
       this.afDatabase.list('/user/'+ data.uid+'/followingArray/').valueChanges().subscribe(
        _data => {
          this.uesrFollowing = _data ; 
          console.log(this.uesrFollowing) ;
        }
      );
      
       }
  });
}


  getItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.arrUsers = this.arrUsers.filter((item) => {
        return (item.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  showPage(item: User){
    for(let yy of this.arrIDs){
      if(item.email == yy.IDemail){
        this.userID = yy.ID;
      }
    }

    for(let x of this.uesrFollowing){
      if(x == item.email){
        this.followdisable = true ;
        this.unfollowdisable = false ;
        break;}
    }
    
    if(this.userEm == item.email)
    {
      this.navCtrl.push(ProfilePage);
    }
    else{
      this.navCtrl.push(EventDetailPage , {'person': item , 'personID': this.userID , 'followdisable':this.followdisable , 'unfollowdisable':this.unfollowdisable});
    }

    
  }
}
