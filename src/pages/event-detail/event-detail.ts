import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';

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
  person = {} as User;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      public alertCtrl: AlertController) {

        this.person = this.navParams.get('person');
        console.log(this.person);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }


  


}
