import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import * as firebase from 'firebase';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { User } from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth";
import { ProfilePage } from '../profile/profile';
import {TabsPage} from '../tabs/tabs';
//import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  //providers: [UsersserviceProvider]
})
export class LoginPage {
  //public email: string;
  //public password: string;

  user = {} as User ;
  
  constructor( private afAuth: AngularFireAuth,
     public loadingCtrl: LoadingController,
      public toastCtrl: ToastController, 
        public navCtrl: NavController,
         public navParams: NavParams) {
    }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  async login(user: User){
    try {
      const result=  this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(data => {
        console.log('got some data', this.afAuth.auth.currentUser);
       // this.alert('Success! You\'re logged in');
        this.navCtrl.push(TabsPage);
      });
     }
     catch(e){
       console.error(e);
     }
  }




    // Your app login API web service call triggers 
    //this.navCtrl.push(TabsPage, {}, {animate: false});
    /*var that = this;
    
    var loader = this.loadingCtrl.create({
          content: "Please wait..."
        });
        loader.present();
    
    
        this.usersService.loginUserService(this.email, this.password).then(authData => {
          //successful
          loader.dismiss();
          that.navCtrl.setRoot(HomePage);
    
        }, error => {
         loader.dismiss();
         // Unable to log in
          let toast = this.toastCtrl.create({
            message: error,
            duration: 3000,
            position: 'top'
          });
          toast.present();
    
    that.password = ""//empty the password field
    
        });*/
        
    
  
  forgotPwd(){
    
  }
  signUp(){
    this.navCtrl.push(SignupPage);
  }

}
