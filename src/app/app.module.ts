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

export const config = {
  apiKey: "AIzaSyAcNNORf7VZEwC-ZdTMbaO1JF0n3cdBHsA",
  authDomain: "mygradpro-8c6e7.firebaseapp.com",
  databaseURL: "https://mygradpro-8c6e7.firebaseio.com",
  projectId: "mygradpro-8c6e7",
  storageBucket: "mygradpro-8c6e7.appspot.com",
  messagingSenderId: "130340074057"
};
firebase.initializeApp(config);

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
    EventsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ContPage,
    EventsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}