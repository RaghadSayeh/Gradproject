import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController,AlertController} from 'ionic-angular';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';
import { WelcomePage } from '../welcome/welcome';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';

/**
 * Generated class for the ContPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cont',
  templateUrl: 'cont.html',
  providers: [UsersserviceProvider]
})
export class ContPage {

  public Yname : any;
  public Yemail : string;
  public password : string;
  public message : any;
 

  constructor(public usersServices : UsersserviceProvider,public alertCtrl: AlertController,public toastCtrl1:ToastController, public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContPage');
  }
  sendus(){
   
    var   account1 = {
      Yname: this.Yname,
      Yemail: this.Yemail || '',
      password: this.password || '',
      message: this.message
     };
     var that=this;
   /*  var that = this;
var loader = this.loadingCtrl.create({
  content: "Please wait...",
  
});
loader.present();*/

    this.usersServices.contUserService(account1).then(authData =>{
      let alert = this.alertCtrl.create(
        {
           title : 'Thank You!',
          subTitle: 'We will respond to you soon',
          buttons: ['Ok']
        }
      );
      alert.present();
      that.navCtrl.setRoot(WelcomePage);
    }, error => {
     // loadingCtrl.dismiss();
       // Unable to log in
        let toast = this.toastCtrl1.create({
          message: error,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      
       // that.password = ""//empty the password field
      });

  }

}
