import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseObjectObservable  } from 'angularfire2/database';
import { AngularFireObject }  from 'angularfire2/database';
import { AngularFireDatabase} from 'angularfire2/database';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-interests',
  templateUrl: 'interests.html',
})
export class InterestsPage {
  information = [];
  userData : FirebaseObjectObservable<User>
 // removeitems : FirebaseObjectObservable<User>
  interestData = []
  uesrInteresrData = []
  arrDataId
  constructor(public navCtrl: NavController, public navParams: NavParams , private afAuth: AngularFireAuth ,
    private afDatabase: AngularFireDatabase,private http:Http) {
   //   this.removeitems=this.afDatabase.list('/user/interests');
      this.afDatabase.list("/user/").valueChanges().subscribe(
        _data => {
          this.interestData = _data ; 
          console.log(this.interestData) ;
          this.arrDataId = this.interestData.length ;
        }
      );
      let localData=this.http.get('assets/information.json').map(res=>res.json().items);
      localData.subscribe(data=>{
        this.information=data;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterestsPage');

    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
       this.userData = this.afDatabase.object('user/'+ data.uid).valueChanges();
       console.log(this.userData) ;
       this.afDatabase.list('/user/'+ data.uid+'/interests/').valueChanges().subscribe(
        _data => {
          this.uesrInteresrData = _data ; 
          console.log(this.uesrInteresrData) ;
        }
      );
       }
       }
  );

  }

  

}
