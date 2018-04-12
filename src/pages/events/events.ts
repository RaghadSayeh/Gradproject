import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController,AlertController} from 'ionic-angular';
import * as firebase from 'firebase';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import {FileChooser} from '@ionic-native/file-chooser';
import {File} from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
  providers: [UsersserviceProvider]
})
export class EventsPage {
  public Cname: any;
  public Cemail: any;
  public subject: string;
  public Month: any;
  public Year: any;
  public Day: any;
  public place: any;
  public city: any;
  public eventInfo : any;
  //public Paid: boolean;


  constructor(public eventServices : UsersserviceProvider,public navCtrl: NavController, public navParams: NavParams,public laodctrl: LoadingController,public toastctrl:ToastController,public alertctrl:
  AlertController, private filechooser: FileChooser, private file:File) {

    this.eventInfo =firebase.database().ref('eventinfo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }
  createE(){
    var   account2 = {
      Cname: this.Cname || '',
      Cemail: this.Cemail || '',
      subject: this.subject || '',
      Month: this.Month || '',
      Year: this.Year || '',
      Day : this.Day || '',
      place : this.place || '',
      city : this.city || '',
      //Paid :this.Paid
     };
     var that=this;
    /* this.eventInfo.child().set({
       account2
     });*/
     this.eventServices.writeEventInfo(account2).then(authData =>{
      let alert = this.alertctrl.create(
        {
           title : 'Thank You!',
         // subTitle: 'We will respond to you soon',
          buttons: ['Ok']
        }
      );
      alert.present();
      //that.navCtrl.setRoot(WelcomePage);
    }, error => {
     // loadingCtrl.dismiss();
       // Unable to log in
        let toast = this.toastctrl.create({
          message: error,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      
       // that.password = ""//empty the password field
      });

     
  }
  choose(){
    this.filechooser.open().then((uri)=>{
      alert(uri);

      this.file.resolveLocalFilesystemUrl(uri).then((newUrl)=>{
        alert(JSON.stringify(newUrl));

        let dirPath=newUrl.nativeURL;
        let dirPathSegments=dirPath.split('/')
        dirPathSegments.pop()
        dirPath=dirPathSegments.join('/')

        this.file.readAsArrayBuffer(dirPath,newUrl.name).then(async (buffer)=>{
          await this.upload(buffer,newUrl.name);
        })
      }
    )

    }
  )
  }//choose fcn
 async upload(buffer,name){
  //blob is a special data structure which is used to transfer file  from one place to another
  let blob=new Blob([buffer], {type:"image/jpeg"}); 

  let storage=firebase.storage();
  storage.ref('/images'+name).put(blob).then((d)=>{
    alert("Done");
  }).catch((error)=>{
    alert(JSON.stringify(error));
  })

}
}
