import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import * as moment from 'moment';
import {FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireDatabase} from 'angularfire2/database';
import { User } from '../../models/user';
import {EditnPage} from '../editn/editn';
import { NotePage } from '../note/note';

@IonicPage()
@Component({
  selector: 'page-my-calender',
  templateUrl: 'my-calender.html',
})
export class MyCalenderPage {
  //todos = {} as User ;

  public toDoList: FirebaseObjectObservable<any>;
  eventSource= [];
  arrData =[];
  viewTitle: string;
  selectedDay =new Date();
calendar ={
  mode :'month',
  currentDate: this.selectedDay
}

  constructor( private afDatabase: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams, private madalCtrl: ModalController, private alerCtrl: AlertController ){
   //this.toDoList = this.afDatabase.list('/todos');
   this.afDatabase.list("/todos/").valueChanges().subscribe(
    _data => {
      this.arrData = _data ; 
     // this.arrDataId = this.arrData.length ;
     console.log(this.arrData);
    }
  );

  }

  addEvent(){
    
    this.navCtrl.push(NotePage);
  }
  delete(idTask){
    this.toDoList.remove(idTask);
  }
  editNote(note){
    this.navCtrl.push(EditnPage,{note: note});
  }
  onViewTitleChanged(title){
    this.viewTitle=title;
  }
  onTimeSelected(ev){
    this.selectedDay=ev.selectedTime;
  }
  onEventSelected(event){
    let start=moment(event.startTime).format('LLLL');
    let end=moment(event.endTime).format('LLLL');

     let alert=this.alerCtrl.create({
       title: '' +event.title,
       subTitle :'From: '+ start +'<br>To: ' + end,
       buttons: ['Ok']
     });
     alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCalenderPage');
  }

}
