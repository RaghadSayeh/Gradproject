import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignupPage } from '../pages/signup/signup';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { EventsPage } from '../pages/events/events';
import * as firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import {EventDetailPage} from '../pages/event-detail/event-detail';
import {ProfilePage} from '../pages/profile/profile';
import {MessagesPage} from '../pages/messages/messages';
import { TabsPage } from '../pages/tabs/tabs';
import { FollwersPage } from '../pages/follwers/follwers';
import { NavController } from 'ionic-angular/navigation/nav-controller';
//import { UsersserviceProvider } from '../../providers/usersservice/usersservice';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = WelcomePage;
 // @ViewChild(Nav) nav : Nav;
  
  //public pages: Array<{title:string, Component: any}>;


  constructor( platform: Platform,statusBar: StatusBar, splashScreen: SplashScreen) {
    /*this.initializeApp();
    this.pages = [
      { title:'Home', Component: HomePage},
      { title :'Follwers', Component: FollwersPage}
    ];*/
    var that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //User is signed in
        that.rootPage=TabsPage;
        
      } else {
        // User is signed out.
        // ...
        that.rootPage=WelcomePage;
        }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
  }
 /* goToFolls(){
    this.navCtrl.push(FollwersPage);
  }*/
 /* initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }*/

 /* openPage(page){
    this.nav.setRoot(page.Component);
  }*/
  
}
