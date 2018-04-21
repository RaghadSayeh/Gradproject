import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import * as moment from 'moment';
/**
 * Generated class for the MyCalenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-calender',
  templateUrl: 'my-calender.html',
})
export class MyCalenderPage {
  eventSource= [];
  viewTitle: string;
  selectedDay =new Date();
calendar ={
  mode :'month',
  currentDate: this.selectedDay
}

  constructor(public navCtrl: NavController, public navParams: NavParams, private madalCtrl: ModalController, private alerCtrl: AlertController ){
  }

  addEvent(){
    let modal=this.madalCtrl.create('EventModalPage',{selectedDay:this.selectedDay});
    modal.present();

    modal.onDidDismiss(data =>{
      if(data){
        let eventData= data;
        eventData.startTime=new Date(data.startTime);
        eventData.endTime=new Date(data.endTime);

        let events=this.eventSource;
        events.push(eventData);
        this.eventSource=[];
        setTimeout(() => {
          this.eventSource=events;
        });

      }
    });

    
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
