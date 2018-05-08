import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Event } from '../../models/eventDet';

/**
 * Generated class for the ShowEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-event',
  templateUrl: 'show-event.html',
})
export class ShowEventPage {

  evname : string ;
  evData = [] 
  evData1 = {} 
  
 

  constructor(public navCtrl: NavController,
    private afDatabase: AngularFireDatabase,
     public navParams: NavParams) {

    this.evname = this.navParams.get('eventName');

    this.afDatabase.object('/event/' + this.evname ).valueChanges().subscribe(
      _data => {
        this.evData1 = _data ; 

      }
    );

    this.afDatabase.list('/event/' + this.evname + '/regNames/').valueChanges().subscribe(
      _data => {
        this.evData = _data ; 

      }
    );

   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowEventPage');
  }

}
