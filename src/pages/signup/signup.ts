import { Component } from '@angular/core';
import {  IonicPage, NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';

//toastController :give me if there is an error in signup or login operation
//loadingController :it is a circle indication to wait until login or signup operation done
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [UsersserviceProvider]
})
export class SignupPage {

  public firstname : any;
  public lastname : any;
  public email : string;
  public password : any;
  public interests : string;
  
  

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public usersserviceProvider : UsersserviceProvider, 
    public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  //this signup function collects the form, saves everything inside the objec(account)
  //then passes the objects to the userService
  dosignup(){
    //Api connections
   // this.navCtrl.push(TabsPage);
   var   account = {
    first_name: this.firstname,
    last_name: this.lastname || '',
    interests: this.interests || '',
    email: this.email,
    password: this.password
   };
var that = this;
var loader = this.loadingCtrl.create({
  content: "Please wait...",
  
});
loader.present();


this.usersserviceProvider.signupUserService(account).then(authData => {
  //successful
  loader.dismiss();
  that.navCtrl.setRoot(HomePage);
  //note:there is a difference between push and setRoot
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
});

    }
}
