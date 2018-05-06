import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseObjectObservable  } from 'angularfire2/database';
import { AngularFireObject }  from 'angularfire2/database';
import { AngularFireDatabase} from 'angularfire2/database';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-interests',
  templateUrl: 'interests.html',
})
export class InterestsPage {
  testCheckboxOpen: boolean;
  testCheckboxResult;
  user = {} as User;
 userData : AngularFireObject<User>
 item1 : Observable<User>;
 itemRef : AngularFireObject<any>;
 userfname : string ;
 userlname : string ;
 pri : boolean ;
 uaddress : string ;
 uInt : string[];
 upassword : string ;
 uphoto : URL ;
 
  constructor(public navCtrl: NavController, public navParams: NavParams , private afAuth: AngularFireAuth ,
    private afDatabase: AngularFireDatabase,public alertctrl:AlertController) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterestsPage');

    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
       this.userData = this.afDatabase.object('user/'+ data.uid);
       this.item1 = this.userData.valueChanges();
       this.itemRef = this.afDatabase.object('user/' + data.uid);
       this.itemRef.snapshotChanges().subscribe(action => {
        this.uphoto = action.payload.val().photo; 
       this.uaddress = action.payload.val().address;  
       this.userfname = action.payload.val().firstname;
       this.userlname = action.payload.val().lastname; 
       this.pri = action.payload.val().private;   
       this.uInt = action.payload.val().interests; 
       });
      }
      });

  }

  

  updateInterests(){
    let alert = this.alertctrl.create();
    alert.setTitle('Which Interests do you want to follow?');

    alert.addInput({
      type: 'checkbox',
      label: 'Sport',
      value: 'sport'
      
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
        this.uInt = data ;
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present();
  }


  updateProfile(){

    this.afAuth.authState.subscribe(auth =>{
      this.afDatabase.object('user/'+ auth.uid + '/firstname/' ).set(this.userfname)
      this.afDatabase.object('user/'+ auth.uid + '/lastname/' ).set(this.userlname)
      this.afDatabase.object('user/'+ auth.uid + '/address/' ).set(this.uaddress)
      this.afDatabase.object('user/'+ auth.uid + '/private/' ).set(this.pri)
      this.afDatabase.object('user/'+ auth.uid + '/interests/' ).set(this.uInt)
      this.afDatabase.object('user/'+ auth.uid +'/notifications/'+ auth.uid).set({uphoto : this.uphoto , message : "You updated your data .." , time : Date()})

    })

    let alert = this.alertctrl.create({
      title: 'Done !',
      subTitle: 'Your data is updated ',
      buttons: ['OK']
    });
    alert.present();


    this.navCtrl.push(ProfilePage);
  }

}
