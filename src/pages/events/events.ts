import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController,AlertController} from 'ionic-angular';
import * as firebase from 'firebase';
import { Event } from '../../models/eventDet';
import { AngularFireDatabase } from 'angularfire2/database';
import { WelcomePage } from '../welcome/welcome';
//import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
 // providers: [UsersserviceProvider]
})
export class EventsPage {

  event = {} as Event ;


  arrData = [];
  arrDataId ;

  constructor(
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
     public navParams: NavParams,
     public laodctrl: LoadingController,
     public toastctrl:ToastController,
     public alertctrl:
  AlertController) {
    this.afDatabase.list("/event/").valueChanges().subscribe(
      _data => {
        this.arrData = _data ; 
        this.arrDataId = this.arrData.length ;
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }


  createE(event: Event){

    this.afDatabase.object('event/'+this.arrDataId).set(this.event).then(()=>this.navCtrl.push(WelcomePage))
    //this.afDatabase.list("/event/").push(this.event).then(()=>this.navCtrl.push(WelcomePage));
    
  }




  /*createE(){
    var   account2 = {
      Cname: this.Cname || '',
      Cemail: this.Cemail || '',
      subject: this.subject || '',
      Month: this.Month || '',
      Year: this.Year || '',
      Day : this.Day || '',
      place : this.place || '',
      city : this.city || '',
      //Paid :this.Paid
     };
     var that=this;
   
     });
     this.eventServices.writeEventInfo(account2).then(authData =>{
      let alert = this.alertctrl.create(
        {
           title : 'Thank You!',
         // subTitle: 'We will respond to you soon',
          buttons: ['Ok']
        }
      );
      alert.present();
      //that.navCtrl.setRoot(WelcomePage);
    }, error => {
     // loadingCtrl.dismiss();
       // Unable to log in
        let toast = this.toastctrl.create({
          message: error,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      
       // that.password = ""//empty the password field
      });

     
  }*/

}
