import { Component } from '@angular/core';
import {  IonicPage, NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
//import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import * as firebase from 'firebase';
//import { HomePage } from '../home/home';
import {LoginPage} from '../login/login';

import { User } from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
import { auth } from 'firebase';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
 // providers: [UsersserviceProvider]
})
export class SignupPage {

  user = {} as User;


/*
  public firstname : any;
  public lastname : any;
  public email : string;
  public password : any;
  public interests : string;
  */
  

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams
    //public usersserviceProvider : UsersserviceProvider, 
    //public toastCtrl: ToastController, public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  //this signup function collects the form, saves everything inside the objec(account)
  //then passes the objects to the userService
  async dosignup(user: User){
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    console.log(result);
    this.afAuth.authState.subscribe(auth =>{
      this.afDatabase.object('user/'+ auth.uid).set(this.user)
      .then(() => this.navCtrl.setRoot(LoginPage))
    })
    //this.navCtrl.push(LoginPage);
    }
    catch(e){
      console.error(e);
    }





    //Api connections
   // this.navCtrl.push(TabsPage);
  /* var   account = {
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

  */



}
}
