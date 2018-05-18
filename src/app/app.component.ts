import { Component, ViewChild, Injectable } from '@angular/core';
import { Platform, Nav, MenuController,App} from 'ionic-angular';
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
import { FollowingPage } from '../pages/following/following';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { MyCalenderPage} from '../pages/my-calender/my-calender';
//import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth} from "angularfire2/auth";
import {EditnPage } from '../pages/editn/editn';
import {AddPage} from '../pages/add/add';
import {EditPage} from '../pages/edit/edit';
import {NotePage} from '../pages/note/note';
import { InterestsPage } from '../pages/interests/interests';
import {OthersPage} from '../pages/others/others';
import { OwnEventsPage } from '../pages/own-events/own-events';
import {ShowEventPage} from '../pages/show-event/show-event' ;
import {ModalPage} from '../pages/modal/modal' ;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = WelcomePage;
  activePage: any;
  pages: Array<{title: string, component :any,icon:string}>;
 
  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen ,public afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth ) {
   this.initializeApp();
    this.pages = [
      { title:'Home', component: HomePage,icon:"md-home"},
      { title:'MyCalender', component: MyCalenderPage,icon:"md-calendar"},
      { title :'Followers', component: FollwersPage,icon:"md-people"},
      { title :'Followings', component: FollowingPage,icon:"md-people"},
      { title :'Create Event ', component: EventsPage,icon:"md-create"},
      { title :'Your Own Events ', component: OwnEventsPage ,icon:"md-filing"},
      { title :'Edit your profile ', component: InterestsPage,icon:"md-list-box"},
      { title :'Log out ', component: WelcomePage,icon:"log-out"}
      
      
    ];
   
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
