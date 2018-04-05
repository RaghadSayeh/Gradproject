import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

  slider = [
    {
      title : 'Special Invitation',
      image :"assets/imgs/music.png"
    },
    {
      title : 'Location',
      image :"assets/imgs/music.png"
    }

  ];

  doPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Purchase a Ticket',
      
      inputs: [
        {
          name: 'email',
          placeholder: 'your email address'
        },

        {
          name: 'password',
          placeholder: 'your password'
        },

        {
          name: 'cardNum',
          placeholder: 'your card number'
        },
      ],
     
      buttons: [
        {
          text: 'Pay $150.00',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }



}
