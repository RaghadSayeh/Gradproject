import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignupPage } from '../pages/signup/signup';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { EventsPage } from '../pages/events/events';
import * as firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { EventDetailPage} from '../pages/event-detail/event-detail';
import {ProfilePage} from '../pages/profile/profile';
import {SearchPage} from '../pages/search/search';
import { MessagesPage } from '../pages/messages/messages';
import { TabsPage } from '../pages/tabs/tabs';
import { FollwersPage } from '../pages/follwers/follwers';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { MyCalenderPage} from '../pages/my-calender/my-calender';
//import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth} from "angularfire2/auth";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = WelcomePage;
  activePage: any;
  pages: Array<{title: string, component :any}>;
 
  constructor( public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen ,public afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth ) {
   this.initializeApp();
    this.pages = [
      { title:'Home', component: HomePage},
      { title:'MyCalender', component: MyCalenderPage},
      { title :'Follwers', component: FollwersPage}
    ];
   // this.activePage=this.pages[0];
    /*
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
    */
 /* initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }*/
}
  openPage(pages){
    this.nav.push(pages.component);
    this.activePage = pages;
  }
  /*checkActive(pages){
    return pages == this.activePage;
  }*/


  
initializeApp() {
  this.platform.ready().then(() => {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  });
}
}
