import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {ContPage} from '../pages/cont/cont';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { HttpClientModule } from '@angular/common/http';
import { EventsPage } from '../pages/events/events';
import {EventDetailPage} from '../pages/event-detail/event-detail';
import { MessagesPage } from '../pages/messages/messages';
import { ProfilePage } from '../pages/profile/profile';
import {FollwersPage} from '../pages/follwers/follwers';
import {InterestsPage} from '../pages/interests/interests';
import { HttpModule} from "@angular/http";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabaseModule, AngularFireDatabase } from "angularfire2/database";
import { MyCalenderPage } from '../pages/my-calender/my-calender';
//import { LoginPageModule } from '../pages/login/login.module';


const firebaseConfig = {
  apiKey: "AIzaSyAcNNORf7VZEwC-ZdTMbaO1JF0n3cdBHsA",
  authDomain: "mygradpro-8c6e7.firebaseapp.com",
  databaseURL: "https://mygradpro-8c6e7.firebaseio.com",
  projectId: "mygradpro-8c6e7",
  storageBucket: "mygradpro-8c6e7.appspot.com",
  messagingSenderId: "130340074057"
};firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
   LoginPage,
    SignupPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ContPage,
    EventsPage,
    EventDetailPage,
    MessagesPage,
    ProfilePage,
    FollwersPage,
    InterestsPage,
    MyCalenderPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireAuthModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    MessagesPage,
    ProfilePage,
    SignupPage,
    EventDetailPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ContPage,
    EventsPage,
    FollwersPage,
    InterestsPage,
    MyCalenderPage
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
