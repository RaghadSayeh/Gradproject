import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController,AlertController} from 'ionic-angular';
import * as firebase from 'firebase';
import { Event } from '../../models/eventDet';
import { AngularFireDatabase} from 'angularfire2/database';
import { WelcomePage } from '../welcome/welcome';
import { HomePage } from '../home/home';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import {File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { AngularFireAuth } from 'angularfire2/auth';
import { OwnEventsPage } from '../own-events/own-events';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  event = {} as Event ;
  arrUsers = [] ;
  arrData = [];
  arrDataId ;
  arrIDs = []

  constructor (
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
     public navParams: NavParams,
     private afAuth: AngularFireAuth ,
     public laodctrl: LoadingController,
     public toastctrl:ToastController, private filechooser: FileChooser, private file:File,
     public myUserProvider:UsersserviceProvider,
     public alertctrl:
  AlertController
) {
    this.afDatabase.list('/event/').valueChanges().subscribe(
      _data => {
        this.arrData = _data ; 
        this.arrDataId = this.arrData.length ;
      }
    );

    this.afDatabase.list('/user/').valueChanges().subscribe(
      _data => {
        this.arrUsers = _data ; 
      }
    );
    this.afDatabase.list('/IDS/').valueChanges().subscribe(
      _data => {
        this.arrIDs = _data ; 
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }


  createE(ev : Event){
    ev.regnumber = 0 ;

    for(let per of this.arrUsers)
    {
      for(let evty of per.interests){
        if(evty == ev.type)
        {
          for(let yy of this.arrIDs){
            if(per.email == yy.IDemail){
              this.afDatabase.object('user/'+ yy.ID +'/notifications/'+ this.arrDataId).set({uphoto : ev.photo , message : "New Event is added : "+ ev.name + " , of type " + ev.type , time : Date()})
            }
          }

        }
      }
    }

    this.afAuth.authState.subscribe(auth =>{
      this.afDatabase.object('user/'+ auth.uid+'/ownEvents/'+ ev.name).set({email: ev.email , name:ev.name , photo:ev.photo})
      this.afDatabase.object('event/'+ ev.name).set(ev)

    });

    this.navCtrl.push(OwnEventsPage);

    }





choose(){
this.filechooser.open().then((uri)=>{
  alert(uri);

  this.file.resolveLocalFilesystemUrl(uri).then((newUri)=>{
    alert(JSON.stringify(newUri));

    let dirPath=newUri.nativeURL;
    let dirPathSegments=dirPath.split('/')
    dirPathSegments.pop()
    dirPath=dirPathSegments.join('/')

    this.file.readAsArrayBuffer(dirPath,newUri.name).then((buffer)=>{
  this.upload(buffer,newUri.name);
    }
  )

  })
}

)
}
 upload(buffer,name){
  let blob=new Blob([buffer],{type:"image/jpeg"});
  let storage=firebase.storage();
  storage.ref('images/'+ name).put(blob).then((d)=>{
    alert("Done");

  }).catch((error)=>{
    alert(JSON.stringify(error));
  })

}

  
  }