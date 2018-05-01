import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireObject }  from 'angularfire2/database';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

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
  userData : AngularFireObject<User>
  item1 : Observable<User>;
  itemRef : AngularFireObject<any>;
  uesrFollowers= []
  uesrFollowing= []
  followdisable :boolean ;
  unfollowdisable :boolean ;
  personID : string;
  eventData = []
  userEvents = []
 userPhoto : URL ;
 userfname : string ;
 userlname : string ;
 pri : boolean ;

  
  t : Date = new Date() ;
  notificationData = []

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
       this.userData = this.afDatabase.object('user/'+ data.uid);
       this.item1 = this.userData.valueChanges();

       this.itemRef = this.afDatabase.object('user/' + data.uid);
       this.itemRef.snapshotChanges().subscribe(action => {
       this.userPhoto = action.payload.val().photo;  
       this.userfname = action.payload.val().firstname;
       this.userlname = action.payload.val().lastname; 
       this.pri = action.payload.val().private;    
       });
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


  followPerson(person : User ){
    
    this.person.followers += 1 ;
    this.t = new Date();
    //this.notificationData = [{uphoto :this.userData.photo , message : this.userData.firstname + this.userData.lastname + " started folloeing you .." , time :this.t}] ;
     this.afAuth.authState.subscribe(auth =>{
      this.afDatabase.object('user/'+ auth.uid+'/followingArray/'+ this.personID).set(this.person.email)
      this.afDatabase.object('user/'+ auth.uid+'/following/').set(this.uesrFollowing.length + 1)
      this.afDatabase.object('user/'+ this.personID +'/followersArray/'+ auth.uid).set(auth.email)
     this.afDatabase.object('user/'+ this.personID +'/followers/').set(this.person.followers )
    this.afDatabase.object('user/'+ this.personID +'/notifications/'+ auth.uid).set({uphoto : this.userPhoto , message : this.userfname + " " + this.userlname+ "  started following you .." , time : Date()})
    
    })
    
    this.followdisable = true ;
    this.unfollowdisable = false ;
    

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
