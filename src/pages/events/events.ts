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

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  event = {} as Event ;
  


  arrData = [];
  arrDataId ;

  constructor (
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
     public navParams: NavParams,
     public laodctrl: LoadingController,
     public toastctrl:ToastController,
     public myUserProvider:UsersserviceProvider,
     public alertctrl:
  AlertController,
private file:File,
private filechooser:FileChooser) {
    this.afDatabase.list("/event/").valueChanges().subscribe(
      _data => {
        this.arrData = _data ; 
        this.arrDataId = this.arrData.length ;
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }
  createE(event: Event){
    event.regnumber = 0 ;
    this.afDatabase.object('event/'+this.arrDataId).set(this.event).then(()=>this.navCtrl.push(WelcomePage))
    //this.afDatabase.list("/event/").push(this.event).then(()=>this.navCtrl.push(WelcomePage));
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