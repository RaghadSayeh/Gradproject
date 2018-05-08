import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
event ={name  , startTime: new Date().toISOString(), endTime :new Date().toISOString(),allDay :false}
minDate =new Date().toISOString();

  constructor(public navCtrl: NavController, 
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navParams: NavParams,private viewCtrl: ViewController) {
    let preselectedDate= moment(this.navParams.get('selectedDay')).format();
    this.event.startTime=preselectedDate;
    this.event.endTime=preselectedDate;
  }

  save(eventp :any){
    this.afAuth.authState.subscribe(auth =>{
      this.afDatabase.object('user/'+ auth.uid +'/todos/'+ eventp.name ).set(eventp)
        
       });
this.viewCtrl.dismiss(this.event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventModalPage');
  }

}
