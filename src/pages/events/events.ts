import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController,AlertController} from 'ionic-angular';
import * as firebase from 'firebase';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
  providers: [UsersserviceProvider]
})
export class EventsPage {
  public Cname: any;
  public Cemail: any;
  public subject: string;
  public Month: any;
  public Year: any;
  public Day: any;
  public place: any;
  public city: any;
  public eventInfo : any;
  //public Paid: boolean;


  constructor(public eventServices : UsersserviceProvider,public navCtrl: NavController, public navParams: NavParams,public laodctrl: LoadingController,public toastctrl:ToastController,public alertctrl:
  AlertController) {

    this.eventInfo =firebase.database().ref('eventinfo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }
  createE(){
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
    /* this.eventInfo.child().set({
       account2
     });*/
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

     
  }

}
