import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { EventDetailPage } from '../event-detail/event-detail';
import { User } from '@firebase/auth-types';

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

  constructor(public navCtrl: NavController,
    private afDatabase: AngularFireDatabase,
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
    this.navCtrl.push(EventDetailPage , {'person': item , 'personID': this.userID});
  }
}
