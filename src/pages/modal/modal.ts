import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  att : string ;
  uval : any ;
  det : string ;
  regNames = [] 
  arrIDs = []
  evPhoto :{} 

  constructor(public navCtrl: NavController, 
    private afDatabase: AngularFireDatabase,
    private viewCtrl: ViewController,
    public alertCtrl: AlertController ,
    public navParams: NavParams) {

    this.det = this.navParams.get('detEvent');
    this.regNames = this.navParams.get('regEvent');
   
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    this.afDatabase.list('/IDS/').valueChanges().subscribe(
      _data => {
        this.arrIDs = _data ; 
      }
    );
    
    this.afDatabase.object('/event/' + this.det + '/photo' ).valueChanges().subscribe(
      _data => {
        this.evPhoto = _data ; 

      }
    );
  }

  updateEvent(){
   this.afDatabase.object('event/'+ this.det + '/'+ this.att ).set(this.uval)
   let alert = this.alertCtrl.create({
    title: 'Updated!',
    subTitle: 'Your ' + this.att +' is updated successfully !',
    buttons: ['OK']
  });
  alert.present();

  for(let per of this.regNames)
    {
      for(let yy of this.arrIDs){
            if(per.email == yy.IDemail){
              this.afDatabase.object('user/'+ yy.ID +'/notifications/'+ this.det).set({uphoto : this.evPhoto , message :  this.det + " is updated its " + this.att +"to "+ this.uval , time : Date()})
            }
          }
        }

  }
  
dismiss() {
      this.viewCtrl.dismiss();
    }
}
