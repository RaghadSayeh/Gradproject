import { Component } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import { NavController,App,IonicPage, LoadingController, ToastController,NavParams, MenuController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {MessagesPage} from '../messages/messages';
import {ProfilePage} from '../profile/profile';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import {FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import { User } from '../../models/user';
import { SearchPage } from '../search/search';
import { Observable } from 'rxjs/Observable';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MessagesPage;
  tab3Root = SearchPage;
  tab4Root = ProfilePage;

  userData : AngularFireObject<User>
 item1 : Observable<User>;
 itemRef : AngularFireObject<any>;
 ubadge : number ;


  

  constructor(private afAuth: AngularFireAuth ,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController , public navParams: NavParams,
    private toast: ToastController) {

  }

ionViewWillLoad(){
  this.afAuth.authState.subscribe(data =>{
    if(data && data.email && data.uid){
      this.userData = this.afDatabase.object('user/'+ data.uid);
       this.item1 = this.userData.valueChanges();
       this.itemRef = this.afDatabase.object('user/' + data.uid);
       this.itemRef.snapshotChanges().subscribe(action => {
        this.ubadge = action.payload.val().numbadge;  
       });
    this.toast.create(
      {
        message: "Welcome to Evento  "+ data.email,       
        duration: 1000
      }).present();
     }
    
     else{
      this.toast.create(
        {
          message: 'Could not find authentication details ',
          duration: 1000
        }).present();
     }
    }
);
}
}