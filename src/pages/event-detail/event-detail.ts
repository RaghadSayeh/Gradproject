import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireObject }  from 'angularfire2/database';
import { AngularFireDatabase} from 'angularfire2/database';

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  person = {} as User;
  userData : FirebaseObjectObservable<User>
  uesrFollowers= []
  uesrFollowing= []
  followdisable :boolean ;
  unfollowdisable :boolean ;
  personID : string;
  eventData = []
  userEvents = []

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private afAuth: AngularFireAuth ,
     private afDatabase: AngularFireDatabase,
      public alertCtrl: AlertController) {

        this.person = this.navParams.get('person');
        this.personID = this.navParams.get('personID');
        this.followdisable = this.navParams.get('followdisable');
        this.unfollowdisable = this.navParams.get('unfollowdisable');
        
        console.log(this.person);

        this.afDatabase.list("/event/").valueChanges().subscribe(
          _data => {
            this.eventData = _data ; 
            console.log(this.eventData) ;
          }
        );

        this.afDatabase.list('/user/'+ this.personID+'/RegEvents/').valueChanges().subscribe(
          _data => {
            this.userEvents = _data ; 
            console.log(this.userEvents) ;
          }
        );

       
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');

    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
       this.userData = this.afDatabase.object('user/'+ data.uid).valueChanges();
       this.afDatabase.list('/user/'+ data.uid+'/followersArray/').valueChanges().subscribe(
        _data => {
          this.uesrFollowers = _data ; 
          console.log(this.uesrFollowers) ;
        }
      );
      this.afDatabase.list('/user/'+ data.uid+'/followingArray/').valueChanges().subscribe(
        _data => {
          this.uesrFollowing = _data ; 
          console.log(this.uesrFollowing) ;
        }
      );
       }
      
      
      }
  );


  }


  followPerson(person : User){
    this.person.followers += 1 ;
     this.afAuth.authState.subscribe(auth =>{
      this.afDatabase.object('user/'+ auth.uid+'/followingArray/'+ this.personID).set(this.person.email)
      this.afDatabase.object('user/'+ auth.uid+'/following/').set(this.uesrFollowing.length + 1)
      this.afDatabase.object('user/'+ this.personID +'/followersArray/'+ auth.uid).set(auth.email)
     this.afDatabase.object('user/'+ this.personID +'/followers/').set(this.person.followers )
    })
    
    this.followdisable = true ;
    this.unfollowdisable = false ;
    //window.location.reload() ;
    //this.ionViewDidLoad();
  }


  unfollowPerson(){
    this.person.followers -= 1 ;
    this.afAuth.authState.subscribe(auth =>{
      this.afDatabase.object('user/'+ auth.uid+'/followingArray/'+ this.personID).remove()
      this.afDatabase.object('user/'+ auth.uid+'/following/').set(this.uesrFollowing.length - 1)
      this.afDatabase.object('user/'+ this.personID +'/followersArray/'+ auth.uid).remove()
     this.afDatabase.object('user/'+ this.personID +'/followers/').set(this.person.followers)
    })
    
    this.followdisable = false ;
    this.unfollowdisable = true ;
    //window.location.reload() ;
    //this.ionViewDidLoad();
  }


}
