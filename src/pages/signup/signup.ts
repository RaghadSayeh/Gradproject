import { Component } from '@angular/core';
import {  IonicPage, NavController, LoadingController, ToastController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import {LoginPage} from '../login/login';
import { User } from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
import { auth } from 'firebase';
import { IDS } from '../../models/IDS';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
 // providers: [UsersserviceProvider]
})
export class SignupPage {

  user = {} as User;
  iduser = {} as IDS ;

  testCheckboxOpen: boolean;
  testCheckboxResult;


  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams,
    public alertctrl:AlertController) {
      
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
      .then(() => this.navCtrl.push(LoginPage))
      this.iduser.ID = auth.uid 
      this.iduser.IDemail = auth.email 
      this.afDatabase.object('IDS/'+ this.user.firstname ).set(this.iduser)
    })
    //this.navCtrl.push(LoginPage);
    }
    catch(e){
      console.error(e);
    }
  }

    chooseInterests(user: User){
      let alert = this.alertctrl.create();
    alert.setTitle('Which Interests do you want to follow?');

    alert.addInput({
      type: 'checkbox',
      label: 'Sport',
      value: 'sport',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Fashion',
      value: 'fashion'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Music',
      value: 'music'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Science',
      value: 'science'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Technology',
      value: 'technology'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Art',
      value: 'art'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Business',
      value: 'business'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Political',
      value: 'political'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Culture',
      value: 'culture'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Weddings',
      value: 'weddings'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        user.interests = data ;
        user.followers = 0 ;
        user.following = 0 ;
        user.badge = 0 ;
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present();
  }

}
